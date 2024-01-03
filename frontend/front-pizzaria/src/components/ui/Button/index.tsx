import { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "@/src/components/ui/Button/styles.module.scss";

import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children?: ReactNode;
  name?: string;
}

export function Button({ loading, children, name, ...rest }: ButtonProps) {
  return (
    <button className={styles.button} disabled={loading} {...rest}>
      {loading ? (
        <FaSpinner color="#FFF" size={16} />
      ) : (
        <a className={styles.buttonText}>{name}</a>
      )}
    
    </button>
  );
}
