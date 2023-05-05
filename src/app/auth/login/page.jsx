"use client";
import Button from "@/Components/elements/Button";
import TextBox from "@/Components/elements/TextBox";
import { backendURL } from "@/lib/auth";
import axios from "axios";
// import Button from "@elements/Button";
// import TextBox from "@elements/TextBox";
import { signIn } from "next-auth/react";
import { useRef } from "react";



const LoginPage = () => {
  const email = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
   await axios.post(backendURL + "/signin", {
      email: email.current,
      password: pass.current,
    })
    .then(function (response) {
      const result = signIn("credentials", {
      //   email: email.current,
      //  password: pass.current,
      accessToken:response?.data?.accessToken,
       address:response?.data?.user?.address,
       email: response?.data?.user?.email,
       id: response?.data?.user?.id,
      name: response?.data?.user?.name,
      phone: response?.data?.user?.phone,
      role: response?.data?.user?.role,
      redirect: true,
      callbackUrl: "/",
    });
    })
    .catch(function (error) {
      console.log(error);
    });
  
    // const result = await signIn("credentials", {
    //   email: email.current,
    //   password: pass.current,
    //   redirect: false,
    //   callbackUrl: "/",
    // });
  };
  return (
    <div className={"flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600"}>
      <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
        <TextBox lableText="User Name" onChange={(e) => (email.current = e.target.value)} />
        <TextBox lableText="Password" type={"password"} onChange={(e) => (pass.current = e.target.value)} />
        <Button onClick={onSubmit}>Login</Button>
      </div>
    </div>
  );
};

export default LoginPage;
