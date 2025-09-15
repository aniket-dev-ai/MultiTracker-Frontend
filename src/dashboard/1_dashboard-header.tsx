import { format } from "date-fns";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <div className="flex items-center  lg:mx-0 mx-auto flex-col lg:flex-row gap-2 justify-between space-y-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Progress Dashboard
        </h2>
        <p className="text-muted-foreground">
          Track your daily activities and progress.
        </p>
      </div>
      <div className="flex lg:mx-0 lg:mr-1 lg:items-center space-x-2">
        <Button
          variant={"outline"}
          className={cn(" justify-start text-left font-normal")}
        >
          {format(new Date(), "PPP")}
        </Button>
        <div className="flex gap-2 flex-col lg:flex-row">
          <Button>Aniket</Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Entry
          </Button>
        </div>
      </div>
    </div>
  );
}
