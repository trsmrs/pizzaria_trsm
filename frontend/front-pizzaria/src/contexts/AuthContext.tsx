import { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../services/apiClient";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    Router.push("/");
  } catch (error) {
    console.log("Error in logout!");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(()=>{
      // coletar cookies
      const {'@nextauth.token': token} = parseCookies();

      if(token){
        api.get('/user-info').then(response => {
          const {id, name, email} = response.data;

          setUser({
            id,
            name,
            email
          })
        }).catch(()=>{
          signOut()
        })
      }

  },[])

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/", // caminhos que terão acesso
      });

      setUser({
        id,
        name,
        email,
      });

      // passar token para proximas requisições
      api.defaults.headers["Authrization"] = `Bearer ${token}`;

      toast.success("Logado com sucesso!")
      // Redirect user to Dashboard
      Router.push("/dashboard");

    } catch (error) {
      toast.error("Ocorreu um erro ao acessar, tente novamente mais tarde.")
      console.log("signin error", error);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post('/users', {
        name,
        email,
        password
      })

      toast.success("Cadastrado com sucesso!")
      console.log('Cadastrado com sucesso!')
      Router.push('/')

    } catch (error) {
      toast.error("Erro ao cadastrar.")
      console.log("Erro ao cadastrar: ", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
