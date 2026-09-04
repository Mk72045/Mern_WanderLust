import { useForm } from "react-hook-form";
import { ErrorText, inputStyle, Label } from "../../listing/NewListingHelper";
import { BlackButton, GreenButton } from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { BlueTextButton, PasswordInputArea } from "../UserHelper";
import { useState } from "react";
import api from "../../../api/axios";
import useAuth from "../../../hooks/useAuth.hook";

function LoginHero({ path = "/" }) {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const initialValues = {
    username: "",
    password: "",
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
    // setValue,
  } = useForm({ defaultValues: initialValues });

  async function onSubmit(data) {
    try {
      console.log("data is: ", data);
      const response = await api.post("/user/login", { User: data });
      const { username, _id } = response.data.User;
      setUser({ username, id: _id });
      // console.log("LoginHero.jsx response is: ", response);
      reset();
      navigate(path);
    } catch (error) {
      console.log("error in LoginHero.jsx file: ", error);
    }
  }

  return (
    <div className="flex flex-col  items-center w-full my-8">
      <h1 className="mb-12!">Login</h1>
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

          <Label inputId="password" text="Password" />
          <ErrorText
            condition={errors?.password}
            message={errors?.password?.message}
          />
        </div>

        <div className="text-right pr-2">
          <BlackButton text="Back" onClick={() => navigate("/")} />

          {isDirty && <GreenButton text="Login" type="submit" style="ml-4" />}
        </div>

        <div className="flex justify-between">
          <BlueTextButton
            text="Forgot Password"
            onClick={() => navigate("/forgotPassword")}
          />
          <BlueTextButton
            text="Create Account"
            onClick={() => navigate("/signup")}
          />
        </div>
      </form>
    </div>
  );
}

export default LoginHero;
