import {InputHTMLAttributes, TextareaHTMLAttributes} from 'react'
import styles from "@/src/components/ui/input/styles.module.scss";


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({ ...rest }: InputProps) {
  return <input className={styles.input} type="text" {...rest} />;
}


export function TextArea({...rest}: TextAreaProps){
    return(
        <textarea className={styles.input} {...rest}></textarea>
    )
}