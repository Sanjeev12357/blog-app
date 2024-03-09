import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@sanjeev12357/md-blog";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  const navigate=useNavigate();
  // {JSON.stringify(postInputs)}
  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" :"signin "}`,postInputs);
     
      const jwt = await  response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      //alert the user here that the req failed
    }
  }
  return (
    <div className="h-screen flex justify-center   items-center flex-col">
      <div className="flex flex-col w-3/4  justify-center">
        <div className="px-10 pb-8">
          <div className="text-3xl font-extrabold">Create an account</div>
          <div className="text-slate-400">
            {type === "signin"
              ? "Don't have an account"
              : "Already have an account ?"}
            <Link
              className="pl-2 underline"
              to={type === "signin" ? "/signup" : "/signin"}
            >
              {type === "signin" ? "Signup" : "Login"}
            </Link>
          </div>
        </div>
        {type === "signup" ? (
          <LabelledInput
            label="Name"
            placeholder="Sanjeev Singh"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                name: e.target.value,
              }));
            }}
          />
        ) : null}
        <LabelledInput
          label="username"
          placeholder="sanjeevsinghsain48@gmail.com"
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              username: e.target.value,
            }));
          }}
        />
        <LabelledInput
          label="password"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              password: e.target.value,
            }));
          }}
        />
        <button
          type="button"
          onClick={sendRequest}
          className="text-white w-full mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          {type === "signup" ? "Sign up" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
