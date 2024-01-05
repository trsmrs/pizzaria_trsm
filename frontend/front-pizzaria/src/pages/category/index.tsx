import { useState, FormEvent } from "react";
import Head from "next/head";
import { Header } from "@/src/components/Header";
import styles from "@/src/pages/category/styles.module.scss";

import { setupAPIClient } from "@/src/services/api";
import { toast } from "react-toastify";

import { onlySSRAuth } from "@/src/utils/onlySSRAuth";

export default function Category() {
  const [name, setName] = useState("");

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === "") {
      return;
    }

    const apiClient = setupAPIClient();
    await apiClient.post("/category", {
      name: name,
    });

    toast.success("Categoria cadastrada com sucesso!")
    setName("")
  }

  return (
    <>
      <Head>
        <title>Nova Categoria - Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>

          <form onSubmit={handleRegister} className={styles.form}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite a Categoria"
              className={styles.input}
            />

            <button className={styles.button} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = onlySSRAuth(async (contex)=>{
    return {
        props: {}
    }
})