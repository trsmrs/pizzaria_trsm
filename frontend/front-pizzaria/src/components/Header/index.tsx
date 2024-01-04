import { useContext } from "react";
import styles from "@/src/components/Header/styles.module.scss";
import logo from "@/public/logo.png";
import Link from "next/link";

import {FiLogOut} from 'react-icons/fi'
import { AuthContext } from "@/src/contexts/AuthContext";

export function Header() {

    const {signOut} = useContext(AuthContext)

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <img src="/logo_headerr.png" alt="logo" width={330}  />
         
         

        </Link>
        <nav className={styles.headerNav}>
            <Link href={'/category'}>
                Categoria
            </Link>

            <Link href={'/product'}>
                Cardapio
            </Link>

            <button onClick={signOut}>
                <FiLogOut color='#FFF' size={24} />

            </button>
        </nav>
      </div>
    </header>
  );
}
