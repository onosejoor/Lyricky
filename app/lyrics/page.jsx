"use server";

import NotLoggedIn from "@/_ui/NotLoggedIn";
import { verifyUser } from "@/lib/dal";

const { default: Recent } = require("@/_ui/Recent");
const { default: ServerComponent } = require("@/_ui/ServerForm");

const Lyrics = async () => {
  const check = await verifyUser();

  if (check.IsAuth) {
    return (
      <>
        <ServerComponent />
        <section id="fetchedLyrics">
        <h5 className="h1">Your Fetched Lyrics</h5>
          <Recent />
        </section>
      </>
    );
  } else {
    return <NotLoggedIn />;
  }
};

export default Lyrics;
