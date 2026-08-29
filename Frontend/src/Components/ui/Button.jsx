import { Link } from "react-router-dom";

export const GreenButton = ({
  text = "button",
  type = "button",
  style = "",
  onClick = () => {},
}) => (
  <button
    type={type}
    className={`${style} border  p-2 rounded-xl hover:bg-green-300 hover:border-green-300 transition hover:text-white duration-200 `}
    onClick={onClick}
  >
    {text}
  </button>
);

export const RedButton = ({
  text = "button",
  type = "button",
  style = "",
  onClick = () => {},
}) => (
  <button
    type={type}
    className={`${style} border  p-2 rounded-xl hover:bg-red-300 hover:border-red-300 transition hover:text-white duration-200 `}
    onClick={onClick}
  >
    {text}
  </button>
);

export const BlackButton = ({
  text = "button",
  type = "button",
  style = "",
  onClick = () => {},
}) => (
  <button
    type={type}
    className={`${style} border  p-2 rounded-xl hover:bg-black hover:border-black transition hover:text-white duration-200 `}
    onClick={onClick}
  >
    {text}
  </button>
);

export const GreenButtonLink = ({
  path = "/",
  text = "button",
  type = "button",
  style = "",
  state = {},
  onClick = () => {},
}) => (
  <Link to={path}>
    <button
      type={type}
      className={`${style} border  p-2 rounded-xl hover:bg-green-300 hover:border-green-300 transition hover:text-white duration-200 `}
      onClick={onClick}
      state={state}
    >
      {text}
    </button>
  </Link>
);

export const RedButtonLink = ({
  path = "/",
  text = "button",
  type = "button",
  style = "",
  state = {},
  onClick = () => {},
}) => (
  <Link to={path}>
    <button
      type={type}
      className={`${style} border  p-2 rounded-xl hover:bg-red-300 hover:border-red-300 transition hover:text-white duration-200 `}
      onClick={onClick}
      state={state}
    >
      {text}
    </button>
  </Link>
);
