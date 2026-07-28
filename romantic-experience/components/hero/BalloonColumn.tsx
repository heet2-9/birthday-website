"use client";

import React from "react";
import { BalloonSlotData } from "@/types";
import { BalloonItem } from "./BalloonItem";

interface BalloonColumnProps {
  slots: BalloonSlotData[];
  poppedBalloons: Record<number, boolean>;
  onPopBalloon: (id: number, color: string, e: React.MouseEvent | React.TouchEvent) => void;
}

export function BalloonColumn({ slots, poppedBalloons, onPopBalloon }: BalloonColumnProps) {
  return (
    <div className="w-20 sm:w-28 md:w-36 lg:w-44 h-full flex flex-col justify-around items-center z-30 pointer-events-none py-4">
      {slots.map((slot) => (
        <BalloonItem
          key={`slot-${slot.id}`}
          data={slot}
          isPopped={!!poppedBalloons[slot.id]}
          onPop={(e) => onPopBalloon(slot.id, slot.color, e)}
        />
      ))}
    </div>
  );
}
