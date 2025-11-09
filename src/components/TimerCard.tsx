import React from "react";
import {
  Play,
  Pause,
  ArrowClockwise,
  Trash,
  Pencil,
  Link,
} from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "./CircularProgress";
import { Timer } from "@/lib/types";
import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TimerCardProps {
  timer: Timer;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onReset: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TimerCard({
  timer,
  onStart,
  onPause,
  onReset,
  onEdit,
  onDelete,
}: TimerCardProps) {
  const progress =
    timer.totalDuration > 0
      ? (timer.remainingDuration / timer.totalDuration) * 100
      : 0;

  const getStatusBadge = () => {
    switch (timer.status) {
      case "running":
        return (
          <Badge className="bg-accent text-accent-foreground">Running</Badge>
        );
      case "paused":
        return <Badge variant="secondary">Paused</Badge>;
      case "completed":
        return (
          <Badge className="bg-success text-success-foreground">
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  const handlePlayPause = () => {
    if (timer.status === "running") {
      onPause(timer.id);
    } else {
      onStart(timer.id);
    }
  };

  return (
    <Card
      className={cn(
        "p-4 flex flex-col items-center gap-0 relative transition-all duration-300",
        timer.status === "running" &&
          "ring-2 ring-accent/50 shadow-lg shadow-accent/10",
        timer.status === "completed" &&
          "ring-2 ring-success/50 shadow-lg shadow-success/10",
      )}
    >
      {timer.chain && (
        <div className="absolute top-2 right-2 text-muted-foreground">
          <Link size={18} />
        </div>
      )}
      <div className="w-full flex items-center justify-between">
        <h3 className="font-medium text-lg truncate flex-1">{timer.name}</h3>
        {getStatusBadge()}
      </div>

      <CircularProgress
        progress={progress}
        status={timer.status}
        size={140}
        strokeWidth={10}
      >
        <div className="text-center">
          <div
            className="font-bold text-2xl tracking-tight"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {formatTime(timer.remainingDuration)}
          </div>
        </div>
      </CircularProgress>

      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2">
          <Button
            onClick={handlePlayPause}
            disabled={timer.status === "completed"}
            className="flex-1"
            size="sm"
          >
            {timer.status === "running" ? (
              <>
                <Pause className="mr-2" weight="fill" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2" weight="fill" />
                Start
              </>
            )}
          </Button>
          <Button onClick={() => onReset(timer.id)} variant="outline" size="sm">
            <ArrowClockwise weight="bold" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => onEdit(timer.id)}
            variant="ghost"
            size="icon"
            className="flex-1"
          >
            <Pencil size={16} />
          </Button>
          <Button
            onClick={() => onDelete(timer.id)}
            variant="ghost"
            size="icon"
            className="flex-1 text-destructive hover:text-destructive"
          >
            <Trash size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
