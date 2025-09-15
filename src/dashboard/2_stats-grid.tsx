// src/components/dashboard/2_stats-grid.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Footprints,
  Droplets,
  BedDouble,
  Target,
  AlertCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface WeeklyStats {
  totalSteps: number;
  totalWater: number;
  totalSleep: number;
  progressPercentage: number;
}

// Define the component's props
interface StatsGridProps {
  userId: number | null;
}

export function StatsGrid({ userId }: StatsGridProps) {
  const [stats, setStats] = useState<WeeklyStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // This useEffect now depends on `userId`.
  // It will re-run whenever the userId changes.
  useEffect(() => {
    // Don't fetch if no user is selected
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const fetchStats = async () => {
      setIsLoading(true); // Set loading state for each new fetch
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication failed. Please log in.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/progress/weekly",
          { userId: userId }, // Pass the selected user's ID in the body
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Weekly stats fetched:", response.data);
        setStats(response.data);
      } catch (err) {
        setError("Failed to load weekly stats for the selected user.");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [userId]); // Dependency array ensures this runs when userId changes

  if (isLoading) return <StatsGridSkeleton />;

  if (error || !stats) {
    return (
      <div className="text-red-500 flex items-center gap-2 p-4 border border-red-200 bg-red-50 rounded-md">
        <AlertCircle className="h-4 w-4" />
        <p>{error || "Could not load stats."}</p>
      </div>
    );
  }

  const statCardsData = [
    {
      title: "Total Steps",
      value: stats.totalSteps.toLocaleString(),
      period: "This week",
      icon: <Footprints className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Water Intake",
      value: `${stats.totalWater}L`,
      period: "This week",
      icon: <Droplets className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Sleep Hours",
      value: `${stats.totalSleep}h`,
      period: "This week",
      icon: <BedDouble className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Weekly Goal",
      value: `${stats.progressPercentage}%`,
      period: "7-day completion",
      icon: <Target className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCardsData.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

// StatCard and Skeleton components remain unchanged
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

function StatsGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-3 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
