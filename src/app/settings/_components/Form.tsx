"use client";

import { ChangeEvent, DragEvent, FormEvent, useState } from "react";
import axios from "axios";
import { mutate } from "swr";

import { showToast } from "@/hooks/Toast";
import Img from "@/components/Img";

interface Profile {
  email: string;
  username: string;
  avatar?: string;
  imgFile?: File | Blob;
}

export default function Settings({ data }: { data: Profile }) {
  const [profile, setProfile] = useState(data);
  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (files && files[0]) {
        setProfile((prev) => {
          return {
            ...prev,
            imgFile: files[0],
            avatar: URL.createObjectURL(files[0]),
          };
        });
      }
    } else {
      setProfile((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  }

  function handleDrag(e: DragEvent) {
    e.preventDefault();
    const targetFile = e.dataTransfer.files;
    if (targetFile && targetFile[0]) {
      setProfile((prev) => {
        return {
          ...prev,
          avatar: URL.createObjectURL(targetFile[0]),
          imgFile: targetFile[0],
        };
      });
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    handleLoading();
    const formData = new FormData();

    formData.append("username", profile.username);
    if (profile.imgFile) {
      formData.append("imgFile", profile.imgFile);
    }
    const sendProfileData = await axios.patch("/api/auth/user", formData);
    const { message, success } = sendProfileData.data;

    showToast({
      message: message,
      variants: success ? "success" : "error",
      position: "top",
    });
    setLoading(false);
    if (success) {
      mutate("/api/auth/user");
    }
    return;
  }

  const handleLoading = () => {
    setLoading(!loading);
  };

  return (
    <div className="px-5">
      <form
        onSubmit={submit}
        className="flex-1 flex flex-col dark:border-purple-400 dark:bg-gray-900 w-full sm:w-fit sm:mx-auto border border-purple my-10 gap-7 p-5 xs:p-7 bg-white rounded-md"
      >
        <div className="grid gap-4">
          <h1 className="font-bold text-2xl dark:text-white">Details</h1>

          <p className="text-gray-700 dark:text-gray-300">
            Add your details to create a personal touch to your profile.
          </p>
        </div>
        <div className="bg-veryLightGray py-3 rounded-md justify-items-start sm:text-center md:text-left flex gap-10 sm:flex-row flex-col  sm:items-center">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrag}
            className="bg-purple/10  dark:border-white relative overflow-hidden h-[190px] border-2 border-gray-900 w-[190px] rounded-md bg-no-repeat bg-cover"
          >
            {profile.avatar && (
              <Img
                src={profile.avatar}
                alt={profile.username}
                className="absolute inset-0 object-cover h-full w-full grayscale-100"
              />
            )}
            <label
              htmlFor="dropfile"
              className="h-full w-full relative items-center flex flex-col  gap-3 justify-center  cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                className={profile?.avatar ? "fill-white" : "fill-purple"}
                viewBox="0 0 40 40"
              >
                <path d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z" />
              </svg>
              <p
                className={`text-purple capitalize font-semibold ${
                  profile?.avatar ? "text-white" : ""
                }`}
              >
                {profile?.avatar ? "change image" : "+ upload image"}
              </p>
              <input
                type="file"
                name=""
                id="dropfile"
                className="hidden"
                onChange={handleChange}
                accept="image/*"
              />
            </label>
          </div>

          <div>
            <p className="text-gray-800 dark:text-gray-300">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:w-[700px] gap-5 rounded-md bg-veryLightGray p-3">
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 justify-between sm:sm:items-center">
            <label
              htmlFor="first name"
              className="capitalize whitespace-nowrap dark:text-gray-300 text-gray-700"
            >
              user name*
            </label>
            <input
              name={"username"}
              onChange={handleChange}
              value={profile.username}
              type="text"
              placeholder="eg. John "
              className=" cursor-pointer py-3 dark:bg-gray-600 dark:focus:shadow-gray-500 dark:text-white dark:border-gray-300 outline-0 focus:border- border-purple-500 flex w-full sm:w-[500px] focus:shadow-sm focus:shadow-purple has-[:focus]:border-ogColor items-center justify-between pr-3 bg-white  px-3 rounded-md border"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-5 justify-between sm:items-center sm:gap-10">
            <label
              htmlFor="Email"
              className="capitalize text-gray-700 dark:text-gray-300 whitespace-nowrap"
            >
              email
            </label>
            <input
              value={profile.email}
              onChange={handleChange}
              readOnly
              name={"email"}
              type="email"
              placeholder="eg.  email@example.com"
              className="py-3 border-gray-500 read-only:bg-gray-100 outline-0 flex w-full sm:w-[500px] cursor-auto items-center justify-between pr-3 placeholder:text-gray-700 read-only:opacity-70 read-only:border-gray-800 bg-white  px-3 rounded-md border"
            />
          </div>
        </div>

        <hr className="text-purple-300" />
        <button
          type="submit"
          disabled={
            !profile.username.trim() || profile.username.length < 3 || loading
          }
          className="w-fit py-3 px-5 dark:disabled:border-white dark:disabled:grayscale-50 dark:disabled:text-gray-500 disabled:grayscale-100 disabled:cursor-not-allowed rounded-md border-2 border-purple bg-purple/50"
        >
          {loading ? "loading..." : "Save"}
        </button>
      </form>
    </div>
  );
}
