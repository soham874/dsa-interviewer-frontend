import { API_BASE_URL } from './config';

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/login/google`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Login</h1>
      <button
        onClick={handleGoogleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}
