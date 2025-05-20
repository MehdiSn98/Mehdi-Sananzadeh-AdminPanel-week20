import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext.jsx";
import "../styles/Login_Register.css";

const schema = yup.object().shape({
  username: yup.string().required("نام کاربری الزامی است"),
  password: yup.string().required("رمز عبور الزامی است"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });
  const { handleLogin, handleNavigation } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      const token = res.data.token;
      if (!token) throw new Error("توکن دریافت نشد!");
      handleLogin(token);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "خطای ناشناخته";
      alert(msg);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form" noValidate>
        <img className="logo" src="/Union.svg" alt="logo" />
        <h2>فرم ورود</h2>

        <div className="input-container">
          <input
            type="text"
            placeholder="نام کاربری"
            {...register("username")}
            className={errors.username ? "error" : ""}
          />
          <p className="error_text">{errors.username?.message}</p>
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="رمز عبور"
            {...register("password")}
            className={errors.password ? "error" : ""}
          />
          <p className="error_text">{errors.password?.message}</p>
        </div>

        <button type="submit" disabled={isSubmitting} className="login-button">
          {isSubmitting ? "در حال ورود..." : "ورود"}
        </button>

        <p>
          <span
            className="Register-link"
            onClick={() => handleNavigation("register")}
          >
            ایجاد حساب کاربری!
          </span>
        </p>
      </form>
    </div>
  );
}
