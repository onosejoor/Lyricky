import Form from "@/_components/Form";
import Link from "next/link";
import registerUser from "@/lib/RegisterUser";
import Img from "@/_components/Img";
import GoogleBtn from "@/_components/GoogleBtn";

export const metadata = {
  title: "Sign-Up | Lyricky",
};

export default async function Register() {
  return (
    <>
      <h3 className={"h1"}>Register</h3>
      <div className="formWrapper">
        <div className="routeForm">
          <Form
            action={registerUser}
            name={"email"}
            name2={"password"}
            text={"Register"}
            username={true}
            placeholder={"Email"}
            placeholder2={"Password"}
          />
          <h3 className="googleH3">OR</h3>
          <GoogleBtn />

          <div className="login2">
            <h5>
              Already Have An Account?{" "}
              <Link href={"login"} className="registerLogin">
                Log-In
              </Link>
            </h5>
          </div>
        </div>
        <div className="formImg">
          <Img
            src={"/images/logoRoute.jpeg"}
            alt="Signup form side image PNG"
          />
        </div>
      </div>
    </>
  );
}
