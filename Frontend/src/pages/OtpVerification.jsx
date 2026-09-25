import { useForm } from "react-hook-form";
import { BlackButton, GreenButton } from "../components/ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ErrorText,
  inputStyle,
  Label,
} from "../components/listing/NewListingHelper";
import api from "../api/axios";
import useAuth from "../hooks/useAuth.hook";
import useApiRequest from "../utils/useApiRequest";

function OtpVerification({ path = "/" }) {
  const location = useLocation();
  const { username, requestPath, password, type } = location.state;
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { request } = useApiRequest();

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
    const updatedData = {
      ...data,
      password,
    };
    const { data: result, error } = await request(
      () => api.post(requestPath, { OTP: updatedData }),
      {
        loadingMessage: "Verifying OTP...",
        successMessage:
          type === "newUser"
            ? "Account created successfully"
            : "Password Changed successfully",
      },
    );

    if (type === "newUser") {
      setUser(
        result?.newUser && {
          id: result.newUser._id,
          username: result.newUser.username,
        },
      );
    } else {
      setUser(
        result?.result && {
          id: result.result.id,
          username: result.result.username,
        },
      );
    }

    if (error) return;

    reset();
    navigate(path);
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

export default OtpVerification;
