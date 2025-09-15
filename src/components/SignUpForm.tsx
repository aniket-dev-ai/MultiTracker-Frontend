// src/components/SignUpForm.tsx

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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function SignUpForm() {
  // State for all form text fields
  const [formData, setFormData] = useState({
    name: "",
    emailid: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    github_link: "",
    linkedin_link: "",
    skills: "", // Will be captured as a comma-separated string
  });

  // State specifically for the image file
  const [imageFile, setImageFile] = useState<File | null>(null);

  // State for handling the UI during submission
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Generic handler for all text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handler for the file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Form submission logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success messages

    // 1. Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!imageFile) {
      setError("Please select a profile image.");
      return;
    }

    setIsLoading(true);

    // 2. Prepare FormData for the backend API
    const apiFormData = new FormData();

    // The backend controller expects a single `data` field with JSON
    const { confirmPassword, ...userData } = formData;
    // The backend also expects skills as an array, so we convert the string
    const skillsArray = userData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    // Append the JSON data as a string under the key 'data'
    apiFormData.append(
      "data",
      JSON.stringify({ ...userData, skills: skillsArray })
    );

    // Append the image file under the key 'image'
    // This key must match what multer expects on the backend route: `upload.single('image')`
    apiFormData.append("image", imageFile);

    // 3. Make the API call using axios
    try {
      // IMPORTANT: Replace with your actual backend API endpoint
      const API_URL =
        "https://multitracker-backend.onrender.com/api/auth/signup";

      const response = await axios.post(API_URL, apiFormData, {
        headers: {
          // The browser automatically sets the correct Content-Type with boundary for FormData
          // So you don't need to set it manually.
        },
      });
      console.log("Signup successful:", response.data);
      setSuccess(response.data.message || "Signup successful!");
      // Optionally reset form fields here
      // setFormData({ ...initial state ... });
      // setImageFile(null);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Join The Synapse Guild</CardTitle>
        <CardDescription>
          Create your data science profile to start logging your progress
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          {/* Feedback Alerts */}
          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* Form Fields */}
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ada Lovelace"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="emailid">Email</Label>
              <Input
                id="emailid"
                value={formData.emailid}
                onChange={handleChange}
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                type="tel"
                placeholder="+91 9876543210"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="github_link">GitHub Profile Link</Label>
              <Input
                id="github_link"
                value={formData.github_link}
                onChange={handleChange}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="linkedin_link">LinkedIn Profile Link</Label>
              <Input
                id="linkedin_link"
                value={formData.linkedin_link}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Input
              id="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Python, SQL, PyTorch, Scikit-learn"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="profileImage">Profile Image</Label>
            <Input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              required
            />
            {imageFile && (
              <div className="mt-2 flex items-center space-x-4 p-2 border rounded-md">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Profile preview"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div className="text-sm text-muted-foreground">
                  {imageFile.name}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm font-normal">
              I agree to the{" "}
              <a href="/terms" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              .
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
                Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
