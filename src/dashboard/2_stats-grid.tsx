// src/components/dashboard/2_stats-grid.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footprints, Droplets, BedDouble, Target } from "lucide-react";
import React from "react";

const stats = [
  {
    title: "Total Steps",
    value: "55,000",
    period: "This week",
    icon: <Footprints className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Water Intake",
    value: "22L",
    period: "This week",
    icon: <Droplets className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Sleep Hours",
    value: "45h",
    period: "This week",
    icon: <BedDouble className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Weekly Progress",
    value: "100%",
    period: "Goal completion",
    icon: <Target className="h-4 w-4 text-muted-foreground" />,
  },
];

export function StatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  period: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, period, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{period}</p>
      </CardContent>
    </Card>
  );
}
