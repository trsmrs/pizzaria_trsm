import "../../styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'


import { AuthProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer closeOnClick={true} autoClose={3000} position="top-center"/>
    </AuthProvider>
  );
}
