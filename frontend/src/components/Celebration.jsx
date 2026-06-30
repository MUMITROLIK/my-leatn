import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gem, Zap, Target, Flame } from "lucide-react";

const colors = ["#58CC02", "#1CB0F6", "#FF9600", "#FFC800", "#FF4B4B", "#CE82FF"];

const Confetti = () => {
  const pieces = Array.from({ length: 60 });
  return (
    <>
      {pieces.map((_, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[i % colors.length],
            animationDuration: `${2 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 0.6}s`,
            borderRadius: i % 2 ? "50%" : "2px",
          }}
        />
      ))}
    </>
  );
};

export const Celebration = ({ xp, gems, accuracy, streak, onContinue }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      data-testid="celebration-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-yellow-300 to-amber-400 overflow-hidden"
    >
      <Confetti />
      <div className={`text-center ${show ? "bounce-in" : "opacity-0"}`}>
        <h1 className="font-display font-bold text-5xl sm:text-6xl text-white drop-shadow-md mb-2">
          Урок пройден!
        </h1>
        <p className="text-amber-800 font-bold text-lg mb-8">Отличная работа 🎉</p>

        <div className="grid grid-cols-3 gap-3 w-full max-w-md mx-auto mb-10">
          <motion.div
            className="contents"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
          >
            <Stat icon={Zap} label="Опыт" value={`+${xp}`} color="#FFC800" />
            <Stat icon={Target} label="Точность" value={`${accuracy}%`} color="#1CB0F6" />
            <Stat icon={Gem} label="Гемы" value={`+${gems}`} color="#58CC02" />
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8 text-amber-700 font-bold">
          <Flame className="w-5 h-5 fill-[#FF9600] text-[#FF9600]" />
          Серия: {streak} {streak === 1 ? "день" : "дн."}
        </div>

        <button
          data-testid="celebration-continue-button"
          onClick={onContinue}
          className="tactile bg-white text-amber-600 font-display font-bold text-lg uppercase tracking-wide px-12 py-4 rounded-2xl"
          style={{ borderBottom: "6px solid #d97706" }}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};

const Stat = ({ icon: Icon, label, value, color }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 24, scale: 0.8 }, show: { opacity: 1, y: 0, scale: 1 } }}
    className="bg-white rounded-2xl p-4 flex flex-col items-center gap-1 shadow-md"
  >
    <Icon className="w-7 h-7" style={{ color }} />
    <span className="font-display font-bold text-2xl text-slate-800">{value}</span>
    <span className="text-xs font-bold text-slate-400 uppercase">{label}</span>
  </motion.div>
);
