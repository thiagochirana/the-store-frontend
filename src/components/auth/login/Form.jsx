import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const LoginForm = ({ onSubmit, isLoading, error }) => {
  const [credentials, setCredentials] = useState({ login: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="formStyle">
      <h1 className="text-2xl font-bold text-center mb-4">Acesso</h1>
        <div>
          <input
            type="login"
            placeholder="login"
            value={credentials.login}
            onChange={(e) => setCredentials({ ...credentials, login: e.target.value })}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>
        <div>
          <button
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </div>
        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;