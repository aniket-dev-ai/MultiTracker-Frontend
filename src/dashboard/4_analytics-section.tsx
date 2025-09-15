// src/components/dashboard/4_analytics-section.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export function AnalyticsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics & Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-[300px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed">
          <BarChart3 className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">
            Charts and analytics will be displayed here
          </p>
          <p className="text-sm text-muted-foreground">
            Sleep trends, step counts, and progress visualization
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
