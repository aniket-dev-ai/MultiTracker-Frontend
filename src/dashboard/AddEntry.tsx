// src/components/progress-entry-form.tsx
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Send } from "lucide-react";

// shadcn/ui Components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

// Utility function from shadcn/ui
import { cn } from "@/lib/utils";

// Helper component for consistent section styling with added hover effect
const FormSection: React.FC<{
  title: string;
  children: React.ReactNode;
  description?: string;
  className?: string; // Allow passing extra classes like col-span
}> = ({ title, children, description, className }) => (
  <Card className={cn("transition-all hover:shadow-lg", className)}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export default function ProgressEntryForm() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [waterIntake, setWaterIntake] = React.useState<number[]>([2]);
  const [sleepHours, setSleepHours] = React.useState<number[]>([8]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Add state-managed values
    const finalData = {
      ...data,
      date: date ? format(date, "yyyy-MM-dd") : "N/A",
      waterIntake: waterIntake[0],
      sleepHours: sleepHours[0],
      // Switches don't add value if not 'on', so we check for their presence
      firstBath: data.firstBath === "on",
      secondBath: data.secondBath === "on",
    };

    console.log("Form Submitted:", finalData);
    alert("Progress submitted! Check the console for the data.");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-background">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Daily Progress Entry
        </h1>
        <p className="text-muted-foreground">
          Track your daily activities and achievements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* The main grid container for the form sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Section - Spans full width for prominence */}
          <FormSection
            title="Date"
            description="Select the date for this progress entry"
            className="md:col-span-2"
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormSection>

          {/* Left Column Starts */}
          <FormSection
            title="Study Activities"
            description="Describe your learning activities."
          >
            <Textarea
              name="studyActivities"
              placeholder="What did you study today?"
            />
          </FormSection>

          {/* Right Column */}
          <FormSection
            title="Exercise & Physical Activity"
            description="Describe your workouts or sports."
          >
            <Textarea
              name="exercise"
              placeholder="What physical activities did you do?"
            />
          </FormSection>

          {/* Left Column */}
          <FormSection
            title="Water Intake (Liters)"
            description="How much water did you drink?"
          >
            <div className="flex items-center gap-4 pt-2">
              <Slider
                name="waterIntake"
                value={waterIntake}
                onValueChange={setWaterIntake}
                max={10}
                step={0.5}
              />
              <span className="font-bold text-primary w-16 text-center">
                {waterIntake[0]}L
              </span>
            </div>
          </FormSection>

          {/* Right Column */}
          <FormSection
            title="Total Sleep Hours"
            description="How many hours did you sleep?"
          >
            <div className="flex items-center gap-4 pt-2">
              <Slider
                name="sleepHours"
                value={sleepHours}
                onValueChange={setSleepHours}
                max={24}
                step={0.5}
              />
              <span className="font-bold text-primary w-16 text-center">
                {sleepHours[0]}h
              </span>
            </div>
          </FormSection>

          {/* Left Column */}
          <FormSection
            title="Meditation & Mindfulness"
            description="Note your meditation duration."
          >
            <Textarea
              name="meditation"
              placeholder="Describe your meditation practice..."
            />
          </FormSection>

          {/* Right Column */}
          <FormSection
            title="English Practice"
            description="Reading, writing, speaking, etc."
          >
            <Textarea
              name="englishPractice"
              placeholder="Describe your English language practice..."
            />
          </FormSection>

          {/* This section spans both columns for a cleaner layout */}
          <FormSection title="Daily Hygiene" className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 rounded-md border">
                <Label htmlFor="first-bath">
                  First Bath/Shower
                  <p className="text-sm text-muted-foreground font-normal">
                    Morning routine
                  </p>
                </Label>
                <Switch id="first-bath" name="firstBath" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-md border">
                <Label htmlFor="second-bath">
                  Second Bath/Shower
                  <p className="text-sm text-muted-foreground font-normal">
                    Evening routine
                  </p>
                </Label>
                <Switch id="second-bath" name="secondBath" />
              </div>
            </div>
          </FormSection>

          {/* Left Column */}
          <FormSection
            title="Test or Assessment Link"
            description="Link to any test results."
          >
            <Input
              name="testLink"
              placeholder="https://example.com/test-results"
            />
          </FormSection>

          {/* Right Column */}
          <FormSection
            title="LinkedIn Post"
            description="Professional posts or networking."
          >
            <Input
              name="linkedinPost"
              placeholder="Description of your LinkedIn activity..."
            />
          </FormSection>

          {/* Another full-width section */}
          <FormSection
            title="10K Steps Achievement"
            description="Did you achieve the daily 10,000 steps goal?"
            className="md:col-span-2"
          >
            <Select name="stepsAchievement">
              <SelectTrigger>
                <SelectValue placeholder="Select your step status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Yes, I completed it</SelectItem>
                <SelectItem value="partial">
                  Walked, but less than 10k
                </SelectItem>
                <SelectItem value="not_completed">No, I didn't</SelectItem>
                <SelectItem value="not_tracked">I didn't track it</SelectItem>
              </SelectContent>
            </Select>
          </FormSection>

          {/* Final Summary - Spanning full width */}
          <FormSection
            title="Daily Summary"
            description="Reflect on your overall day, achievements, and feelings."
            className="md:col-span-2"
          >
            <Textarea
              name="dailySummary"
              placeholder="How would you summarize your day?"
              rows={5}
            />
          </FormSection>
        </div>

        {/* Submit Button */}
        <Button type="submit" size="lg" className="w-full">
          <Send className="mr-2 h-4 w-4" /> Submit Progress
        </Button>
      </form>

      {/* Placeholder for future analytics */}
      <div className="mt-8">
        <Card className="border-dashed">
          <CardHeader className="text-center">
            <CardTitle>Progress Analytics Coming Soon</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            <p>Charts and progress visualization will be available here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
