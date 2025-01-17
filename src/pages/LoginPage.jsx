import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import LoginForm from "../components/auth/login/Form";

const SessionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, errors } = useSelector((state) => state.auth);

  const handleLogin = (credentials) => {
    dispatch(login(credentials)).then((action) => {
      if (action.type === "auth/login/fulfilled") {
        navigate("/");
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="">
        <LoginForm
          onSubmit={handleLogin}
          isLoading={status === "loading"}
          error={Array.isArray(errors) ? errors.join(", ") : null}
        />
      </div>
    </div>
  );
};

export default SessionPage;
