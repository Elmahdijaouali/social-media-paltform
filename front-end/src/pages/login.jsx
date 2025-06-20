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
  Checkbox,
  VStack,
  HStack,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon, LockIcon, AtSignIcon } from "@chakra-ui/icons"

export default function LoginForm({ onSwitchToSignup }) {
  const [formData, setFormData] = useState({
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

    setIsLoading(true)
    setErrors({})

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate login logic here
      console.log("Login attempt:", formData)

      // For demo purposes, show success
      alert("Login successful!")
    } catch (error) {
      setErrors({
        general: "Login failed. Please check your credentials and try again.",
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
            <LockIcon color="white" boxSize={8} />
          </Box>
          <Text fontSize="3xl" fontWeight="bold" color="gray.900">
            Welcome Back
          </Text>
          <Text color="gray.600" textAlign="center">
            Sign in to your account to continue
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
                  placeholder="Enter your username"
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
                  placeholder="Enter your password"
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

            <HStack justify="space-between" w="full" fontSize="sm">
              <Checkbox size="sm" colorScheme="blue">
                Remember me
              </Checkbox>
              <Link color="blue.500" fontWeight="medium">
                Forgot password?
              </Link>
            </HStack>

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
              loadingText="Signing in..."
              spinner={<Spinner size="sm" />}
              transition="all 0.2s"
            >
              Sign In
            </Button>

            <Text fontSize="sm" color="gray.600" textAlign="center">
              Don't have an account?{" "}
              <Link color="blue.500" fontWeight="medium" onClick={onSwitchToSignup}>
                Sign up here
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Box>
  )
}
