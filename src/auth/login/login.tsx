import { useForm } from "react-hook-form";
import BASE_URI from "./../../../constant.js";
import axios from "axios";
import toast, { Toaster } from "./../../../node_modules/react-hot-toast/src/index";
import { useNavigate } from "react-router";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(`${BASE_URI}/api/admin/login`, data);
      console.log(response.data);
       if(response.data.success === false){
        toast.error("Invalid Admin")
       }
      localStorage.setItem("token", response.data.data.token); 
      if (response.data.success === true) {
        toast.success("Admin LoggedIn Successfull");
        setTimeout(() => {
          navigate("/dashboard/home");
        }, 2000);
      } else {
        toast.error("Login Faild");
      }
    } catch (error) {
      toast.error("Invalid Admin");
      console.error("Registration error:", error);
    }

    console.log("Registration Data:", data);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0D2B2F] text-white">
      {/* Left Section (Logo) */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <div className="text-center">
          <img
            src="https://i.ibb.co.com/6JrncS0t/library-background-design-1300-221-removebg-preview.png"
            alt="Bailey and Co."
            className="h-64 w-auto mx-auto"
          />
          <h1 className="text-3xl font-semibold mt-4">
            {" "}
            Welcome To Admin Panel
          </h1>
        </div>
      </div>

      {/* Right Section (Login Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center border-l border-gray-500 p-6">
        <div className="w-full max-w-xl">
          <h2 className="text-2xl font-semibold text-center">Welcome</h2>
          <p className="text-center text-gray-400 mb-6">
            Please login to Admin Dashboard.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                {...register("email", { required: "Email is required" })}
                type="text"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-2xl border border-[#25545a] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-2xl border border-[#25545a] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition"
            >
              LOGIN
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-gray-400 hover:underline cursor-pointer">
            Forgotten Your Password?
          </p>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default Login;
