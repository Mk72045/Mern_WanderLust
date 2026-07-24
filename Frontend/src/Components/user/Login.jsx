import { useForm } from "react-hook-form";
import api from "../../assets/axios.js";

function Login() {
  async function mySubmitHandler(data) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("data is submitted", data);

    try {
      const response = await api.post("/api/login", {
        email: data.email,
        password: data.password,
      });
      console.log("status is: ", response);
      console.log("data is: ", response.data);
      console.log("data is: ", response.data.success);
    } catch (err) {
      console.log("the error to login is: ", err);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(mySubmitHandler)}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 font-medium text-gray-700"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 font-medium text-gray-700"
          >
            Password
          </label>

          <input
            type="password"
            id="password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password", {
              required: "Password is required",
            })}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-lg text-white font-medium transition ${
            isSubmitting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
