import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const PasswordInputArea = ({ eye, setEye, register, inputStyle }) => {
  return (
    <>
      <input
        type={eye ? "text" : "password"}
        id="password"
        autoComplete="current-password"
        {...register("password", {
          required: "Password is required",
        })}
        placeholder=" "
        className={`${inputStyle} peer pr-12`}
      />

      <button
        type="button"
        onClick={() => setEye((pre) => !pre)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        {eye ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </button>
    </>
  );
};

export const BlueTextButton = ({
  type = "button",
  text = "no text",
  style,
  onClick = {},
}) => {
  return (
    <button
      type={type}
      className={`${style} text-blue-400 p-2 hover:text-purple-500 hover:shadow rounded-2xl transition duration-200`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
