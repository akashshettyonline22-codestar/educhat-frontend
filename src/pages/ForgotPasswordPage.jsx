import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Password reset link sent (not implemented).');
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-cyan-500 via-blue-400 to-blue-900">
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-md flex flex-col items-center">
        <div className="mb-6 flex items-center gap-3">
          <FaRobot className="h-10 w-10 text-white drop-shadow-lg" />
          <span className="text-white text-3xl font-extrabold tracking-tight">EduChat AI</span>
          <HiLightningBolt className="h-6 w-6 text-yellow-300 animate-pulse" />
        </div>
        <h2 className="text-white text-xl font-bold mb-4 text-center drop-shadow">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input type="email" placeholder="Enter your email" required className="w-full px-4 py-2 rounded-lg border-none bg-white/50 focus:bg-white/80 focus:outline-none shadow transition-all duration-300" />
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 font-semibold rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            Send Reset Link
          </button>
        </form>
        <div className="mt-4 text-sm text-center w-full">
          Remembered your password? <a href="/login" className="text-cyan-100 hover:text-white">Login</a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
