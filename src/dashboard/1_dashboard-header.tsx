"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Plus, ChevronsUpDown, UserCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

// Step 1: User data ke liye ek type define karein
interface User {
  id: number;
  name: string;
  Image_Url: string;
}

// Helper function to get initials from a name
const getInitials = (name: string) => {
  const names = name.split(" ");
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export function DashboardHeader() {
  // Step 2: State variables banayein
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Step 3: Users ki list fetch karein
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required.");
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(response.data.users);
        // Default mein pehle user ko select kar lein
        if (response.data.users && response.data.users.length > 0) {
          setSelectedUser(response.data.users[0]);
        }
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  

  const renderUserSelector = () => {
    if (isLoading) {
      return <Skeleton className="h-10 w-[150px]" />;
    }
    if (error) {
      return (
        <Button variant="destructive" disabled>
          {error}
        </Button>
      );
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-between">
            {selectedUser ? (
              <>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={selectedUser.Image_Url}
                      alt={selectedUser.name}
                    />
                    <AvatarFallback>
                      {getInitials(selectedUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">{selectedUser.name}</span>
                </div>
                <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
              </>
            ) : (
              "Select User"
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>Team Members</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {users.map((user) => (
            <DropdownMenuItem
              key={user.id}
              onSelect={() => setSelectedUser(user)}
            >
              <Avatar className="mr-2 h-6 w-6">
                <AvatarImage src={user.Image_Url} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <span>{user.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="flex items-center flex-col lg:flex-row gap-4 justify-between space-y-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Progress Dashboard
        </h2>
        <p className="text-muted-foreground">
          Track your daily activities and progress.
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant={"outline"}
          className={cn("w-[250px] justify-start text-left font-normal")}
        >
          {format(new Date(), "PPP")}
        </Button>
        {renderUserSelector()}{" "}
        {/* Yahan static button ki jagah dynamic dropdown aa gaya */}
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Entry
        </Button>
      </div>
    </div>
  );
}
