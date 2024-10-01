"use server";

import FormError from "@/_components/FormError";
import Img from "@/_components/Img";
import RecentCard from "@/_components/RecentCard";
import { verifyUser } from "@/lib/dal";
import { selectLyrics, selectUserName } from "@/lib/userFunctions";

const Recent = async () => {
  // Check user authenticity
  const verify = await verifyUser();
  const { user } = verify;

  // select user creds from username
  const username = await selectUserName(user);

  if (username.error) {
    console.log(username.error);
    
    return (
      <>
      <div className="nothingYet">
      <Img src={"/images/svg/error.svg"} alt={"nothing here yet Image"} />  
      <h4>Error, Check Internet Connection</h4>
      </div>

      </>

 
    );
  }

  const { email } = username.data;

  const { data, error } = await selectLyrics(email);

  function mapper({ lyrics, artist, title, id }) {
    return (
      <RecentCard
        lyrics={lyrics}
        artist={artist}
        title={title}
        key={id}
        id={id}
      />
    );
  }

  return (
    <>

        {error ? (
          <h2>Error Fetching Lyrics</h2>
        ) : data.length ? (
          <div className="recentCard">{data.map(mapper)}</div>
        ) : (
          <>
            <div className="nothingYet">
              <Img
                src={"/images/svg/not found.svg"}
                alt={"nothing here yet Image"}
              />
              <h4>No lyrics yet</h4>
            </div>
          </>
        )}
    </>
  );
};

export default Recent;
