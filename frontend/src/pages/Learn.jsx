import React from "react";
import { useGame } from "../context/GameContext";
import { TRACKS, getCourse, getAllLessonsFlat } from "../data/courses";
import { SkillPath } from "../components/SkillPath";
import { Hud } from "../components/Hud";
import { Code2, Palette, Languages, Target, Trophy, Flame } from "lucide-react";
import { Progress } from "../components/ui/progress";

const iconMap = { Code2, Palette, Languages };

export default function Learn() {
  const { activeTrack, setActiveTrack, isCompleted, dailyGoal, xpToday, streak, level, xpIntoLevel } = useGame();
  const units = getCourse(activeTrack);
  const flat = getAllLessonsFlat(activeTrack);
  const completedCount = flat.filter((l) => isCompleted(l.id)).length;
  const trackProgress = Math.round((completedCount / flat.length) * 100);
  const goalPct = Math.min(100, Math.round((xpToday / dailyGoal) * 100));

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <Hud />

      {/* Track selector */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-800 mb-1">
          Твой путь
        </h1>
        <p className="text-slate-500 font-medium mb-5">Выбери направление и начинай учиться.</p>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
          {Object.values(TRACKS).map((t) => {
            const Icon = iconMap[t.icon];
            const active = activeTrack === t.id;
            return (
              <button
                key={t.id}
                data-testid={`track-tab-${t.id}`}
                onClick={() => setActiveTrack(t.id)}
                className={`tactile shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl font-display font-semibold border-2 ${
                  active ? "text-white border-b-4" : "bg-white text-slate-600 border-slate-200 border-b-4"
                }`}
                style={active ? { backgroundColor: t.color, borderColor: t.colorDark } : {}}
              >
                <Icon className="w-5 h-5" />
                {t.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 grid md:grid-cols-[1fr_300px] gap-6">
        {/* Path */}
        <div className="order-2 md:order-1">
          <SkillPath trackId={activeTrack} units={units} />
        </div>

        {/* Side cards */}
        <div className="order-1 md:order-2 space-y-4 md:sticky md:top-24 self-start">
          <div className="bg-white rounded-2xl border-2 border-slate-200 border-b-4 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-lg text-slate-800">Прогресс курса</h3>
              <Trophy className="w-5 h-5 text-[#FFC800]" />
            </div>
            <Progress value={trackProgress} className="h-3 mb-2" data-testid="track-progress" />
            <p className="text-sm font-bold text-slate-500">
              {completedCount} / {flat.length} уроков · {trackProgress}%
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-slate-200 border-b-4 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-lg text-slate-800">Цель на день</h3>
              <Target className="w-5 h-5 text-[#1CB0F6]" />
            </div>
            <Progress value={goalPct} className="h-3 mb-2" data-testid="daily-goal-progress" />
            <p className="text-sm font-bold text-slate-500">
              {xpToday} / {dailyGoal} XP сегодня
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl border-b-4 border-orange-600 p-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-6 h-6 fill-white" />
              <span className="font-display font-bold text-2xl">{streak}</span>
            </div>
            <p className="font-bold text-sm opacity-90">Серия дней подряд</p>
            <div className="mt-3 pt-3 border-t border-white/30 text-sm font-bold">
              Уровень {level} · {xpIntoLevel}/100 XP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
