import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useState, useEffect } from "react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [isDark, setIsDark] = useState(theme === "dark");

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  // Sync state if theme changes outside
  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="overflow-hidden fixed top-4 right-4"
    >
      <Sun
        className={`absolute h-[1.2rem] w-[1.2rem] transition-transform duration-500 ${
          isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"
        }`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-transform duration-500 ${
          isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
