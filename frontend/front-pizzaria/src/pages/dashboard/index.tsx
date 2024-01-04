import { Header } from "@/src/components/Header"
import { onlySSRAuth } from "@/src/utils/onlySSRAuth"
import Head from "next/head"


export default function Dashboard(){
    return(
       <>
       <Head>
            <title>Painel - Pizzaria</title>
       </Head>
       <div>
        <Header />
        <h1>Painel</h1>
       </div>
       </>
    )
}

export const getServerSideProps = onlySSRAuth(async (context) =>{
        return {
            props: {}
        }
})