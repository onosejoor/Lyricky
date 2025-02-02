import { GithubIcon, ThreadsIcon, TwitterIcon } from "../components/Icons";
import Img from "../components/Img";

import Link from "next/link";

const links = [
  {
    link: "https://github.com/onosejoor",
    icon: <GithubIcon />,
  },
  {
    link: "https://www.x.com/DevText16",
    icon: <TwitterIcon />,
  },
  {
    link: "https://www.threads.net/@dev.text16",
    icon: <ThreadsIcon />,
  },
];

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <section className="bg-purple/[0.1] !py-[10px] border-t border-purple ">
      <div className="flex xs:flex-row flex-col gap-10 justify-between xs:items-center px-5">
        <div className="flex items-center gap-3">
          <Link href={"/"}>
            <Img
              src="/images/logoIcon.png"
              alt="Logo"
              className="-ml-3 object-cover xs:ml-0 h-[70px] w-[70px] "
            />
          </Link>
          <h4 className="text-purple font-bold dark:text-white">Lyricky</h4>
        </div>
        <div className="flex flex-col w-fit justify-end xs:items-end gap-1.5 mr-5  ">
          <div className="grid grid-cols-3 gap-5">
            {links.map((link, index) => (
              <a href={link.link} key={index}>
                {link.icon}
              </a>
            ))}
          </div>
          <div>
            <h3 className="text-purple/80 dark:text-white font-medium ">
              ©️ Lyricky {date}
            </h3>
          </div>
        </div>
      </div>
      
    </section>
  );
};
export default Footer;
