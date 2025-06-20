"use client"

import { useState } from "react"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Alert,
  AlertIcon,
  Text,
  Link,
  VStack,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon, LockIcon, AtSignIcon } from "@chakra-ui/icons"
import { FaUserPlus } from "react-icons/fa"

export default function SignupForm({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const bgGradient = useColorModeValue("linear(to-br, green.50, blue.100)", "linear(to-br, green.900, blue.900)")
  const cardBg = useColorModeValue("white", "gray.800")
  const iconBg = useColorModeValue("linear(45deg, green.400, blue.400)", "linear(45deg, green.600, blue.600)")

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
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate signup logic here
      console.log("Signup attempt:", { ...formData, password: "[HIDDEN]" })

      // For demo purposes, show success
      alert("Account created successfully! Please check your email to verify your account.")
    } catch (error) {
      setErrors({
        general: "Signup failed. Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box minH="100vh" bgGradient={bgGradient} display="flex" alignItems="center" justifyContent="center" p={4}>
      <Box
        bg={cardBg}
        p={8}
        rounded="2xl"
        shadow="2xl"
        w="full"
        maxW="md"
        backdropFilter="blur(10px)"
        border="1px"
        borderColor="whiteAlpha.200"
      >
        {/* Header */}
        <VStack spacing={4} mb={8}>
          <Box
            w={16}
            h={16}
            rounded="full"
            bgGradient={iconBg}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box as={FaUserPlus} color="white" boxSize={8} />
          </Box>
          <Text fontSize="3xl" fontWeight="bold" color="gray.900">
            Create Account
          </Text>
          <Text color="gray.600" textAlign="center">
            Sign up to get started with your account
          </Text>
        </VStack>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {errors.general && (
              <Alert status="error" rounded="md">
                <AlertIcon />
                {errors.general}
              </Alert>
            )}

            <FormControl isInvalid={errors.firstname}>
              <FormLabel color="gray.700" fontWeight="medium">
                First Name
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AtSignIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  size="lg"
                  focusBorderColor={errors.firstname ? "red.500" : "blue.500"}
                  errorBorderColor="red.500"
                />
              </InputGroup>
              {errors.firstname && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.firstname}
                </Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.lastname}>
              <FormLabel color="gray.700" fontWeight="medium">
                Last Name
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AtSignIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  size="lg"
                  focusBorderColor={errors.lastname ? "red.500" : "blue.500"}
                  errorBorderColor="red.500"
                />
              </InputGroup>
              {errors.lastname && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.lastname}
                </Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.username}>
              <FormLabel color="gray.700" fontWeight="medium">
                Username
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AtSignIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Choose a username"
                  size="lg"
                  focusBorderColor={errors.username ? "red.500" : "blue.500"}
                  errorBorderColor="red.500"
                />
              </InputGroup>
              {errors.username && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.username}
                </Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel color="gray.700" fontWeight="medium">
                Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  size="lg"
                  focusBorderColor={errors.password ? "red.500" : "blue.500"}
                  errorBorderColor="red.500"
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    size="sm"
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.password}
                </Text>
              )}
            </FormControl>

            <Button
              type="submit"
              size="lg"
              w="full"
              bgGradient="linear(45deg, green.400, blue.400)"
              color="white"
              _hover={{
                bgGradient: "linear(45deg, green.500, blue.500)",
                transform: "translateY(-1px)",
              }}
              _active={{
                transform: "translateY(0)",
              }}
              isLoading={isLoading}
              loadingText="Creating account..."
              spinner={<Spinner size="sm" />}
              transition="all 0.2s"
            >
              Create Account
            </Button>

            <Text fontSize="sm" color="gray.600" textAlign="center">
              Already have an account?{" "}
              <Link color="blue.500" fontWeight="medium" onClick={onSwitchToLogin}>
                Sign in here
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Box>
  )
}
