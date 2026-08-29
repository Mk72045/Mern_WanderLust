

export const Label = ({ inputId = "none", text = "na" }) => {
  return (
    <label
      htmlFor={inputId}
      className="
        absolute
        left-3
        top-0
        -translate-y-1/2
        bg-white
        px-1

        text-sm
        text-gray-500

        transition-all
        duration-200
        pointer-events-none

        peer-placeholder-shown:top-1/2
        peer-placeholder-shown:-translate-y-1/2
        peer-placeholder-shown:text-xl

        peer-focus:top-0
        peer-focus:-translate-y-1/2
        peer-focus:text-sm
        peer-focus:text-blue-500
      "
    >
      {text}
    </label>
  );
};

export const inputStyle =
  " peer w-full  rounded-xl  border  border-gray-300  text-xl  p-3.5  text-gray-900 outline-none transition-all hover:border-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500  ";

export const ErrorText = ({ condition, message }) => {
  if (!condition) return null;

  return (
    <p className="absolute left-2 top-full mt-1 text-sm text-red-500">
      {message}!
    </p>
  );
};
