"use client";

import Img from "@/components/Img";
import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  w-fit mx-auto py-5 items-center">
      <div className="grid justify-items-start gap-3">
        <h1 className="text-[100px] font-black text-purple-950">Error!</h1>
        <p className="sm:w-[70%] font-semibold">
          An error occured while processing your request, check internrt
          connections
        </p>
        <div className="flex gap-5 flex-col xs:flex-row ">
          <Link
            href={"/"}
            className="px-5 font-medium py-4 h-fit bg-purple/40 border-[1.5px] rounded-xl"
          >
            Go Back Home
          </Link>
          <button
            className="px-5 py-2 whitespace-nowrap border-purple bg-white font-normal border-[1.5px] rounded-xl text-center"
            onClick={() => {
              reset();
            }}
          >
            Retry
          </button>
        </div>
      </div>

      <Img
        src={"/images/svg/cancelError.svg"}
        className="h-[300px] w-[400px]"
        alt={"404 image"}
      />
    </div>
  );
}
