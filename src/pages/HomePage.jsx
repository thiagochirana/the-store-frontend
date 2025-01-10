import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.status !== "succeeded") {
      navigate("/login");
    }
  }, [authState.status, navigate]);

  return (
    <div>
      <h1>Home</h1>
      {authState.status === "succeeded" ? (
        <div className="text-blue">
          <p>{authState.name}</p>
          <button onClick={() => dispatch(logout())} className="bg-red-600">
            Logout
          </button>
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </div>
  );
};

export default HomePage;
