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

// Helper component for consistent section styling
const FormSection: React.FC<{
  title: string,
  children: React.ReactNode,
  description?: string,
}> = ({ title, children, description }) => (
  <Card>
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
    };

    console.log("Form Submitted:", finalData);
    alert("Progress submitted! Check the console for the data.");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 bg-background">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Daily Progress Entry
        </h1>
        <p className="text-muted-foreground">
          Track your daily activities and achievements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Section */}
        <FormSection
          title="Date"
          description="Select the date for this progress entry"
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

        {/* Text Area Sections */}
        <FormSection
          title="Study Activities"
          description="Describe your study sessions, courses, or learning activities."
        >
          <Textarea
            name="studyActivities"
            placeholder="What did you study today?"
          />
        </FormSection>

        <FormSection
          title="Meditation & Mindfulness"
          description="Note your meditation duration, technique, or mindfulness exercises."
        >
          <Textarea
            name="meditation"
            placeholder="Describe your meditation practice..."
          />
        </FormSection>

        {/* Sliders */}
        <FormSection
          title="Water Intake"
          description="How many liters of water did you drink today?"
        >
          <div className="flex items-center gap-4">
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

        <FormSection
          title="Exercise & Physical Activity"
          description="Describe your workouts, sports, or physical activities."
        >
          <Textarea
            name="exercise"
            placeholder="What physical activities did you do?"
          />
        </FormSection>

        {/* Input Fields */}
        <FormSection
          title="Test or Assessment Link"
          description="Link to any test results or assessments you completed."
        >
          <Input
            name="testLink"
            placeholder="https://example.com/test-results"
          />
        </FormSection>

        <FormSection
          title="LinkedIn Post"
          description="Note any professional posts or networking activities."
        >
          <Input
            name="linkedinPost"
            placeholder="Brief description of your LinkedIn activity..."
          />
        </FormSection>

        {/* More Text Areas */}
        <FormSection
          title="Other Productive Activities"
          description="Note any other productive work, side projects, or meaningful activities."
        >
          <Textarea
            name="otherActivities"
            placeholder="Any other productive tasks or activities..."
          />
        </FormSection>

        <FormSection
          title="English Practice"
          description="Note reading, writing, speaking, or listening exercises."
        >
          <Textarea
            name="englishPractice"
            placeholder="Describe your English language practice..."
          />
        </FormSection>

        {/* Sleep Slider */}
        <FormSection
          title="Total Sleep Hours"
          description="How many hours did you sleep last night?"
        >
          <div className="flex items-center gap-4">
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
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>0h</span>
            <span>12h</span>
            <span>24h</span>
          </div>
        </FormSection>

        {/* Switches */}
        <FormSection title="Daily Hygiene">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-md border">
              <Label htmlFor="first-bath">
                First Bath/Shower{" "}
                <p className="text-sm text-muted-foreground font-normal">
                  Morning or first hygiene routine
                </p>
              </Label>
              <Switch id="first-bath" name="firstBath" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border">
              <Label htmlFor="second-bath">
                Second Bath/Shower{" "}
                <p className="text-sm text-muted-foreground font-normal">
                  Evening or second hygiene routine
                </p>
              </Label>
              <Switch id="second-bath" name="secondBath" />
            </div>
          </div>
        </FormSection>

        {/* Select */}
        <FormSection
          title="10K Steps Achievement"
          description="Track if you achieved the daily 10,000 steps goal."
        >
          <Select name="stepsAchievement">
            <SelectTrigger>
              <SelectValue placeholder="Did you walk 10,000 steps?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Yes, I completed it</SelectItem>
              <SelectItem value="partial">
                I walked a bit, but less than 10k
              </SelectItem>
              <SelectItem value="not_completed">No, I didn't</SelectItem>
              <SelectItem value="not_tracked">I didn't track it</SelectItem>
            </SelectContent>
          </Select>
        </FormSection>

        {/* Final Summary */}
        <FormSection
          title="Daily Summary"
          description="Reflect on your overall day, achievements, and feelings."
        >
          <Textarea
            name="dailySummary"
            placeholder="How would you summarize your day?"
            rows={5}
          />
        </FormSection>

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
