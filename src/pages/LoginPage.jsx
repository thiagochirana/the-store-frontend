import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';

import LoginForm from '../components/auth/login/Form';


const SessionPage = () => {
  const dispatch = useDispatch();
  const { status, errors } = useSelector((state) => state.auth);

  const handleLogin = (credentials) => {
    dispatch(login(credentials));
  };

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <LoginForm 
          onSubmit={handleLogin}
          isLoading={status === 'loading'}
          error={Array.isArray(errors) ? errors.join(', ') : null}
        />
      </div>
    </div>
  );
};

export default SessionPage;