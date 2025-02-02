import UnAuthenticated from "@/app/_ui/UnAuthenticated";
import { verifyUser } from "@/app/_lib/dal";
import { selectLyricById } from "@/app/_lib/actions";
import NotFound from "@/app/not-found";
import CopyBtn from "../_components/CopyBtn";
import { ArrowBackIcon } from "@/components/Icons";
import Link from "next/link";

type LyricProps = {
  title: string;
  lyric: string;
  artist: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const verify = await verifyUser();
  if (verify.isAuth) {
    const id = (await searchParams).id;

    if (id) {
      const { error, data } = await selectLyricById(id);
      if (error) {
        throw new Error(error);
      }
      const { lyric, artist, title } = data as LyricProps;

      return <DetailCard lyric={lyric} artist={artist} title={title} />;
    } else {
      return <NotFound />;
    }
  } else {
    return <UnAuthenticated />;
  }
}

function DetailCard({ lyric, artist, title }: LyricProps) {
  return (
    <div className="h-fit bg-white border-2 py-10 my-10 mx-auto md:w-[calc(100%-30%)] border-purple rounded-[10px] p-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link href={"/lyrics"}>
            <ArrowBackIcon />
          </Link>

          <CopyBtn text={lyric} />
        </div>

        <b className="text-lg text-black/80 capitalize font-semibold text-end">
          {title}
        </b>
      </div>

      <div className={"text-black/75 my-5 whitespace-break-spaces"}>
        {lyric}
      </div>
      <div className="flex justify-between items-center flex-row-reverse">
        <h5 className="text-lg text-black/80 capitalize font-semibold text-end">
          {artist}
        </h5>
      </div>
    </div>
  );
}
