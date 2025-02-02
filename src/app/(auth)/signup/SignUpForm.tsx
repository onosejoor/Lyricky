"use client";

import Link from "next/link";
import { useState } from "react";

import GoogleBtn from "@/app/_components/GoogleBtn";
import Img from "@/components/Img";
import { EyeClosedIcon, EyeOpenIcon } from "@/components/Icons";
import axios from "axios";
import { showToast } from "@/hooks/Toast";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [hide, setHide] = useState(false);
  const router = useRouter();

  const handleHidePassword = () => setHide(!hide);

  async function handleSubmit(formData: FormData) {
    try {
      const sendFormData = await axios.post("/api/auth/signup", formData);

      const response = sendFormData.data;
      if (response.success) {
        showToast({
          variants: "success",
          message: response.message,
        });
        router.push("/lyrics");
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
      <h3 className="px-5 py-3 mt-5 rounded-full dark:text-white w-fit mx-auto ring-purple ring ">
        Register
      </h3>
      <div className="px-5">
        <div className="grid m-10 gap-5 md:grid-cols-2 grid-cols-1 rounded-[10px] overflow-hidden sm:!w-[calc(100%-10%)] !w-full dark:*:text-white dark:bg-black/70 bg-white justify-center border border-[hsl(257,_27%,_26%)] dark:border-white  items-center mx-auto my-5">
          <div className="p-5 w-full h-full">
            <form
              className="flex flex-col w-full gap-5 relative"
              action={handleSubmit}
            >
              <div className="flex flex-col  gap-2 w-full">
                <label htmlFor={"username"} className="capitalize font-medium ">
                  Username
                </label>
                <div className="flex items-center px-2 dark:border-white/60 has-focus:border-purple/78 border-2 border-black/50 rounded-sm ">
                  <input
                    type="text"
                    name="username"
                    required
                    className="shrink-0 outline-0 w-full h-full !py-3 placeholder:capitalize"
                    placeholder={"enter username"}
                  />
                </div>
              </div>
              <div className="flex flex-col  gap-2 w-full">
                <label htmlFor="email" className="capitalize font-medium ">
                  email
                </label>
                <div className="flex items-center px-2 dark:border-white/60 has-focus:border-purple/78 border-2 border-black/50 rounded-sm ">
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

                <div className="flex justify-between dark:border-white/60 items-center px-2 has-focus:border-purple/78 border-2 border-black/50 rounded-sm ">
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
                className="py-3 dark:border-white px-5 capitalize text-lg bg-purple/25 w-fit rounded-xl border-2 border-purple "
              >
                register
              </button>
            </form>
            <h3 className="font-medium text-purple my-5 mx-auto w-fit dark:text-white">OR</h3>
            <GoogleBtn />

            <div className="flex gap-2 justify-center">
              <h5 className="font-medium">Already Have An Account?</h5>
              <Link href={"/login"} className="text-purple dark:text-purple-500 font-bold">
                 Log-In
              </Link>
            </div>
          </div>
          <div className="h-full w-full md:block hidden">
            <Img
              src={"/images/logoRoute.jpeg"}
              alt="Signup form side image PNG"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
