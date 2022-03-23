import type { NextPage } from "next";
import { useAuthHttp } from "../hooks/useAuthHttp";

const Home: NextPage = () => {
  const { data: user, error } = useAuthHttp("user");
  return user ? <div>Hello World</div> : null;
};

export default Home;
