import React from "react";
import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";
import { Flame, Gem, Heart } from "lucide-react";
import { TRACKS } from "../data/courses";
import { AnimatedNumber } from "./AnimatedNumber";

const Stat = ({ testid, color, fill, Icon, children }) => (
  <motion.div
    data-testid={testid}
    className="flex items-center gap-1.5"
    style={{ color }}
    key={String(children)}
    initial={{ scale: 1 }}
    animate={{ scale: [1, 1.25, 1] }}
    transition={{ duration: 0.35 }}
  >
    <Icon className="w-6 h-6" style={{ fill }} />
    <span className="text-lg">{children}</span>
  </motion.div>
);

export const Hud = () => {
  const { streak, gems, hearts, MAX_HEARTS, activeTrack } = useGame();
  const track = TRACKS[activeTrack];

  return (
    <motion.div
      data-testid="hud-header"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.span
            layout
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg shadow-sm"
            style={{ backgroundColor: track.color }}
            key={track.id}
            initial={{ rotate: -20, scale: 0.6 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            {track.short.slice(0, 1)}
          </motion.span>
          <span className="font-display font-semibold text-slate-700 hidden sm:block">
            {track.name}
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 font-extrabold">
          <Stat testid="hud-streak" color="#FF9600" fill="#FF9600" Icon={Flame}>
            <AnimatedNumber value={streak} />
          </Stat>
          <Stat testid="hud-gems" color="#1CB0F6" fill="#1CB0F6" Icon={Gem}>
            <AnimatedNumber value={gems} />
          </Stat>
          <Stat testid="hud-hearts" color="#FF4B4B" fill="#FF4B4B" Icon={Heart}>
            <AnimatedNumber value={hearts} />
            <span className="text-slate-300">/{MAX_HEARTS}</span>
          </Stat>
        </div>
      </div>
    </motion.div>
  );
};
