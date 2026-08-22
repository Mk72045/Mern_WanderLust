export const GreenButton = ({
  text = "button",
  type = "button",
  style = "",
}) => (
  // <NavLink
  //   to={path}
  //   className={`border  p-2 rounded-xl hover:bg-green-300 hover:border-none`}
  // >
  <button
    type={type}
    className={`${style} border  p-2 rounded-xl hover:bg-green-300 hover:border-green-300 transition hover:text-white duration-200 `}
  >
    {text}
  </button>
  // </NavLink>
);
