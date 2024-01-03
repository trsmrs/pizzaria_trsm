import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import styles from "@/styles/home.module.scss";
import logoSVG from "@/public/logosvg.png";
import Image from "next/image";

import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/input/index";

import { AuthContext } from "../contexts/AuthContext";

import Link from "next/link";

export default function Home() {
  const {signIn} = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent){
      event.preventDefault();

      if(email=== '' || password === ''){
        alert('Preencha os dados')
        return;
      }
      setLoading(true)

      let data = {
          email,
          password
      }

     await signIn(data)

     setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Mamma Mia - Faça Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image className={styles.img} src={logoSVG} alt="logo pizzaria" />

        <div className={styles.login}>
          <form action="" onSubmit={handleLogin}>

            <Input placeholder="Digite seu e-mail" 
            type="text" 
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />

            <Input placeholder="Digite sua senha" 
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />

            <Button type="submit" loading={false} name="Acessar" />
          </form>

          <Link href="/signup" 
          children="Não possui cadastro? Cadastre-se"
          className={styles.link}  
          />
          
    
        </div>
      </div>
    </>
  );
}
