import { useForm } from "react-hook-form";
import toast, {
  Toaster,
} from "./../../../node_modules/react-hot-toast/src/index";
import axios from "axios";
import BASE_URI from "./../../../constant.js";
import { useNavigate } from "react-router";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();


const onSubmit = async (data: FormData) => {
    if (data.password === data.confirmPassword) {
        try {
            const response = await axios.post(`${BASE_URI}/api/admin/register`, data);
            console.log(response.data);
            if (response.data.success) {
                toast.success("Registration Successful");
                navigate("/");
            } else {
                toast.error("Admin with this email already exists");
            }
        } catch (error) {
            toast.error("An error occurred during registration");
            console.error("Registration error:", error);
        }
    } else {
        toast.error("Passwords do not match");
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

      {/* Right Section (Registration Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center border-l border-gray-500 p-6">
        <div className="w-full max-w-xl">
          <h2 className="text-2xl font-semibold text-center">Register</h2>
          <p className="text-center text-gray-400 mb-6">
            Please register to Admin Dashboard.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                {...register("name", { required: "Username is required" })}
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 rounded-2xl border border-[#25545a] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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

            <div>
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 rounded-2xl border border-[#25545a] text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
