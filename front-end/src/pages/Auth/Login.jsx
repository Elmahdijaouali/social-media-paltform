import { useState, useEffect } from "react"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Checkbox from "@/components/ui/Checkbox"
import Alert from "@/components/ui/Alert"
import IconButton from "@/components/ui/IconButton"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthProvider"

export default function LoginForm({ onSwitchToSignup }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const { login, loginStatus, loginError, signupSuccessMessage, clearSignupSuccessMessage, user } = useAuth()
  const navigate = useNavigate();
  
  const isLoading = loginStatus === "pending"

  useEffect(() => {
    // Redirect if user is logged in
    if (user) {
      navigate("/app/home");
    }
  }, [user, navigate]);

  // Auto-clear success message after 20 seconds
  useEffect(() => {
    if (signupSuccessMessage) {
      const timer = setTimeout(() => {
        clearSignupSuccessMessage();
      }, 20000); // 20 seconds

      return () => clearTimeout(timer);
    }
  }, [signupSuccessMessage, clearSignupSuccessMessage]);

  const dismissSuccessMessage = () => {
    clearSignupSuccessMessage();
  }

  const validateForm = () => {
    const newErrors = {}

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setErrors({})
    login(formData)
  }

  // Show login error if it exists
  const generalError = loginError?.response?.data?.error || 
                      loginError?.response?.data?.message || 
                      loginError?.response?.data?.msg ||
                      loginError?.message
  
  // Debug logging to see the actual error structure
  useEffect(() => {
    if (loginError) {
      console.log('Full loginError:', loginError)
      console.log('loginError.response:', loginError.response)
      console.log('loginError.response.data:', loginError.response?.data)
      console.log('loginError.message:', loginError.message)
    }
  }, [loginError])

  
  // Get user-friendly error message
  const getUserFriendlyError = () => {
    if (generalError) {
      // Handle 400 status code specifically
      if (loginError?.response?.status === 400) {
        if (generalError.toLowerCase().includes('invalid') && generalError.toLowerCase().includes('password')) {
          return "Invalid username or password. Please check your credentials and try again.";
        }
        if (generalError.toLowerCase().includes('username') && generalError.toLowerCase().includes('not found')) {
          return "Username not found. Please check your username or create a new account.";
        }
        if (generalError.toLowerCase().includes('account') && generalError.toLowerCase().includes('locked')) {
          return "Your account has been locked. Please contact support for assistance.";
        }
        // For generic 400 errors
        if (generalError.toLowerCase().includes('request failed')) {
          return "There was an issue with your request. Please check your information and try again.";
        }
      }
      
      // Handle other common error patterns
      if (generalError.toLowerCase().includes('network') || generalError.toLowerCase().includes('connection')) {
        return "Unable to connect to the server. Please check your internet connection and try again.";
      }
      
      // Return the original error if no specific pattern matches
      return generalError;
    }
    return null;
  }
  
  const userFriendlyError = getUserFriendlyError()

  return (
    <div className="min-h-screen bg-gradient-to-br from-lightgreen to-paleblue flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 backdrop-blur">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple to-blue flex items-center justify-center">
            {/* Lock Icon SVG */}
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17a2 2 0 002-2v-2a2 2 0 00-2-2 2 2 0 00-2 2v2a2 2 0 002 2zm6-6V9a6 6 0 10-12 0v2a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2z" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-darkgrey">Welcome Back</h2>
          <p className="text-grey text-center">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            {signupSuccessMessage && (
              <div className="relative">
                <Alert type="success">
                  {signupSuccessMessage}
                </Alert>
                <button
                  type="button"
                  onClick={dismissSuccessMessage}
                  className="absolute top-2 right-2 text-green-600 hover:text-green-800 transition-colors"
                  aria-label="Dismiss success message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            {userFriendlyError && <Alert type="error">{userFriendlyError}</Alert>}
            <div>
              <label className="block text-darkgrey font-medium mb-1">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey">
                  {/* AtSign Icon SVG */}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 11-12 0 6 6 0 0112 0zm0 0v2a2 2 0 01-2 2H8a2 2 0 01-2-2V8" /></svg>
                </span>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  error={!!errors.username}
                  className="pl-10"
                />
              </div>
              {errors.username && <p className="text-red text-sm mt-1">{errors.username}</p>}
            </div>
            <div>
              <label className="block text-darkgrey font-medium mb-1">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey">
                  {/* Lock Icon SVG */}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17a2 2 0 002-2v-2a2 2 0 00-2-2 2 2 0 00-2 2v2a2 2 0 002 2zm6-6V9a6 6 0 10-12 0v2a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2z" /></svg>
                </span>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  error={!!errors.password}
                  className="pl-10 pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <IconButton
                    onClick={() => setShowPassword((v) => !v)}
                    icon={showPassword ? (
                      // ViewOff SVG
                      <svg className="w-5 h-5 text-grey" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575M6.343 6.343A7.963 7.963 0 004 9c0 4.418 3.582 8 8 8 1.657 0 3.22-.403 4.575-1.125M17.657 17.657A7.963 7.963 0 0020 15c0-4.418-3.582-8-8-8-1.657 0-3.22.403-4.575 1.125" /></svg>
                    ) : (
                      // View SVG
                      <svg className="w-5 h-5 text-grey" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.5 0a9.77 9.77 0 01-1.5 3.5M6.343 6.343A7.963 7.963 0 004 9c0 4.418 3.582 8 8 8 1.657 0 3.22-.403 4.575-1.125M17.657 17.657A7.963 7.963 0 0020 15c0-4.418-3.582-8-8-8-1.657 0-3.22.403-4.575 1.125" /></svg>
                    )}
                  />
                </span>
              </div>
              {errors.password && <p className="text-red text-sm mt-1">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between text-sm">
              <Checkbox label="Remember me"/>
              <a href="#" className="text-blue font-medium hover:underline">Forgot password?</a>
            </div>
            <Button type="submit" isLoading={isLoading} loadingText="Signing in...">Sign In</Button>
            <p className="text-sm text-grey text-center">
              Don't have an account?{' '}
              <button type="button" className="text-blue font-medium hover:underline" onClick={onSwitchToSignup}>
                <Link to="/signup"> 
                  Sign up here
                </Link>
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
