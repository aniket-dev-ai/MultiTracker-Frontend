// src/components/dashboard/3_daily-progress-table.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FilePenLine, Trash2 } from "lucide-react";

const progressData = [
  {
    date: "Sep 09",
    study: "Day 1 study session",
    meditation: "22 min meditation",
    water: 4,
    exercise: "Exercise session 1",
    sleep: "7h",
    steps: "Completed",
  },
  {
    date: "Sep 10",
    study: "Day 2 study session",
    meditation: "20 min meditation",
    water: 2,
    exercise: "Exercise session 2",
    sleep: "6h",
    steps: "Completed",
  },
  {
    date: "Sep 11",
    study: "Day 3 study session",
    meditation: "18 min meditation",
    water: 4,
    exercise: "Exercise session 3",
    sleep: "6h",
    steps: "Completed",
  },
  {
    date: "Sep 12",
    study: "Day 4 study session",
    meditation: "16 min meditation",
    water: 3,
    exercise: "Exercise session 4",
    sleep: "7h",
    steps: "Partial",
  },
  {
    date: "Sep 13",
    study: "Day 5 study session",
    meditation: "14 min meditation",
    water: 3,
    exercise: "Exercise session 5",
    sleep: "7h",
    steps: "Completed",
  },
  {
    date: "Sep 14",
    study: "Day 6 study session",
    meditation: "12 min meditation",
    water: 2,
    exercise: "Exercise session 6",
    sleep: "6h",
    steps: "Partial",
  },
  {
    date: "Sep 15",
    study: "React dashboard development",
    meditation: "15 min mindfulness",
    water: 4,
    exercise: "Morning yoga",
    sleep: "6h",
    steps: "Partial",
  },
];

const StatusIndicator = ({ status }: { status: "Completed" | "Partial" }) => (
  <div className="flex items-center gap-2">
    <span
      className={`h-2 w-2 rounded-full ${
        status === "Completed" ? "bg-green-500" : "bg-yellow-500"
      }`}
    ></span>
    {status}
  </div>
);

export function DailyProgressTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Progress Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Study</TableHead>
              <TableHead>Meditation</TableHead>
              <TableHead>Water (L)</TableHead>
              <TableHead>Exercise</TableHead>
              <TableHead>Sleep (h)</TableHead>
              <TableHead>Steps</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {progressData.map((entry) => (
              <TableRow key={entry.date}>
                <TableCell className="font-medium">{entry.date}</TableCell>
                <TableCell>{entry.study}</TableCell>
                <TableCell>{entry.meditation}</TableCell>
                <TableCell>{entry.water}</TableCell>
                <TableCell>{entry.exercise}</TableCell>
                <TableCell>{entry.sleep}</TableCell>
                <TableCell>
                  <StatusIndicator
                    status={entry.steps as "Completed" | "Partial"}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <FilePenLine className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
