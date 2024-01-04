import { FormEvent, useState, useContext } from "react";
import Head from "next/head";
import styles from "@/styles/home.module.scss";
import logoSVG from "@/public/logosvgCad.png";
import Image from "next/image";

import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/input/index";

import Link from "next/link";
import { toast } from "react-toastify";
import { AuthContext } from "@/src/contexts/AuthContext";

export default function Signup() {
  const {signUp} = useContext(AuthContext);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);


  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name ==='' || email === '' || password === ''){
      toast.error("Preencha todos os campos.")
      return;
    }

    setLoading(true)

    let data = {
      name,
      email,
      password
    }

    await signUp(data);
    setLoading(false)
  }



  return (
    <>
      <Head>
        <title>Mamma Mia - Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image className={styles.img} src={logoSVG} alt="logo pizzaria" />

        <div className={styles.login}>
            
            <h1>Criar Conta</h1>

          <form onSubmit={handleSignUp}>
            <Input placeholder="Digite o seu Nome" 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
         
            <Input placeholder="Digite o seu e-mail" 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />

            <Input placeholder="Escolha uma senha" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />

            <Button type="submit" loading={loading} 
              name="Cadastrar"
              
              />
          </form>

          <Link
            href="/"
            children="Já possui uma conta? Faça login!"
            className={styles.link}
          />
        </div>
      </div>
    </>
  );
}
