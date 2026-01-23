import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../auth/AuthContext";
import "./Login.scss";

type LoginForm = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginForm) => {
    try {
      login(data.email, data.password);
      navigate("/"); // ✅ AQUÍ ESTÁ LA CLAVE
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <h1>Dragonball Admin</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="Email" {...register("email")} />
          <span>{errors.email?.message}</span>

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <span>{errors.password?.message}</span>

          <button type="submit">INGRESAR</button>
        </form>
      </div>

      <div className="login-image" />
    </div>
  );
};

export default Login;
