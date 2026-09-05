import { useForm } from "react-hook-form";
import { ErrorText, inputStyle, Label } from "../../listing/NewListingHelper";
import { BlackButton, GreenButton } from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PasswordInputArea } from "../UserHelper";
import api from "../../../api/axios";
import useAuth from "../../../hooks/useAuth.hook";

function SignupHero() {
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);
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
  } = useForm({ defaultValues: initialValues });

  async function onSubmit(data) {
    try {
      const response = await api.post("/otp", { User: data });

      const { username, _id } = response.data.User;
      setUser({ username, id: _id });

      reset();
      navigate("/forgotPassword", {
        state: {
          username: data.username,
        },
      });
    } catch (error) {
      console.log(
        "error occurs at SignupHero.jsx file on submit form and error is: ",
        error,
      );
    }
  }

  return (
    <div className="flex flex-col  items-center w-full my-8">
      <h1 className="mb-12!">Signup</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-10 w-[70%] min-w-85 max-w-115"
      >
        <div className=" relative w-full">
          <input
            type="text"
            id="username"
            autoComplete="username"
            {...register("username", { required: "Username is required" })}
            placeholder=" "
            className={`${inputStyle} `}
          />

          <Label inputId="username" text="Username" />
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

          {isDirty && <GreenButton text="Signup" type="submit" style="ml-4" />}
        </div>
      </form>
    </div>
  );
}

export default SignupHero;
