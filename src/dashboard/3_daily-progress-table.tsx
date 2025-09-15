import  { useEffect, useState } from "react";
import axios from "axios";
import { format, isValid } from "date-fns"; // Import 'isValid' for date checking
import {
  FilePenLine,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Link,
  BookOpen,
} from "lucide-react";
// ... other imports
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// ... ProgressEntry interface and helper components remain the same ...
interface ProgressEntry {
  id: number;
  date: string;
  study: string | null;
  meditation: string | null;
  water_intake: number | null;
  exercise: string | null;
  test_link: string | null;
  linkedin_post: string | null;
  english_practice: string | null;
  total_sleep_hours: number | null;
  first_bath: boolean | null;
  second_bath: boolean | null;
  walk_10k_steps: "completed" | "partial" | "not_completed" | "not_tracked";
  summary: string | null;
}
interface DailyProgressTableProps {
  userId: number | null;
}
const StatusIndicator = ({
  status,
}: {
  status: ProgressEntry["walk_10k_steps"];
}) => {
  const statusConfig = {
    completed: {
      variant: "default",
      className: "bg-green-600 text-white",
      text: "Completed",
    },
    partial: {
      variant: "default",
      className: "bg-yellow-500 text-white",
      text: "Partial",
    },
    not_completed: { variant: "destructive", text: "Not Done" },
    not_tracked: { variant: "secondary", text: "Not Tracked" },
  };
  const config = statusConfig[status] || statusConfig.not_tracked;
  return (
    <Badge >
      {config.text}
    </Badge>
  );
};
const TruncatedTextCell = ({ text }: { text: string | null }) => {
  if (!text) return <span className="text-gray-400">N/A</span>;
  const truncated = text.length > 30 ? `${text.substring(0, 30)}...` : text;
  return <span title={text}>{truncated}</span>;
};

export function DailyProgressTable({ userId }: DailyProgressTableProps) {
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<ProgressEntry | null>(
    null
  );

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const fetchProgress = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in.");
        setIsLoading(false);
        return;
      }
      try {
        const API_URL = "https://multitracker-backend.onrender.com/api/progress/daily";
        // FIX: Changed to a GET request with a query parameter
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId: userId }, // This adds '?userId=...' to the URL
        });
        setProgress(response.data.progress);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch progress data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [userId]);

  const renderTableBody = () => {
    if (isLoading)
      return (
        <TableRow>
          <TableCell colSpan={8} className="text-center p-4">
            <Loader2 className="mr-2 h-5 w-5 animate-spin inline" />
            Loading...
          </TableCell>
        </TableRow>
      );
    if (error)
      return (
        <TableRow>
          <TableCell colSpan={8} className="text-center text-red-500 p-4">
            <AlertCircle className="mr-2 h-5 w-5 inline" />
            Error: {error}
          </TableCell>
        </TableRow>
      );
    if (progress.length === 0)
      return (
        <TableRow>
          <TableCell colSpan={8} className="text-center text-gray-500 p-4">
            No progress entries found for this user.
          </TableCell>
        </TableRow>
      );

    return progress.map((entry) => {
      // FIX: Safely create and check the date before formatting
      const entryDate = new Date(entry.date);
      const displayDate = isValid(entryDate)
        ? format(entryDate, "dd MMM, yyyy")
        : "Invalid Date";

      return (
        <TableRow key={entry.id}>
          <TableCell className="font-medium">{displayDate}</TableCell>
          <TableCell>
            <TruncatedTextCell text={entry.study} />
          </TableCell>
          <TableCell>
            <TruncatedTextCell text={entry.exercise} />
          </TableCell>
          <TableCell>{entry.water_intake ?? "N/A"}L</TableCell>
          <TableCell>{entry.total_sleep_hours ?? "N/A"}h</TableCell>
          <TableCell>
            <StatusIndicator status={entry.walk_10k_steps} />
          </TableCell>
          <TableCell>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedEntry(entry)}
            >
              <BookOpen className="h-4 w-4 mr-2" /> Details
            </Button>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" title="Edit">
                <FilePenLine className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
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
                <TableHead>Exercise</TableHead>
                <TableHead>Water</TableHead>
                <TableHead>Sleep</TableHead>
                <TableHead>10k Steps</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{renderTableBody()}</TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog for details remains unchanged */}
      <Dialog
        open={!!selectedEntry}
        onOpenChange={() => setSelectedEntry(null)}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedEntry && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Progress Details:{" "}
                  {isValid(new Date(selectedEntry.date))
                    ? format(new Date(selectedEntry.date), "dd MMMM, yyyy")
                    : "Invalid Date"}
                </DialogTitle>
                <DialogDescription>
                  A complete log of all activities for this day.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <h4 className="font-semibold">Summary</h4>
                <p className="text-sm text-muted-foreground p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                  {selectedEntry.summary || "No summary provided."}
                </p>
                <Separator />
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Study</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedEntry.study || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Exercise</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedEntry.exercise || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Meditation</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedEntry.meditation || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">English Practice</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedEntry.english_practice || "N/A"}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Test Link</h4>
                    {selectedEntry.test_link ? (
                      <a
                        href={selectedEntry.test_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline flex items-center gap-2"
                      >
                        <Link className="h-4 w-4" /> View Link
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">N/A</p>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">LinkedIn Post</h4>
                    {selectedEntry.linkedin_post ? (
                      <p className="text-sm text-muted-foreground">
                        {selectedEntry.linkedin_post}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">N/A</p>
                    )}
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    {selectedEntry.first_bath ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-sm">First Bath</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedEntry.second_bath ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-sm">Second Bath</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
