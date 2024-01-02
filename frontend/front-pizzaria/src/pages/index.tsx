import Head from 'next/head'
import styles from '@/styles/home.module.scss'
import logoImg from '@/public/logo.png'
import logoSVG from '@/public/logosvg.svg'
import Image from 'next/image'

import {Input, TextArea} from '@/src/components/ui/input/index'


export default function Home() {
  return (
    <>
      <Head>
        <title>
          Mamma Mia - Faça Login
        </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoSVG} alt='logo pizzaria'/>

        <div className={styles.login}>
              <form action="">
               <Input placeholder='Digite seu e-mail' type='text'/>
               <Input placeholder='Digite sua senha' type='password'/>

               <TextArea />
               
              </form>
        </div>
      </div> 
    </>
  )
}
