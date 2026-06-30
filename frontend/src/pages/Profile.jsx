import React from "react";
import { useGame } from "../context/GameContext";
import { Hud } from "../components/Hud";
import { TRACKS, getAllLessonsFlat } from "../data/courses";
import { Zap, Flame, Gem, Trophy, RotateCcw, Crown } from "lucide-react";
import { Progress } from "../components/ui/progress";

export default function Profile() {
  const game = useGame();
  const { xp, gems, streak, level, xpIntoLevel, completed, resetProgress } = game;
  const totalCompleted = Object.keys(completed).length;

  const stats = [
    { icon: Zap, label: "Всего XP", value: xp, color: "#FFC800" },
    { icon: Flame, label: "Серия", value: streak, color: "#FF9600" },
    { icon: Gem, label: "Гемы", value: gems, color: "#1CB0F6" },
    { icon: Trophy, label: "Уроков", value: totalCompleted, color: "#58CC02" },
  ];

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <Hud />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        {/* Header */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white shadow-lg border-b-4 border-green-700">
            <Crown className="w-12 h-12 fill-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl text-slate-800">Ученик</h1>
            <p className="font-bold text-slate-500">Уровень {level}</p>
            <div className="mt-2 w-48">
              <Progress value={xpIntoLevel} className="h-3" data-testid="level-progress" />
              <p className="text-xs font-bold text-slate-400 mt-1">{xpIntoLevel}/100 XP до уровня {level + 1}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <h2 className="font-display font-bold text-xl text-slate-800 mb-3">Статистика</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              data-testid={`profile-stat-${s.label}`}
              className="bg-white rounded-2xl border-2 border-slate-200 border-b-4 p-4 flex flex-col items-center gap-1"
            >
              <s.icon className="w-7 h-7" style={{ color: s.color }} />
              <span className="font-display font-bold text-2xl text-slate-800">{s.value}</span>
              <span className="text-xs font-bold text-slate-400 text-center">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Per track progress */}
        <h2 className="font-display font-bold text-xl text-slate-800 mb-3">Курсы</h2>
        <div className="space-y-3 mb-8">
          {Object.values(TRACKS).map((t) => {
            const flat = getAllLessonsFlat(t.id);
            const doneCount = flat.filter((l) => completed[l.id]).length;
            const pct = Math.round((doneCount / flat.length) * 100);
            return (
              <div key={t.id} className="bg-white rounded-2xl border-2 border-slate-200 border-b-4 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-semibold text-slate-700">{t.name}</span>
                  <span className="text-sm font-bold text-slate-400">{doneCount}/{flat.length}</span>
                </div>
                <Progress value={pct} className="h-3" />
              </div>
            );
          })}
        </div>

        <button
          data-testid="reset-progress-button"
          onClick={() => {
            if (window.confirm("Сбросить весь прогресс?")) resetProgress();
          }}
          className="tactile flex items-center gap-2 text-[#FF4B4B] font-display font-bold uppercase text-sm px-5 py-3 rounded-xl border-2 border-b-4 border-[#FF4B4B]/30 bg-white"
        >
          <RotateCcw className="w-4 h-4" /> Сбросить прогресс
        </button>
      </div>
    </div>
  );
}
