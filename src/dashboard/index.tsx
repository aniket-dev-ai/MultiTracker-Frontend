// src/components/dashboard/index.tsx
import { useState } from "react";
import { DashboardHeader } from "./1_dashboard-header";
import { StatsGrid } from "./2_stats-grid";
import { DailyProgressTable } from "./3_daily-progress-table";
import { AnalyticsSection } from "./4_analytics-section";

export default function DashboardPage() {
  // State to hold the ID of the user selected in the dropdown
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 bg-background">
      <div className="flex flex-col gap-8">
        {/*
          The header now receives a function to update the selected user's ID
          when the dropdown value changes.
        */}
        <DashboardHeader
          selectedUserId={selectedUserId}
          onUserChange={setSelectedUserId}
        />

        {/*
          Both the stats grid and the progress table receive the selected ID.
          They will use this ID to fetch their respective data.
        */}
        <StatsGrid userId={selectedUserId} />
        <DailyProgressTable userId={selectedUserId} />

        <AnalyticsSection />
      </div>
    </div>
  );
}
