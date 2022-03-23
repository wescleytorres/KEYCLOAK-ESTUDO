import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { FormEvent } from "react";
import styles from "../styles/LoginPage.module.css";
import { http } from "../utils/http";

const LoginPage = () => {
  const router = useRouter();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    const username = (document.querySelector("#username") as HTMLInputElement)
      .value;
    const password = (document.querySelector("#password") as HTMLInputElement)
      .value;

    const { data } = await http.post("login", { username, password });
    setCookie(undefined, "token", data.token, {
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    router.push("/private");
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="username">Usuário</label>
        <input type="text" name="username" id="username" />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Senha</label>
        <input type="password" name="password" id="password" />
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginPage;
