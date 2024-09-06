import { SignupInput } from "@aryanx16/medium-common";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form"
import { BACKEND_URL } from "../config";

type Inputs = {
  password: string;
  email: string;
  name?: string;
};

export default function Auth({ type }: { type: "signup" | "signin" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  async function handlesubmit(data: Inputs) {
    try {
      const postinputs: SignupInput = {
        username: data.email, // Map email to username for API
        password: data.password,
        name: data.name || "", // For signup, provide the name field; otherwise, it will be empty
      };

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
        postinputs
      );
      const jwt = await response.data;

      localStorage.setItem("token", jwt);

      if (type === "signup") {
        navigate("/signin");
      } else {
        navigate("/blogs");
      }
    } catch (e) {
      console.log(e);
      alert("Use another email");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handlesubmit)}>
        <div className="h-screen flex flex-col justify-center items-center">
          <div>
            <div className="px-10 pb-2 text-center">
              <div className="text-4xl font-bold">
                {type === "signup" ? "Create an account" : "Login to your account"}
              </div>
              <div className="">
                {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                <Link className="text-blue-500" to={type === "signin" ? "/signup" : "/signin"}>
                  {type === "signup" ? "Login" : "Register"}
                </Link>
              </div>
            </div>

            {type === "signup" ? (
              <>
                <label className="block pb-1 font-bold text-sm text-black">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  {...register("name", {
                    required: type === "signup",
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.name && <div className="text-red-500 text-sm">Name is required</div>}
              </>
            ) : null}

            <label className="block pb-1 font-bold text-sm text-black">Email</label>
            <input
              type="text"
              placeholder="test@gmail.com"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.email && <div className="text-red-500 text-sm">Use a valid email</div>}

            <label className="block pb-1 font-bold text-sm text-black">Password</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.password && <div className="text-red-500 text-sm">Min length is 6</div>}

            <button
              type="submit"
              className="w-full text-base mt-2 font-bold text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg px-5 py-2.5 me-2 mb-2"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
