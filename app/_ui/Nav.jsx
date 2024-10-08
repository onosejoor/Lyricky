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

  const  user = auth.user;

  const { data, error } = await selectUser(user);
  const { username } = data;

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
        <NavCon username={username ? username : null}>
          <User username={username ? username : null} action={logout} />
        </NavCon>
      </nav>
    </>
  );
}

export default Nav;
