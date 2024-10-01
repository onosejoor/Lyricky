"use client";
import toast from "react-hot-toast";
import Input from "./Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./loader";

const Form = ({
  name,
  name2,
  placeholder,
  placeholder2,
  text,
  action,
  username,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function checkInput(e) {
    console.log(e.target);
    
  }

  const load = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const form = await action(formData);

    if (!form.success) {
      toast.error(form.message);
    } else {
      toast.success(form.message);
    }
    if (form.redirect) {
      setTimeout(() => {
        router.push("/lyrics");
      }, 500);
    }
    setLoading(false);
  };

  return (
    <>
      <form className="registerForm" onSubmit={load}>
        {" "}
        {username && (
          <>
            <label htmlFor={"username"}>{"Username"}</label>
            <Input svg={false} name={"username"} placeholder={"Username"} />
          </>
        )}
        <label htmlFor={name}>{name}</label>
        <Input svg={false} name={name} placeholder={placeholder} />
        <label htmlFor={name2}>{name2}</label>
        <Input svg={true} name={name2} placeholder={placeholder2} />
        <button
          type="submit"
          className="CTAbutton formBtn"
          id="btn-register"
        >
          {loading ? (
            <>
              <Loader /> Loading...
            </>
          ) : (
            text
          )}
        </button>
      </form>
    </>
  );
};

export default Form;
