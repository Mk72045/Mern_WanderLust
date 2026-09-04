import { NavLink } from "react-router-dom";
import { GreenButton } from "../components/ui/Button";

const PageNotFound = () => {
  return (
    <main className="h-full flex items-center justify-center px-5 py-10 bg-slate-50">
      <div className="w-full max-w-xl text-center">
        <div className="text-[120px] sm:text-[160px] font-extrabold leading-none text-slate-200">
          404
        </div>

        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-800">
          Page Not Found
        </h1>

        <p className="mt-4 mx-auto  text-slate-500 leading-7">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        <NavLink to="/" className="inline-block mt-7">
          <GreenButton>Go Back Home</GreenButton>
        </NavLink>
      </div>
    </main>
  );
};

export default PageNotFound;
