import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_API_URL;

const fetcher = async (url: string, body?: FormData, method?: string, auth?: boolean) => {
  const token = Cookies.get("token");
  if (auth) {
    if (!token || !JSON.parse(token).token) {
      return { error: "Vous devez être connecté pour effectuer cette action." };
    }
  }

  return fetch(apiUrl + url, {
    method: method?.toUpperCase() || "POST",
    headers: {
      ...(auth && { Authorization: `Bearer ${JSON.parse(token as string).token}` }),
    },
    body: body,
  })
    .then(async (res) => {
      // TODO : better handle errors
      if (!res.ok) {
        return { error: "Une erreur est survenue : " + res.statusText };
      }

      // Create a cookie to store the token if request to user
      const resBody = await res
        .json()
        .then((resBody) => resBody)
        .catch(() => ({}));
      if (url === "users/sign_in" || (url === "users" && method === "POST")) {
        Cookies.set(
          "token",
          JSON.stringify({ token: res.headers.get("Authorization"), user_id: resBody.user.id }),
          {
            expires: 1,
          }
        );
      }

      return (
        resBody ||
        res
          .json()
          .then((resBody) => resBody)
          .catch(() => ({}))
      );
    })
    .catch((error) => {
      console.error(error);
      return { error: "Une erreur est survenue : " + error };
    });
};

export default fetcher;
