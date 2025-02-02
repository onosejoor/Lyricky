"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import GoogleBtn from "@/app/_components/GoogleBtn";
import { showToast } from "@/hooks/Toast";

import Img from "@/components/Img";
import { EyeClosedIcon, EyeOpenIcon } from "@/components/Icons";

export default function LoginForm() {
  const [hide, setHide] = useState(false);

  const router = useRouter()

  const handleHidePassword = () => setHide(!hide);

  async function handleSubmit(formData: FormData) {
    try {
      const sendFormData = await axios.post("/api/auth/signin", formData);

      const response = sendFormData.data;
      if (response.success) {
        showToast({
          variants: "success",
          message: response.message,
        });
        router.push("/lyrics")
      } else {
        showToast({
          variants: "success",
          message: response.message,
        });
      }

      return;
    } catch (error: any) {
      showToast({
        variants: "error",
        message: error.message,
      });
    }
  }

  return (
    <>
      <h3 className="px-5 py-3 mt-5 rounded-full w-fit mx-auto ring-purple dark:text-white ring ">
        Login
      </h3>
      <div className="px-5">
      <div className="grid m-10 gap-5 md:grid-cols-2 grid-cols-1 rounded-[10px] overflow-hidden sm:!w-[calc(100%-10%)] !w-full dark:*:text-white dark:bg-black/70 bg-white justify-center border border-[hsl(257,_27%,_26%)] dark:border-white/40  items-center mx-auto my-5">
        <div className="p-5 w-full h-full">
          <form
            className="flex flex-col w-full gap-5 relative"
            action={handleSubmit}
          >
            <div className="flex flex-col  gap-2 w-full">
              <label htmlFor="email" className="capitalize font-medium ">
                email
              </label>
              <div className="flex items-center dark:border-white/70 px-2 has-focus:border-purple/78 border-2 border-black/50 rounded-sm ">
                <input
                  type="email"
                  name="email"
                  className="shrink-0 outline-0 w-full h-full !py-3 placeholder:capitalize"
                  required
                  placeholder={"enter email"}
                />
              </div>
            </div>
            <div className="flex flex-col  gap-2 w-full">
              <label htmlFor="password" className="capitalize font-medium ">
                password
              </label>

              <div className="flex justify-between dark:border-white/70 items-center px-2 has-focus:border-purple/78 border-2 border-black/50 rounded-sm ">
                <input
                  type={hide ? "text" : "password"}
                  name={"password"}
                  required
                  className="w-full outline-0 h-full !py-3 placeholder:capitalize"
                  placeholder={"enter password"}
                />
                {hide ? (
                  <div
                    role="button"
                    className="h-full cursor-pointer shrink-0 grid place-content-center bg-transparent"
                    onClick={handleHidePassword}
                  >
                    <EyeClosedIcon />
                  </div>
                ) : (
                  <div
                    role="button"
                    className="h-full cursor-pointer grid shrink-0 place-content-center bg-transparent"
                    onClick={handleHidePassword}
                  >
                    <EyeOpenIcon />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="py-3 px-5 dark:border-white capitalize text-lg bg-purple/25 w-fit rounded-xl border-2 border-purple "
            >
              sign-in
            </button>
          </form>
          <h3 className="font-medium text-purple my-5 mx-auto w-fit dark:text-white">OR</h3>
          <GoogleBtn />

          <div className="flex gap-2 justify-center">
            <h5 className="font-medium">Don't Have An Account? </h5>
            <Link href={"/signup"} className="text-purple dark:text-purple-500 font-bold">
               Signup
            </Link>
          </div>
        </div>
        <div className="h-full w-full md:block hidden">
          <Img
            src={"/images/logoRoute.jpeg"}
            alt="Signup form side image PNG"
            className="h-[500px]  w-full object-cover"
          />
        </div>
      </div>        
      </div>

    </>
  );
}
