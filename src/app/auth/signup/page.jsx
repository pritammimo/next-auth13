"use client";
import Button from "@/Components/elements/Button";
import TextBox from "@/Components/elements/TextBox";
import { backendURL } from "@/lib/auth";
// import Button from "@elements/Button";
// import TextBox from "@elements/TextBox";
import axios from "axios";
import { useRef } from "react";
import { signIn } from "next-auth/react";
const Signuppage = () => {
  const email = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
    axios.post(backendURL + "/signup", {
        email: email.current,
        password:pass.current,
        role:"admin"
      })
      .then(function (response) {
        const result = signIn("credentials", {
            email: email.current,
            password: pass.current,
            redirect: true,
            callbackUrl: "/",
          });
      })
      .catch(function (error) {
        console.log(error);
      });
    // const result = await signIn("credentials", {
    //     email: email.current,
    //     password: pass.current,
    //     redirect: true,
    //     callbackUrl: "/",
    //   });
  };
  return (
    <div className={"flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600"}>
      <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
        <TextBox lableText="User Name" onChange={(e) => (email.current = e.target.value)} />
        <TextBox lableText="Password" type={"password"} onChange={(e) => (pass.current = e.target.value)} />
        <Button onClick={onSubmit}>Signup</Button>
      </div>
    </div>
  );
};

export default Signuppage;
