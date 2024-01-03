import Head from "next/head";
import styles from "@/styles/home.module.scss";
import logoSVG from "@/public/logosvgCad.png";
import Image from "next/image";

import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/input/index";

import Link from "next/link";

export default function Signup() {
  return (
    <>
      <Head>
        <title>Mamma Mia - Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image className={styles.img} src={logoSVG} alt="logo pizzaria" />

        <div className={styles.login}>
            
            <h1>Criar Conta</h1>

          <form action="">
            <Input placeholder="Digite o seu Nome" type="text" />
         
            <Input placeholder="Digite o seu e-mail" type="text" />

            <Input placeholder="Escolha uma senha" type="password" />

            <Button type="submit" loading={false} name="Cadastrar" />
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
