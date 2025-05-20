import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext.jsx";

const schema = yup.object().shape({
  username: yup.string().required("نام کاربری الزامی است"),
  password: yup.string().required("رمز عبور الزامی است"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "رمزها باید یکسان باشند")
    .required("تکرار رمز عبور الزامی است"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });
  const { handleNavigation } = useAuth();

  const onSubmit = async (data) => {
    try {
      await api.post("http://localhost:3000/auth/register", {
        username: data.username,
        password: data.password,
      });
      alert("ثبت‌نام موفق! لطفاً وارد شوید.");
      handleNavigation("login");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="register-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="register-form"
        noValidate
      >
        <img className="logo" src="/Union.svg" alt="logo" />
        <h2>فرم ثبت‌نام</h2>

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

        <div className="input-container">
          <input
            type="password"
            placeholder="تکرار رمز عبور"
            {...register("confirmPassword")}
            className={errors.confirmPassword ? "error" : ""}
          />
          <p className="error_text">{errors.confirmPassword?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="register-button"
        >
          {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
        </button>

        <p>
          <span
            className="Register-link"
            onClick={() => handleNavigation("login")}
          >
            حساب کاربری دارید؟
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
