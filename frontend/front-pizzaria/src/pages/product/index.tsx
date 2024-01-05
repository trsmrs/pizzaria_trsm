import { ChangeEvent, FormEvent, useState } from "react";
import Head from "next/head";
import styles from "@/src/pages/product/styles.module.scss";
import { onlySSRAuth } from "@/src/utils/onlySSRAuth";
import { Header } from "@/src/components/Header";

import { FiUpload } from "react-icons/fi";
import { setupAPIClient } from "@/src/services/api";
import { toast } from "react-toastify";


type ItemProps={
  id: string;
  name: string;
}

interface CategoryProps {
  categoryList: ItemProps[];
}


export default function Product({ categoryList }: CategoryProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')


  const [fileURL, setFileURL] = useState("");
  const [fileIMG, setFileIMG] = useState(null);

  const [categories, setCategories ] = useState(categoryList || [])
  const [categorySelected, setCategorySelected] = useState(0)
  

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const image = event.target.files[0];
    if (!image) {
      return;
    }

    if (
      image.type === "image/jpeg" ||
      image.type === "image/png" ||
      image.type === "image/jpg"
    ) {
      setFileIMG(image);
      setFileURL(URL.createObjectURL(event.target.files[0]));
    }
  }

  // when select new category
  function handleCategory(e: any){
    setCategorySelected(e.target.value)
  }


  async function handleRegister(e: FormEvent){
      e.preventDefault();

      try{
        const data = new FormData();
        if(name === '' || price === '' || description === '' || fileIMG === null){
          toast.error('Preencha todos os campos');
          return;
        }

        data.append('name', name);
        data.append('price', price);
        data.append('description', description);
        data.append('category_id', categories[categorySelected].id)
        data.append('file', fileIMG)

        const apiClient = setupAPIClient();

        await apiClient.post('/create-product', data);
        toast.success("Produto Cadastrado com sucesso!")

      } catch(err) {
        console.log('Ocorreu um erro ',err)
        toast.error("Ocorreu um erro ao cadastrar")
      }

      setName('')
      setPrice('')
      setDescription('')
      setFileIMG(null)
      setFileURL('')

  }

  return (
    <>
      <Head>
        <title>Novo Produto - Pizzaria</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar Novo Produto</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <label className={styles.labelFile}>
              <span>
                <FiUpload size={25} color="#FFF" className={styles.fi} />
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {fileURL && (
                <img
                  src={fileURL}
                  alt="foto produto"
                  width={250}
                  height={250}
                  className={styles.preview}
                />
              )}
            </label>

            <select value={categorySelected} onChange={handleCategory}>
              {categories.map((item, index)=>{
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
              })}
            </select>

            <input
              type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Preço do Produto"
              className={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <textarea
              placeholder="Descreva seu produto..."
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit" className={styles.button}>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = onlySSRAuth(async (context) => {
  const apiClient = setupAPIClient(context);
  const response = await apiClient.get("/category");

  return {
    props: {
      categoryList: response.data,
    },
  };
});
