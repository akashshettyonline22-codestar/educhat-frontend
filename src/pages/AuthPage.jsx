import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


// Animated background blobs
function Blobs() {
  return (
    <>
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-400 opacity-20 blur-[100px] animate-pulse z-0" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-fuchsia-500 opacity-20 blur-[100px] animate-pulse z-0" />
      <div className="absolute top-8 right-0 w-64 h-64 rounded-full bg-cyan-400 opacity-20 blur-[80px] animate-pulse z-0" />
    </>
  );
}

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    full_name: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  const navigate = useNavigate();
  const { login, register, loading, error, clearError } = useAuth();

  // Shared input style
  const inputClass = "w-full px-4 py-3 rounded-xl border border-white/30 focus:border-indigo-400 focus:outline-none bg-white/70 placeholder:text-gray-400 shadow focus:ring-2 focus:ring-indigo-200 font-semibold";
  const errorInputClass = "w-full px-4 py-3 rounded-xl border border-red-400 focus:border-red-400 focus:outline-none bg-white/70 placeholder:text-gray-400 shadow focus:ring-2 focus:ring-red-200 font-semibold";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Register-specific validation
    if (!isLogin) {
      if (!formData.username) {
        errors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
      }

      if (!formData.full_name) {
        errors.full_name = 'Full name is required';
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        await register({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          full_name: formData.full_name
        });
      }
      
      // Success! Navigate to dashboard
      navigate("/home");
    } catch (err) {
      console.error('Auth failed:', err.message);
    }
  };

  const clearForm = () => {
    setFormData({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      full_name: ''
    });
    setFormErrors({});
    if (error) clearError();
  };

  const switchMode = (loginMode) => {
    setIsLogin(loginMode);
    clearForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-fuchsia-100 to-white relative overflow-hidden">
      <Blobs />
      <div className="relative z-10 w-full max-w-md">
        <div className="shadow-2xl rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/50 px-10 py-12 flex flex-col items-center animate-fadein">
          <div className="flex flex-col items-center mb-9">
            <span className="shadow rounded-full p-2 bg-indigo-600/80 mb-2 ring-4 ring-blue-300/30">
              <FaRobot className="text-white text-4xl drop-shadow animate-bounce-slow" />
            </span>
            <span className="text-4xl font-extrabold text-indigo-700 drop-shadow-md tracking-tight mt-2">EduChat AI</span>
            <span className="text-sm text-indigo-400 mt-1 mb-2 flex items-center gap-1">
              <HiSparkles className="inline text-yellow-400" /> Smarter Education Starts Here
            </span>
          </div>

          {/* Tabs */}
          <div className="mb-6 grid grid-cols-2 gap-1 bg-indigo-100/50 rounded-xl w-full">
            <button
              type="button"
              onClick={() => switchMode(true)}
              className={`py-2 text-lg font-semibold rounded-xl transition ${
                isLogin
                  ? "bg-indigo-600 text-white shadow"
                  : "hover:bg-indigo-200/80 text-indigo-500"
              }`}
            >Login</button>
            <button
              type="button"
              onClick={() => switchMode(false)}
              className={`py-2 text-lg font-semibold rounded-xl transition ${
                !isLogin
                  ? "bg-indigo-600 text-white shadow"
                  : "hover:bg-indigo-200/80 text-indigo-500"
              }`}
            >Register</button>
          </div>

          {/* Form */}
          <div className="relative w-full mt-1">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 animate-fadein">
              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className={formErrors.email ? errorInputClass : inputClass}
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>

              {/* Register-only fields */}
              {!isLogin && (
                <>
                  <div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Username"
                      required
                      className={formErrors.username ? errorInputClass : inputClass}
                    />
                    {formErrors.username && <p className="text-red-500 text-xs mt-1">{formErrors.username}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      required
                      className={formErrors.full_name ? errorInputClass : inputClass}
                    />
                    {formErrors.full_name && <p className="text-red-500 text-xs mt-1">{formErrors.full_name}</p>}
                  </div>
                </>
              )}

              {/* Password */}
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  required
                  className={formErrors.password ? errorInputClass : inputClass}
                />
                {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
              </div>

              {/* Confirm Password (Register only) */}
              {!isLogin && (
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    required
                    className={formErrors.confirmPassword ? errorInputClass : inputClass}
                  />
                  {formErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>}
                </div>
              )}

              {/* API Error */}
              {/* {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )} */}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-xl font-bold shadow-lg transition-all ${
                  isLogin 
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-400" 
                    : "bg-gradient-to-r from-fuchsia-500 to-indigo-500"
                } text-white hover:scale-105 hover:shadow-2xl ${
                  loading ? 'opacity-50 cursor-not-allowed transform-none' : ''
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </span>
                ) : (
                  isLogin ? 'Login' : 'Register'
                )}
              </button>

              {/* Forgot Password (Login only) */}
              {isLogin && (
                <div className="flex justify-center mt-2 text-sm">
                  <button
                    type="button"
                    onClick={() => alert("Password reset (to be implemented)")}
                    className="text-indigo-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-5">© {new Date().getFullYear()} EduChat AI. All rights reserved.</p>
      </div>
    </div>
  );
}

export default AuthPage;
