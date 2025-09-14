import * as React from "react";
import {
  Moon,
  Sun,
  BarChart2,
  BrainCircuit,
  Bot,
  LineChart,
  Users,
  
  ArrowRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Theme Toggle Component
function ModeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

// Main Landing Page Component
export default function DataPlatformLandingPage() {
  return (
    <div className="bg-background text-foreground lg:ml-[10%] overflow-x-hidden">
      {/* <Navbar /> */}
      <main className="flex flex-col">
        <div className="flex-grow space-y-24 md:space-y-32 mt-16 mb-16">
          <HeroSection />
          <MethodologiesSection />
          <PredictiveAnalyticsSection />
          <LeaderboardSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Navbar Component
function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-bold">
          <BarChart2 className="h-6 w-6" />
          <span>Analytics</span>
        </a>
        <ModeToggle />
      </div>
    </header>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute top-0 left-0 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 w-[600px] h-[600px] rounded-full bg-green-500/20 blur-3xl -z-10"></div>
      <div className="container text-center">
        <Badge variant="outline">Data-Driven Progress Analytics</Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mt-4 mb-4">
          Scientific Progress Tracking Platform
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          Leverage advanced analytics, statistical modeling, and behavioral
          science to optimize your performance patterns with precision-driven
          insights.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">
            Start Analysis <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            View Research
          </Button>
        </div>
      </div>
    </section>
  );
}
 

function MethodologiesSection() {
  const methodologies = [
    {
      icon: <BrainCircuit className="h-7 w-7 text-primary" />,
      title: "Advanced Analytics Engine",
      description:
        "Average machine learning models to identify patterns, predict outcomes, and track performance.",
      // Image URL for this card
      backgroundImage:
        "https://ik.imagekit.io/datascienceBYAniket/Gemini_Generated_Image_wrlafnwrlafnwrla.png?updatedAt=1757875120302", // Replace with your actual image path
    },
    {
      icon: <LineChart className="h-7 w-7 text-primary" />,
      title: "Real-time Data Dashboard",
      description:
        "Monitor your progress with live data visualization, correlation analysis, and predictive models.",
      backgroundImage:
        "https://ik.imagekit.io/datascienceBYAniket/Gemini_Generated_Image_wrlafmwrlafmwrla.png?updatedAt=1757875120355", // Replace with your actual image path
    },
    {
      icon: <Users className="h-7 w-7 text-primary" />,
      title: "Behavioral Intelligence",
      description:
        "Social network analysis and peer comparison using graph theory to understand performance.",
      backgroundImage:
        "https://ik.imagekit.io/datascienceBYAniket/Gemini_Generated_Image_pw48wkpw48wkpw48.png?updatedAt=1757875226609", // Replace with your actual image path
    },
    {
      icon: <Bot className="h-7 w-7 text-primary" />,
      title: "Performance Optimization",
      description:
        "Compete in arenas with multi-dimensional ranking algorithms and game theory principles.",
      backgroundImage:
        "https://ik.imagekit.io/datascienceBYAniket/Gemini_Generated_Image_pw48wjpw48wjpw48.png?updatedAt=1757875226906", // Replace with your actual image path
    },
  ];

  return (
    <section className="container py-16 sm:py-24">
      <div className="text-center mb-12">
        <Badge variant="secondary">ANALYTICAL FRAMEWORK</Badge>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">
          Advanced Data Science Methodologies
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {methodologies.map((item) => (
          <Card
            key={item.title}
            className="h-full relative overflow-hidden group" // Added group for hover effects
            style={{
              backgroundImage: `url(${item.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay for readability and dark/light theme blending */}
            <div className="absolute inset-0 bg-background/80 dark:bg-background/80 group-hover:bg-background/90 dark:group-hover:bg-background/90 transition-colors duration-300"></div>

            <CardContent className="pt-6 flex flex-col items-center text-center h-full relative z-10">
              {" "}
              {/* z-10 to bring content above overlay */}
              <div className="mb-4  rounded-full h-16 w-16 flex items-center justify-center ">
                
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground flex-grow">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// Predictive Analytics Section
function PredictiveAnalyticsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        {/* === Left Column: Main Visual === */}
        {/* The image is now set to fill its container while maintaining its aspect ratio */}
        <div className="w-full h-[600px] rounded-lg overflow-hidden bg-muted">
          <img
            src="https://ik.imagekit.io/datascienceBYAniket/Gemini_Generated_Image_pzbqxpzbqxpzbqxp.png?updatedAt=1757875844010"
            alt="Predictive Analytics Dashboard"
            className="w-full h-full object-fill object-center opacity-70"
          />
        </div>

        {/* === Right Column: Content === */}
        <div className="space-y-6">
          <Badge>STATISTICAL ANALYSIS</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Predictive Analytics & Forecasting
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Advanced statistical models and machine learning algorithms analyze
            your behavioral patterns to generate predictive insights and
            optimize future performance outcomes.
          </p>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Performance Distribution Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {/* The graph image is now also set to cover its container */}
              <div className="w-full h-72 rounded-md overflow-hidden bg-muted/50">
                <img
                  src="https://ik.imagekit.io/datascienceBYAniket/Gemini_Generated_Image_pzbqxpzbqxpzbqxp(1).png?updatedAt=1757875843570"
                  alt="Temporal Pattern Graph"
                  className="w-full h-full object-fill object-center"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Leaderboard Section
function LeaderboardSection() {
    const leaderboardData = [
        { rank: 1, name: "Aniket Srivastava", title: "Data Scientist • 47d streak", score: 2840 },
        { rank: 2, name: "Piyush Pandey", title: "ML Engineer • 32d streak", score: 2650 },
        { rank: 3, name: "Mursaleen Pookie", title: "Research Scientist • 29d streak", score: 2420 },
      ];
      return (
        <section className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 lg:order-last">
              <Badge>PERFORMANCE METRICS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Research Community Leaderboard
              </h2>
              <p className="text-muted-foreground">
                Join our community of researchers, data scientists, and analysts
                who leverage evidence-based methodologies to optimize their
                performance outcomes.
              </p>
              <Card>
                <CardHeader>
                  <CardTitle>Performance Index Rankings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {leaderboardData.map((user) => (
                    <div
                      key={user.rank}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-muted-foreground text-lg">
                          {user.rank}
                        </span>
                        <div>
                          <p className="font-bold">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.title}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-primary">
                        {user.score.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div className="w-full h-[400px] bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center">
              <img
                src="https://ik.imagekit.io/datascienceBYAniket/Gemini_Generated_Image_qn6ge9qn6ge9qn6g.png?updatedAt=1757876335501"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </section>
      );
}

// Footer Component
function Footer() {
    return (
        <footer className="border-t">
          <div className="container py-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Analytics Platform. Built with shadcn/ui.
          </div>
        </footer>
      );
}