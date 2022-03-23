import { NextPage } from "next";
import { http } from "../utils/http";
import { withSSRAuth } from "../utils/withSSRAuth";

interface PrivatePageProps {
  name: string;
  payload: any;
}

const PrivatePage: NextPage<PrivatePageProps> = ({ name, payload }) => {
  console.log(payload);
  return (
    <div>
      <h1>Pagina Privada - {name}</h1>
    </div>
  );
};

export default PrivatePage;

export const getServerSideProps = withSSRAuth(async (ctx, cookie, payload) => {
  const { data } = await http.get("test-auth", {
    headers: {
      Authorization: `Bearer ${cookie["token"]}`,
    },
  });
  return {
    props: data,
  };
});

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const cookie = parseCookies(ctx);

//   if (!cookie["token"] || isTokenExpired(cookie["token"])) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//     };
//   }

//   // try {
//   const {} = await http.get("test-auth", {
//     headers: {
//       Authorization: `Bearer ${cookie["token"]}`,
//     },
//   });
//   // } catch (e) {
//   //   if (
//   //     axios.isAxiosError(e) &&
//   //     (e.response?.status === 401 || e.response?.status === 403)
//   //   ) {
//   //     return {
//   //       redirect: {
//   //         permanent: false,
//   //         destination: "/login",
//   //       },
//   //     };
//   //   }
//   //   throw e;
//   // }

//   return {
//     props: {},
//   };
// };
