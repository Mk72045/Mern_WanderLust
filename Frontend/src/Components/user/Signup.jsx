import api from "../../assets/axios.js";
import { useForm } from "react-hook-form";

function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandle = async (data) => {
    try {
      const res = await api.post("/api/signup", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      console.log(`${data.username} signed up successfully`, res);

      reset(); // clear all fields
    } catch (err) {
      console.log(`${data.username} signup failed`, err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

        <form onSubmit={handleSubmit(submitHandle)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block mb-1 font-medium">Username</label>

            <input
              type="text"
              placeholder="Enter username"
              className="w-full border rounded-lg px-3 py-2"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
            />

            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full border rounded-lg px-3 py-2"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border rounded-lg px-3 py-2"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
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
            className={`w-full py-2 rounded-lg text-white ${
              isSubmitting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
