"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Loader from "./loader";
import { GoogleIcon } from "../../components/Icons";

const GoogleBtn = () => {
  const [loading, setLoading] = useState(false);

  const signInFunction = () => {
    signIn("google", { callbackUrl: "/lyrics" });
  };

  const handleClick = () => {
    setLoading(true);
    signInFunction();
    setTimeout(() => {
      setLoading(false);
    }, 20000);
  };

  return (
    <button className="flex dark:border-white items-center gap-3 py-2 rounded-md border border-purple w-full justify-center mb-5" onClick={handleClick}>
      <span>{!loading ? <GoogleIcon /> : <Loader />}</span>
      Sign-In with Google
    </button>
  );
};

export default GoogleBtn;
