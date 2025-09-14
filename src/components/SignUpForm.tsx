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

export function SignUpForm() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Join The Synapse Guild</CardTitle>
        <CardDescription>
          Create your data science profile to start logging your progress
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Ada Lovelace" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 9876543210"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="github">GitHub Profile Link</Label>
            <Input id="github" placeholder="https://github.com/username" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="linkedin">LinkedIn Profile Link</Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="skills">Skills (comma-separated)</Label>
          <Input id="skills" placeholder="Python, SQL, PyTorch, Scikit-learn" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
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
        <Button className="w-full">Create Account</Button>
      </CardFooter>
    </Card>
  );
}
