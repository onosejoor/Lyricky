import FormError from "@/_components/FormError";
import PopUpLyrics from "@/_components/PopUpLyrics";
import NotLoggedIn from "@/_ui/NotLoggedIn";
import { verifyUser } from "@/lib/dal";
import { selectLyricsById } from "@/lib/userFunctions";
import NotFound from "@/not-found";

export default async function Page({ searchParams }) {
  const verify = await verifyUser();
  if (verify.IsAuth) {
    const pId = searchParams.id;
    const paramsId = parseInt(atob(pId)) ;

    if (paramsId) {
      const { error, data } = await selectLyricsById(paramsId);
      if (error) {
        return <FormError error={error} />;
      }
      if (data.length !== 0) {
        const [res] = data;
        const { lyrics, artist, title } = res;

        return <PopUpLyrics lyrics={lyrics} artist={artist} title={title} />;
      } else {
        return <PopUpLyrics />;
      }
    } else {
      return <NotFound />;
    }
  } else {
    return <NotLoggedIn />;
  }
}
