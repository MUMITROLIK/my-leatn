import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { TRACKS } from "../data/courses";
import { Check, Star, Lock, BookOpen, Code2, ListChecks, PenLine } from "lucide-react";

const typeIcon = {
  theory: BookOpen,
  choice: ListChecks,
  code: Code2,
  fill: PenLine,
};

// Winding horizontal offset pattern (Duolingo-style snake path)
const offsets = [0, 60, 90, 60, 0, -60, -90, -60];

export const SkillPath = ({ trackId, units }) => {
  const navigate = useNavigate();
  const { isCompleted, hearts } = useGame();
  const track = TRACKS[trackId];

  // Determine unlock: a lesson is unlocked if it's the first overall not completed,
  // or any completed lesson, or the immediate next after last completed.
  const flat = units.flatMap((u) => u.lessons.map((l) => ({ ...l, unitId: u.id })));
  let firstIncompleteIndex = flat.findIndex((l) => !isCompleted(l.id));
  if (firstIncompleteIndex === -1) firstIncompleteIndex = flat.length - 1;

  const isUnlocked = (lessonId) => {
    const idx = flat.findIndex((l) => l.id === lessonId);
    return isCompleted(lessonId) || idx <= firstIncompleteIndex;
  };

  let globalIndex = -1;

  return (
    <div className="path-bg rounded-3xl py-2">
      {units.map((unit) => (
        <div key={unit.id} className="mb-4">
          {/* Unit banner */}
          <div
            className="rounded-2xl px-5 py-4 mb-8 text-white shadow-md mx-3"
            style={{ backgroundColor: track.color }}
          >
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">
              {unit.subtitle}
            </p>
            <h2 className="font-display font-bold text-xl">{unit.title}</h2>
          </div>

          <div className="flex flex-col items-center gap-8 pb-6">
            {unit.lessons.map((lesson) => {
              globalIndex += 1;
              const Icon = typeIcon[lesson.type] || Star;
              const done = isCompleted(lesson.id);
              const unlocked = isUnlocked(lesson.id);
              const isCurrent = unlocked && !done;
              const offset = offsets[globalIndex % offsets.length];
              const disabled = !unlocked || (isCurrent && hearts === 0);

              return (
                <div
                  key={lesson.id}
                  className="relative flex flex-col items-center"
                  style={{ transform: `translateX(${offset}px)` }}
                >
                  {isCurrent && (
                    <div
                      className="absolute -top-9 bg-white border-2 px-3 py-1 rounded-xl font-display font-bold text-xs shadow-md whitespace-nowrap"
                      style={{ color: track.color, borderColor: track.color }}
                    >
                      СТАРТ
                      <span
                        className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-r-2 border-b-2"
                        style={{ borderColor: track.color }}
                      />
                    </div>
                  )}
                  <button
                    data-testid={`lesson-node-${lesson.id}`}
                    disabled={disabled}
                    onClick={() => navigate(`/lesson/${trackId}/${lesson.id}`)}
                    className={`tactile w-[68px] h-[68px] rounded-full flex items-center justify-center shadow-lg ${
                      disabled ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    style={{
                      backgroundColor: unlocked ? (done ? track.colorDark : track.color) : "#e2e8f0",
                      borderBottom: `6px solid ${unlocked ? track.colorDark : "#cbd5e1"}`,
                    }}
                    title={lesson.title}
                  >
                    {!unlocked ? (
                      <Lock className="w-7 h-7 text-slate-400" />
                    ) : done ? (
                      <Check className="w-8 h-8 text-white" strokeWidth={3} />
                    ) : (
                      <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                    )}
                  </button>
                  <span
                    className={`mt-2 text-xs font-bold text-center max-w-[120px] ${
                      unlocked ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {lesson.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
