import { useForm } from "react-hook-form";
import {
  ErrorText,
  inputStyle,
  Label,
} from "../components/listing/NewListingHelper";
import { BlackButton, GreenButton } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { PasswordInputArea } from "../components/user/UserHelper";
import { useState } from "react";
import api from "../api/axios.js";

import useApiRequest from "../utils/useApiRequest";

function ForgotPassword() {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();

  const { request } = useApiRequest();
  const initialValues = {
    username: "",
    password: "",
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({ defaultValues: initialValues });

  async function onSubmit(data) {
    const updatedData = {
    ...data,
    state: "newPass",
  };
    const { error } = await request(
      () => api.post("/otp", { User: updatedData }),
      {
        loadingMessage: "Sending OTP...",
        successMessage: "OTP sent successfully",
      },
    );

    if (error) return;

    reset();
    navigate("/otpVerification", {
      state: {
        username: data.username,
        requestPath : "/user/forgotPassword",
        password : data.password,
        type: "newPass"
      },
    });
  }

  return (
    <div className="flex flex-col  items-center w-full my-8">
      <h1 className="mb-12!">Forgot Password</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-10 w-[70%] min-w-85 max-w-115"
      >
        <div className="relative w-full">
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
            placeholder=" "
            className={`${inputStyle} `}
          />

          <Label inputId="username" text="Email" />
          <ErrorText
            condition={errors?.username}
            message={errors?.username?.message}
          />
        </div>

        <div className="relative w-full">
          <PasswordInputArea
            eye={eye}
            setEye={setEye}
            register={register}
            inputStyle={inputStyle}
          />

          <Label inputId="password" text="New Password" />
          <ErrorText
            condition={errors?.password}
            message={errors?.password?.message}
          />
        </div>

        <div className="mt-2 text-sm text-red-500">
          {" "}
          <span className="font-medium">Password must:</span>{" "}
          <ul className="mt-1 list-disc list-inside space-y-1">
            {" "}
            <li>
              Be atleast <span className="font-semibold">8 characters</span>{" "}
              long
            </li>{" "}
            <li>
              Contain at least{" "}
              <span className="font-semibold">one uppercase letter</span> (A-Z)
            </li>{" "}
            <li>
              Contain at least{" "}
              <span className="font-semibold">one lowercase letter</span> (a-z)
            </li>{" "}
            <li>
              Contain at least <span className="font-semibold">one number</span>{" "}
              (0-9)
            </li>{" "}
            <li>
              {" "}
              Contain at least{" "}
              <span className="font-semibold">one special character</span> (@,
              $, !, %, *, ?, &, #, etc.){" "}
            </li>{" "}
          </ul>{" "}
          <div className="mt-2">
            {" "}
            <span className="font-medium">Example:</span>{" "}
            <span className="font-semibold">Secure@123</span>{" "}
          </div>{" "}
        </div>

        <div className="text-right pr-2">
          <BlackButton text="Back" onClick={() => navigate("/")} />

          {isDirty && (
            <GreenButton text="Change Password" type="submit" style="ml-4" />
          )}
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
