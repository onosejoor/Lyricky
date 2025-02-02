import NavCon from "@/app/_components/NavCon";
import UserModal from "@/app/_components/UserModal";
import { verifyUser } from "@/app/_lib/dal";
import Img from "./Img";
import Link from "next/link";

async function Nav() {
  const auth = await verifyUser();

  const user = auth.user as string;

  return (
    <nav
      className={
        "flex items-center border-b z-10 dark:border-white/70 border-purple before:content-[''] before:-z-100 before:absolute before:inset-0 before:backdrop-blur-sm justify-between sticky top-0 dark:bg-black/80 bg-white/80 px-5 shadow-nav"
      }
    >
      <div className="h-[70px]">
        <Link href="/" className="h-full">
          <Img
            className="h-[70px] w-fit"
            src={"/images/logoIcon.png"}
            alt="Lyricly logo"
          />
        </Link>
      </div>
      <NavCon user={user}>
        <UserModal id={user ? true : false} />
      </NavCon>
    </nav>
  );
}

export default Nav;
