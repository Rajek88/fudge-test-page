import { USE_BASE_URL } from "config/URL";
import ShowError from "pages/components/ShowError";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("Oops! Something went wrong.");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const showError = (errMsg: string) => {
    // setError message
    if (!errMsg) {
      setErrMsg("Oops! Something went wrong.");
    } else {
      setErrMsg(errMsg);
    }
    // setErr as true
    setErr(true);
    // after 2 seconds make it false
    setTimeout(() => {
      setErr(false);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // make API call to BE
    try {
      const res = await fetch(`${USE_BASE_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      // if we get ok in response, then ask user to login now
      if (res.ok) {
        // this means we have received the token now
        const data = await res.json();
        // now store it as user in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...data,
          })
        );
        return setTimeout(() => {
          return window.location.reload();
        }, 1000);
      } else {
        // else something failed, throw error
        throw Error();
      }
    } catch (error) {
      return showError("Error while signing you up! Please try again later");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {err && (
          <div>
            <ShowError message={errMsg} />
          </div>
        )}
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded-md px-3 py-2"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border rounded-md px-3 py-2"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="text-blue-500 font-semibold"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
