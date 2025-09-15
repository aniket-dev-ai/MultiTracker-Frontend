// src/components/LoginForm.tsx

import { useState } from "react";
import axios from "axios";
import { Loader2, Terminal } from "lucide-react";

// Import your shadcn/ui components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function LoginForm() {
  // State for form fields, matching the backend controller's expected keys
  const [formData, setFormData] = useState({
    emailid: "",
    password: "",
  });

  // State for handling the UI during the API call
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handler to update state when user types in the input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Form submission logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default browser form submission
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success messages
    setIsLoading(true);

    try {
      // IMPORTANT: Replace with your actual backend API endpoint for login
      const API_URL = "https://multitracker-backend.onrender.com/api/auth/login";

      const response = await axios.post(API_URL, formData);

      console.log("Login successful:", response.data);
      setSuccess(response.data.message || "Login successful!");

      // In a real application, you would save the token and redirect the user
      // For example:
      localStorage.setItem('token', response.data.token);
      // window.location.href = '/dashboard';
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "An unexpected error occurred.";
      console.log("Login error:", errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false); // Stop loading, whether successful or not
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>
          Enter your email and password to access your dashboard
        </CardDescription>
      </CardHeader>
      {/* Wrap content in a form and add the onSubmit handler */}
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          {/* Display Error Message if any */}
          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Display Success Message */}
          {success && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-2">
            <Label htmlFor="emailid">Email</Label>
            {/* The `id` is changed to `emailid` to match the backend */}
            <Input
              id="emailid"
              type="email"
              placeholder="m@example.com"
              value={formData.emailid}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          {/* The button is disabled during API call to prevent multiple submissions */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging In...
              </>
            ) : (
              "Log In"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
