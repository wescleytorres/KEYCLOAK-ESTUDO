import { parseCookies } from "nookies";
import { getPayload, isTokenExpired } from "./auth";

export function withSSRAuth(fn) {
  return async (ctx) => {
    const cookie = parseCookies(ctx);

    if (!cookie["token"] || isTokenExpired(cookie["token"])) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    const payload = getPayload(cookie["token"]);

    const result = await fn(ctx, cookie, payload);
    if ("props" in result) {
      result.props = {
        payload,
        ...result.props,
      };
    }

    return result;
  };
}
