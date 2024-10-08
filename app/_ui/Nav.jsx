import NavCon from "@/_components/NavCon";
import User from "@/_components/User";
import { verifyUser } from "@/lib/dal";
import { deleteSession } from "@/lib/session";
import { selectUser } from "@/lib/userFunctions";
import { redirect } from "next/navigation";

async function Nav() {
  async function logout() {
    "use server";
    await deleteSession();
    redirect("/login");
  }
  const auth = await verifyUser();

  const username = auth.user;

  if (username) {
    const { data } = await selectUser(username);
    const newUser = data.username;
    return (
      <>
        <nav className={"navBar"}>
          {" "}
          <div className="logoContainer">
            <a href="/">
              <img
                className="logo"
                src={"/images/logoIcon.png"}
                alt="Lyricly logo"
              />
            </a>
          </div>{" "}
          <NavCon username={newUser}>
            <User username={newUser} action={logout} />
          </NavCon>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className={"navBar"}>
          {" "}
          <div className="logoContainer">
            <a href="/">
              <img
                className="logo"
                src={"/images/logoIcon.png"}
                alt="Lyricly logo"
              />
            </a>
          </div>{" "}
          <NavCon username={null}>
            <User username={null} action={logout} />
          </NavCon>
        </nav>
      </>
    );
  }
}

export default Nav;
