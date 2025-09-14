import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
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

export default HeroSection;