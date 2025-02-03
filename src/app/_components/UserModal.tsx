"use client";

import { useState } from "react";
import { deleteSession } from "../_lib/actions";
import { CancelIcon, LogOutIcon, SettingsIcon } from "@/components/Icons";
import axios from "axios";
import useSWR, { mutate } from "swr";
import Img from "@/components/Img";
import Link from "next/link";

type FetchecData = {
  user: IUser | null;
  message?: string;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const UserModal = ({ id }: { id: boolean }) => {
  if (id) {
    const { data, error, isLoading } = useSWR<FetchecData>(
      "/api/auth/user",
      fetcher
    );

    const [see, setSee] = useState(false);

    const set = () => setSee(!see);

    const setOpen = () => setSee(false);

    if (error) return <div>error fetching user</div>;

    if (isLoading)
      return (
        <h5 className="rounded-full bg-purple/80 animate-pulse h-[35px] w-[35px] grid place-content-center font-medium text-lg text-white"></h5>
      );

    if (data?.user) {
      const { user } = data;
      return (
        <>
          {see && (
            <div
              className="fixed inset-0 h-full w-full"
              onClick={setOpen}
            ></div>
          )}

          <div>
            <div className="relative cursor-pointer" onClick={set}>
              <div className="border-[5px] border-transparent rounded-full transition-colors hover:border-[rgb(227,_227,_227)] ">
                {user.avatar ? (
                  <Img
                    className="rounded-full h-[40px] object-cover border-2 border-purple w-[40px]"
                    alt={user.username}
                    src={user.avatar}
                  />
                ) : (
                  <h5 className="rounded-full bg-purple/80 h-[35px] w-[35px] grid place-content-center font-medium text-lg text-white">
                    {user.username.slice(0, 1).toUpperCase()}
                  </h5>
                )}
              </div>
            </div>
            {see && (
              <div className="absolute grid justify-items-start border-[1.5px] border-purple top-[70px] after:absolute after:left-[70%] after:border-solid after:border-[transparent_transparent_var(--color-purple)_transparent] after:border-[10px] after:-top-5  z-[1]  right-[35px] gap-[15px] divide-y divide-purple items-center bg-white rounded-[10px]">
                <h5 className="font-bold text-lg py-2 px-5 w-full">{user.username}</h5>
                <Link
                  onClick={setOpen}
                  href={"/settings"}
                  className="flex gap-3 py-2 px-5 text-black items-center"
                >
                  Settings
                  <SettingsIcon />
                </Link>
                <form action={deleteSession} onSubmit={setOpen}>
                  <button
                    type="submit"
                    className="flex text-red-600 shrink-0 py-2 px-5 gap-3"
                  >
                    Log-Out
                    <span className="shrink-0">
                      <LogOutIcon />
                    </span>
                  </button>
                </form>
                <div onClick={setOpen} className="py-2 px-5">
                  <CancelIcon fill="black" height={30} width={30} />
                </div>
              </div>
            )}
          </div>
        </>
      );
    }
  }
};

export default UserModal;
