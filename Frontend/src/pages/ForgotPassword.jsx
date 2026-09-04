import { useForm } from "react-hook-form";
import { BlackButton, GreenButton } from "../components/ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ErrorText,
  inputStyle,
  Label,
} from "../components/listing/NewListingHelper";
import api from "../api/axios";

function ForgotPassword({ path = "/" }) {
  const location = useLocation();
  const username = location.state?.username;
  const navigate = useNavigate();

  const initialValues = {
    username,
    otp: "",
  };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({ defaultValues: initialValues });

  async function onSubmit(data) {
    try {
      // console.log("data is: ", data);
      await api.post("/user/signup", { OTP: data });
      // console.log("response at ForgotPassword.jsx file: ", response);
      reset();
      navigate(path);
    } catch (error) {
      console.log(
        "error in onsubmit function at ForgotPassword.jsx file: ",
        error,
      );
      console.log(
        "in onsubmit function at ForgotPassword.jsx file backend response is: ",
        error.response,
      );
    }
  }

  return (
    <div className="flex flex-col  items-center w-full my-8">
      <h1 className="mb-12!">OTP Verification</h1>
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
            readOnly
          />

          <Label inputId="username" text="Username" />
        </div>

        <div className="relative w-full">
          <input
            type="text"
            id="otp"
            {...register("otp", { required: "OTP is required" })}
            placeholder=" "
            className={`${inputStyle} peer`}
          />

          <Label inputId="otp" text="OTP" />

          <ErrorText condition={errors?.otp} message={errors?.otp?.message} />
        </div>

        <div className="text-right pr-2">
          <BlackButton text="Back" onClick={() => navigate(path)} />

          {dirtyFields.otp && (
            <GreenButton text="Verify" type="submit" style="ml-4" />
          )}
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
