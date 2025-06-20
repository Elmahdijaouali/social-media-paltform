"use client"

import { useState, useEffect } from "react"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Alert from "@/components/ui/Alert"
import IconButton from "@/components/ui/IconButton"
// import { FaUserPlus } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthProvider"

export default function SignupForm({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const { signup, signupStatus, signupError } = useAuth()
  const navigate = useNavigate()
  
  const isLoading = signupStatus === "pending"
  const isSuccess = signupStatus === "success"

  // Redirect to login page after successful signup
  useEffect(() => {
    if (isSuccess) {
      // Wait a moment to show the success message, then redirect
      const timer = setTimeout(() => {
        navigate("/?signup=success", { replace: true })
      }, 1500) // 1.5 seconds delay to show success message

      return () => clearTimeout(timer)
    }
  }, [isSuccess, navigate])

  const validateForm = () => {
    const newErrors = {}

    // First name validation
    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required"
    } else if (formData.firstname.length < 2) {
      newErrors.firstname = "First name must be at least 2 characters long"
    }

    // Last name validation
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required"
    } else if (formData.lastname.length < 2) {
      newErrors.lastname = "Last name must be at least 2 characters long"
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long"
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number"
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
    
    // Clear general error when user starts typing in any field
    if (signupError) {
      // Reset the mutation to clear the error
      // This will be handled by React Query automatically when a new mutation starts
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setErrors({})
    signup(formData)
  }

  // Show signup error if it exists
  const generalError = signupError?.response?.data?.message || signupError?.message
  
  // Check for specific field errors from the API response
  const apiErrors = signupError?.response?.data?.errors || {}
  
  // Combine local validation errors with API errors
  const allErrors = {
    ...errors,
    ...apiErrors
  }
  
  // Check if the error is specifically about username conflict
  const isUsernameConflict = generalError && (
    generalError.toLowerCase().includes('username') && 
    generalError.toLowerCase().includes('already exists')
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-lightgreen to-paleblue flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 backdrop-blur">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple to-blue flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 14v2a4 4 0 01-8 0v-2m8 0a4 4 0 00-8 0m8 0V9a4 4 0 10-8 0v5m8 0a4 4 0 00-8 0M12 7v.01M12 17v.01" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-darkgrey">Create Account</h2>
          <p className="text-grey text-center">Sign up to get started with your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            {isSuccess && <Alert type="success">Account created successfully! Welcome aboard!</Alert>}
            {generalError && !isUsernameConflict && <Alert type="error">{generalError}</Alert>}
            {isUsernameConflict && <Alert type="error">This username is already taken. Please choose a different one.</Alert>}
            <div>
              <label className="block text-darkgrey font-medium mb-1">First Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 11-12 0 6 6 0 0112 0zm0 0v2a2 2 0 01-2 2H8a2 2 0 01-2-2V8" /></svg>
                </span>
                <Input
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  error={!!allErrors.firstname}
                  className="pl-10"
                />
              </div>
              {allErrors.firstname && <p className="text-red text-sm mt-1">{allErrors.firstname}</p>}
            </div>
            <div>
              <label className="block text-darkgrey font-medium mb-1">Last Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 11-12 0 6 6 0 0112 0zm0 0v2a2 2 0 01-2 2H8a2 2 0 01-2-2V8" /></svg>
                </span>
                <Input
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  error={!!allErrors.lastname}
                  className="pl-10"
                />
              </div>
              {allErrors.lastname && <p className="text-red text-sm mt-1">{allErrors.lastname}</p>}
            </div>
            <div>
              <label className="block text-darkgrey font-medium mb-1">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 11-12 0 6 6 0 0112 0zm0 0v2a2 2 0 01-2 2H8a2 2 0 01-2-2V8" /></svg>
                </span>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Choose a username"
                  error={!!allErrors.username}
                  className="pl-10"
                />
              </div>
              {allErrors.username && <p className="text-red text-sm mt-1">{allErrors.username}</p>}
            </div>
            <div>
              <label className="block text-darkgrey font-medium mb-1">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17a2 2 0 002-2v-2a2 2 0 00-2-2 2 2 0 00-2 2v2a2 2 0 002 2zm6-6V9a6 6 0 10-12 0v2a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2z" /></svg>
                </span>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  error={!!allErrors.password}
                  className="pl-10 pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <IconButton
                    onClick={() => setShowPassword((v) => !v)}
                    icon={showPassword ? (
                      <svg className="w-5 h-5 text-grey" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575M6.343 6.343A7.963 7.963 0 004 9c0 4.418 3.582 8 8 8 1.657 0 3.22-.403 4.575-1.125M17.657 17.657A7.963 7.963 0 0020 15c0-4.418-3.582-8-8-8-1.657 0-3.22.403-4.575 1.125" /></svg>
                    ) : (
                      <svg className="w-5 h-5 text-grey" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.5 0a9.77 9.77 0 01-1.5 3.5M6.343 6.343A7.963 7.963 0 004 9c0 4.418 3.582 8 8 8 1.657 0 3.22-.403 4.575-1.125M17.657 17.657A7.963 7.963 0 0020 15c0-4.418-3.582-8-8-8-1.657 0-3.22.403-4.575 1.125" /></svg>
                    )}
                  />
                </span>
              </div>
              {allErrors.password && <p className="text-red text-sm mt-1">{allErrors.password}</p>}
            </div>
            <Button type="submit" isLoading={isLoading} loadingText="Creating account...">Create Account</Button>
            <p className="text-sm text-grey text-center">
              Already have an account?{' '}
              <button type="button" className="text-blue font-medium hover:underline" onClick={onSwitchToLogin}>
                <Link to="/">
                  Sign in here
                </Link>
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
