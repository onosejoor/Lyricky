"use client";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

import Img from "../../components/Img";
import { HamburgerIcon, SunIcon } from "../../components/Icons";

type Props = {
  children: ReactNode;
  user: string | null;
};

const links = [
  {
    link: "/signup",
    text: "signup",
  },
  {
    link: "/login",
    text: "login",
  },
];

const NavCon = ({ children, user }: Props) => {
  const [showed, setShowed] = useState(false);
  const [dark, setDark] = useState(false);
  const path = usePathname();

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  const set = () => setDark(!dark);

  const show = () => setShowed(!showed);

  const closeNav = () => setShowed(false);

  const className = "text-lg py-[10px]  px-3.5 font-medium ";
  const activeLinkCss = "bg-black/[0.1] dark:bg-white/[0.1] dark:*:!text-white border-2 border-transparent dark:border-white rounded-xl *:text-purple";

  return (
    <>
      {showed && (
        <div
          className="fixed inset-0 bg-black/50 cursor-[url(/images/svg/x.svg)_,auto]"
          onClick={show}
        ></div>
      )}

      <div className="flex h-min gap-4 mx-5 items-center">
        <div className="h-10 w-10 grid place-content-center fixed border border-white bottom-20 right-[10px] bg-black rounded-[5px] ">
          {dark ? (
            <div onClick={set}>
              <SunIcon />
            </div>
          ) : (
            <div onClick={set}>
              <Img
                className="!h-[25px] cursor-pointer"
                src="/images/theme/dark.svg"
                alt="dark mode image"
              />
            </div>
          )}
        </div>
        <div onClick={show}>
          <HamburgerIcon />
        </div>

        <ul
          data-nav-open={showed}
          className="data-[nav-open=true]:right-0 h-full flex-col z-50 rounded-tl-lg rounded-bl-lg min-h-full sm:h-fit bottom-0 fixed sm:static w-[200px] transition-all -right-full sm:flex-row sm:justify-end list-none gap-10 sm:gap-5 bg-white sm:bg-transparent py-10 sm:py-0 flex items-center "
        >
          <li
            onClick={closeNav}
            className={`${path === "/" ? activeLinkCss : ""} ${className}`}
          >
            <Link href={"/"} className="text-black/90 dark:text-white/80">
              {"Home"}
            </Link>
          </li>
          {!user &&
            links.map((link, index) => {
              const isActive = link.link === path;

              return (
                <li
                  key={index}
                  onClick={closeNav}
                  className={`${className} ${isActive ? activeLinkCss : ""}`}
                >
                  <Link href={link.link} className="capitalize dark:text-white/80 text-black/90">
                    {link.text}
                  </Link>
                </li>
              );
            })}
          <li
            onClick={closeNav}
            className={`${
              path === "/lyrics" ? activeLinkCss : ""
            } ${className}`}
          >
            <Link href={"/lyrics"} className="text-black/90 dark:text-white/80">
              {"Lyrics"}
            </Link>
          </li>
        </ul>
        {children}
      </div>
    </>
  );
};

export default NavCon;
