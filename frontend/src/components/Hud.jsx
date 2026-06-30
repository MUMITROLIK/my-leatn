import React from "react";
import { useGame } from "../context/GameContext";
import { Flame, Gem, Heart } from "lucide-react";
import { TRACKS } from "../data/courses";

export const Hud = () => {
  const { streak, gems, hearts, MAX_HEARTS, activeTrack } = useGame();
  const track = TRACKS[activeTrack];

  return (
    <div
      data-testid="hud-header"
      className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg shadow-sm"
            style={{ backgroundColor: track.color }}
          >
            {track.short.slice(0, 1)}
          </span>
          <span className="font-display font-semibold text-slate-700 hidden sm:block">
            {track.name}
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 font-extrabold">
          <div data-testid="hud-streak" className="flex items-center gap-1.5 text-[#FF9600]">
            <Flame className="w-6 h-6 fill-[#FF9600]" />
            <span className="text-lg">{streak}</span>
          </div>
          <div data-testid="hud-gems" className="flex items-center gap-1.5 text-[#1CB0F6]">
            <Gem className="w-6 h-6 fill-[#1CB0F6]" />
            <span className="text-lg">{gems}</span>
          </div>
          <div data-testid="hud-hearts" className="flex items-center gap-1.5 text-[#FF4B4B]">
            <Heart className="w-6 h-6 fill-[#FF4B4B]" />
            <span className="text-lg">
              {hearts}
              <span className="text-slate-300">/{MAX_HEARTS}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
