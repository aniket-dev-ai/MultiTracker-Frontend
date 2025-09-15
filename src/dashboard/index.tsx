// src/components/dashboard/index.tsx
import { DashboardHeader } from "./1_dashboard-header";
import { StatsGrid } from "./2_stats-grid";
import { DailyProgressTable } from "./3_daily-progress-table";
import { AnalyticsSection } from "./4_analytics-section";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 bg-background">
      <div className="flex flex-col gap-8">
        <DashboardHeader />
        <StatsGrid />
        <DailyProgressTable />
        <AnalyticsSection />
      </div>
    </div>
  );
}
