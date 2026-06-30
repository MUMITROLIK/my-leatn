import React from "react";
import { useGame } from "../context/GameContext";
import { Hud } from "../components/Hud";
import { Flame, Zap, Trophy, Star, Award, Target, Crown, Lock } from "lucide-react";

const ACHIEVEMENTS = [
  { id: "first", icon: Star, title: "Первый шаг", desc: "Пройди первый урок", color: "#FFC800", check: (g) => Object.keys(g.completed).length >= 1 },
  { id: "five", icon: Award, title: "Набираю ход", desc: "Пройди 5 уроков", color: "#58CC02", check: (g) => Object.keys(g.completed).length >= 5 },
  { id: "streak3", icon: Flame, title: "В огне", desc: "Серия 3 дня", color: "#FF9600", check: (g) => g.streak >= 3 },
  { id: "xp100", icon: Zap, title: "Сотка", desc: "Набери 100 XP", color: "#1CB0F6", check: (g) => g.xp >= 100 },
  { id: "level5", icon: Crown, title: "Восходящий", desc: "Достигни 5 уровня", color: "#CE82FF", check: (g) => g.level >= 5 },
  { id: "ten", icon: Trophy, title: "Мастер", desc: "Пройди 10 уроков", color: "#FF4B4B", check: (g) => Object.keys(g.completed).length >= 10 },
];

const LEADERBOARD = [
  { name: "Алекс", xp: 2480, avatar: "#FF9600" },
  { name: "Мария", xp: 1920, avatar: "#CE82FF" },
  { name: "Дмитрий", xp: 1340, avatar: "#1CB0F6" },
  { name: "Ольга", xp: 980, avatar: "#FF4B4B" },
];

export default function Achievements() {
  const game = useGame();
  const board = [...LEADERBOARD, { name: "Ты", xp: game.xp, avatar: "#58CC02", you: true }]
    .sort((a, b) => b.xp - a.xp);

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <Hud />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-800 mb-1">Достижения</h1>
        <p className="text-slate-500 font-medium mb-6">Открывай награды, выполняя цели.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {ACHIEVEMENTS.map((a) => {
            const unlocked = a.check(game);
            return (
              <div
                key={a.id}
                data-testid={`achievement-${a.id}`}
                className={`rounded-2xl border-2 border-b-4 p-4 flex flex-col items-center text-center gap-2 ${
                  unlocked ? "bg-white border-slate-200" : "bg-slate-50 border-slate-200 opacity-70"
                }`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: unlocked ? a.color : "#cbd5e1" }}
                >
                  {unlocked ? (
                    <a.icon className="w-7 h-7 text-white fill-white" />
                  ) : (
                    <Lock className="w-6 h-6 text-white" />
                  )}
                </div>
                <span className="font-display font-bold text-slate-800 text-sm">{a.title}</span>
                <span className="text-xs font-bold text-slate-400">{a.desc}</span>
              </div>
            );
          })}
        </div>

        {/* Leaderboard */}
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-6 h-6 text-[#1CB0F6]" />
          <h2 className="font-display font-bold text-xl text-slate-800">Таблица лидеров</h2>
        </div>
        <div className="bg-white rounded-2xl border-2 border-slate-200 border-b-4 overflow-hidden">
          {board.map((u, i) => (
            <div
              key={u.name}
              data-testid={`leaderboard-row-${i}`}
              className={`flex items-center gap-4 px-4 py-3 ${
                u.you ? "bg-emerald-50" : ""
              } ${i !== board.length - 1 ? "border-b border-slate-100" : ""}`}
            >
              <span className={`font-display font-bold w-6 text-center ${i < 3 ? "text-[#FFC800]" : "text-slate-400"}`}>
                {i + 1}
              </span>
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: u.avatar }}
              >
                {u.name.slice(0, 1)}
              </span>
              <span className={`flex-1 font-bold ${u.you ? "text-emerald-600" : "text-slate-700"}`}>
                {u.name}
              </span>
              <span className="font-display font-bold text-slate-500">{u.xp} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
