import Form from "@/_components/Form";
import GoogleBtn from "@/_components/GoogleBtn";
import Img from "@/_components/Img";
import loginUser from "@/lib/loginUser";
import Link from "next/link";

export const metadata = {
  title: "Login | Lyricky",
};

export default async function Login() {
  return (
    <>
      <h3 className={"h1"}>Login</h3>
      <div className="formWrapper">
        <div className="routeForm">
          <Form
            name={"email"}
            name2={"password"}
            text={"Login"}
            action={loginUser}
            placeholder={"Email"}
            placeholder2={"Password"}
          />
          <h3 className="googleH3">OR</h3>
            <GoogleBtn />

          <div className="login2">
            <h5>
              Not Registered Yet?{" "}
              <Link href={"signup"} className="registerLogin">
                Sign-Up
              </Link>
            </h5>
          </div>
        </div>
        <div className="formImg">
          <Img
            src={"/images/logoRoute.jpeg"}
            alt={"Login form side image PNG"}
          />
        </div>
      </div>
    </>
  );
}
