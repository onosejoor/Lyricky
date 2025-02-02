import { DetailedHTMLProps, HTMLAttributes } from "react";

const Loader = (
  props?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => (
  <div
    {...props}
    className={`${props?.className} h-5 w-5 border-[3px] rounded-full border-purple/20 animate-spin border-t-purple dark:border-t-white !mb-0`}
  ></div>
);

export default Loader;
