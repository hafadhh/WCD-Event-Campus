import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  return (
    <AuthLayout>
      <div>
        <h1 className="text-5xl font-black text-dark">Welcome Back</h1>

        <p className="mt-4 leading-relaxed text-softText">
          Sign in to continue exploring campus events.
        </p>

        <div className="mt-10 space-y-6">
          <Input label="Email" placeholder="Enter your email" />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <Button
            onClick={() => {
              login();
              navigate("/dashboard");
            }}
          >
            Sign In
          </Button>
        </div>

        <p className="mt-8 text-center text-softText">
          Don’t have an account?{" "}
          <Link to="/register" className="font-bold text-primary">
            Create account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;
