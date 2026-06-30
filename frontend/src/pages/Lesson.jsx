import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { findLesson, TRACKS } from "../data/courses";
import { TheoryCard } from "../components/exercises/TheoryCard";
import { ChoiceQuestion } from "../components/exercises/ChoiceQuestion";
import { FillBlank } from "../components/exercises/FillBlank";
import { CodeArrange } from "../components/exercises/CodeArrange";
import { Celebration } from "../components/Celebration";
import { X, Heart, Check, HeartCrack } from "lucide-react";
import { Progress } from "../components/ui/progress";

export default function Lesson() {
  const { trackId, lessonId } = useParams();
  const navigate = useNavigate();
  const game = useGame();
  const found = useMemo(() => findLesson(trackId, lessonId), [trackId, lessonId]);

  const [step, setStep] = useState(0);
  const [value, setValue] = useState(null);
  const [phase, setPhase] = useState("answering"); // answering | correct | wrong
  const [correctCount, setCorrectCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!found) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-bold">Урок не найден.</p>
      </div>
    );
  }

  const { lesson } = found;
  const track = TRACKS[trackId];
  const isTheory = lesson.type === "theory";
  const steps = isTheory ? lesson.cards : lesson.questions;
  const totalSteps = steps.length;
  const current = steps[step];
  const progressPct = Math.round((step / totalSteps) * 100);

  const checkCorrect = () => {
    if (lesson.type === "code") {
      const arranged = (value || []).map((i) => current.blocks[i]);
      return JSON.stringify(arranged) === JSON.stringify(current.answer);
    }
    return value === current.answer;
  };

  const handleCheck = () => {
    const ok = checkCorrect();
    setTotal((t) => t + 1);
    if (ok) {
      setCorrectCount((c) => c + 1);
      setPhase("correct");
    } else {
      setPhase("wrong");
      game.loseHeart();
      if (game.hearts - 1 <= 0) {
        // will show fail after they hit continue
      }
    }
  };

  const finishLesson = () => {
    const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 100;
    const earnedXp = Math.round(lesson.xp * (isTheory ? 1 : Math.max(0.4, accuracy / 100)));
    game.completeLesson(lesson.id, earnedXp, accuracy);
    setDone({ xp: earnedXp, accuracy });
  };

  const next = () => {
    if (phase === "wrong" && game.hearts <= 0) {
      setFailed(true);
      return;
    }
    if (step + 1 >= totalSteps) {
      finishLesson();
    } else {
      setStep((s) => s + 1);
      setValue(null);
      setPhase("answering");
    }
  };

  const handleTheoryNext = () => {
    if (step + 1 >= totalSteps) {
      const earnedXp = lesson.xp;
      game.completeLesson(lesson.id, earnedXp, 100);
      setDone({ xp: earnedXp, accuracy: 100 });
    } else {
      setStep((s) => s + 1);
    }
  };

  if (done) {
    return (
      <Celebration
        xp={done.xp}
        gems={5}
        accuracy={done.accuracy}
        streak={game.streak}
        onContinue={() => navigate("/")}
      />
    );
  }

  if (failed) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-white">
        <div className="bounce-in text-center max-w-sm">
          <HeartCrack className="w-20 h-20 text-[#FF4B4B] mx-auto mb-4" />
          <h1 className="font-display font-bold text-4xl text-slate-800 mb-2">
            Сердечки закончились
          </h1>
          <p className="text-slate-500 font-medium mb-8">
            Сердца восстановятся завтра, или потрать 30 гемов, чтобы пополнить их.
          </p>
          <div className="flex flex-col gap-3">
            <button
              data-testid="refill-hearts-button"
              onClick={() => {
                game.refillHearts();
                if (game.gems >= 30) {
                  setFailed(false);
                  setPhase("answering");
                  setValue(null);
                }
              }}
              disabled={game.gems < 30}
              className="tactile bg-[#1CB0F6] text-white font-display font-bold uppercase px-8 py-3.5 rounded-2xl border-b-4 border-[#1899D6] disabled:opacity-40"
            >
              Пополнить (30 гемов)
            </button>
            <button
              data-testid="quit-to-home-button"
              onClick={() => navigate("/")}
              className="tactile bg-white text-slate-500 font-display font-bold uppercase px-8 py-3.5 rounded-2xl border-2 border-b-4 border-slate-200"
            >
              На главную
            </button>
          </div>
        </div>
      </div>
    );
  }

  const canCheck =
    lesson.type === "code" ? (value && value.length > 0) : value != null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top bar */}
      <div className="sticky top-0 bg-white z-30 px-4 sm:px-6 py-4 flex items-center gap-4 max-w-3xl mx-auto w-full">
        <button
          data-testid="lesson-close-button"
          onClick={() => navigate("/")}
          className="text-slate-400 hover:text-slate-600"
        >
          <X className="w-7 h-7" strokeWidth={2.5} />
        </button>
        <Progress value={progressPct} className="h-4 flex-1" data-testid="lesson-progress" />
        {!isTheory && (
          <div className="flex items-center gap-1 text-[#FF4B4B] font-extrabold" data-testid="lesson-hearts">
            <Heart className="w-6 h-6 fill-[#FF4B4B]" />
            {game.hearts}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-6">
        {isTheory && <TheoryCard card={current} track={track} />}
        {lesson.type === "choice" && (
          <ChoiceQuestion question={current} value={value} onChange={setValue} phase={phase} />
        )}
        {lesson.type === "fill" && (
          <FillBlank question={current} value={value} onChange={setValue} phase={phase} />
        )}
        {lesson.type === "code" && (
          <CodeArrange question={current} value={value} onChange={setValue} phase={phase} />
        )}
      </div>

      {/* Bottom action bar */}
      <div
        className={`sticky bottom-0 border-t-2 z-30 ${
          phase === "correct"
            ? "bg-[#D7FFB8] border-[#58CC02]"
            : phase === "wrong"
            ? "bg-[#FFDFE0] border-[#FF4B4B]"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="font-display font-bold">
            {phase === "correct" && (
              <span className="flex items-center gap-2 text-[#58A700]">
                <Check className="w-6 h-6" strokeWidth={3} /> Верно!
              </span>
            )}
            {phase === "wrong" && (
              <span className="flex items-center gap-2 text-[#EA2B2B]">
                <X className="w-6 h-6" strokeWidth={3} /> Ошибка, попробуй ещё!
              </span>
            )}
          </div>

          {isTheory ? (
            <button
              data-testid="theory-continue-button"
              onClick={handleTheoryNext}
              className="tactile w-full sm:w-auto sm:min-w-[200px] py-3.5 text-lg font-display font-bold uppercase tracking-wide text-white bg-[#58CC02] border-b-4 border-[#46A302] rounded-2xl"
            >
              {step + 1 >= totalSteps ? "Завершить" : "Продолжить"}
            </button>
          ) : phase === "answering" ? (
            <button
              data-testid="check-answer-button"
              disabled={!canCheck}
              onClick={handleCheck}
              className="tactile w-full sm:w-auto sm:min-w-[200px] py-3.5 text-lg font-display font-bold uppercase tracking-wide text-white bg-[#58CC02] border-b-4 border-[#46A302] rounded-2xl disabled:bg-slate-200 disabled:text-slate-400 disabled:border-slate-300"
            >
              Проверить
            </button>
          ) : (
            <button
              data-testid="continue-answer-button"
              onClick={next}
              className={`tactile w-full sm:w-auto sm:min-w-[200px] py-3.5 text-lg font-display font-bold uppercase tracking-wide text-white border-b-4 rounded-2xl ${
                phase === "correct"
                  ? "bg-[#58CC02] border-[#46A302]"
                  : "bg-[#FF4B4B] border-[#D33]"
              }`}
            >
              Продолжить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
