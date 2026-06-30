import React from "react";
import { Check, X } from "lucide-react";

export const ChoiceQuestion = ({ question, value, onChange, phase }) => {
  const revealed = phase !== "answering";
  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-800">
        {question.prompt}
      </h2>
      <div className="grid gap-3">
        {question.options.map((opt, i) => {
          const selected = value === i;
          const isAnswer = question.answer === i;
          let cls =
            "border-slate-200 bg-white hover:bg-slate-50 text-slate-700";
          if (revealed) {
            if (isAnswer) cls = "border-[#58CC02] bg-[#D7FFB8] text-[#58A700]";
            else if (selected) cls = "border-[#FF4B4B] bg-[#FFDFE0] text-[#EA2B2B]";
            else cls = "border-slate-200 bg-white text-slate-400";
          } else if (selected) {
            cls = "border-[#1CB0F6] bg-[#DDF4FF] text-[#1899D6]";
          }
          return (
            <button
              key={i}
              data-testid={`answer-choice-${i}`}
              disabled={revealed}
              onClick={() => onChange(i)}
              className={`tactile text-left p-4 border-2 border-b-4 rounded-2xl flex items-center gap-4 text-lg font-bold ${cls} ${
                selected && !revealed ? "pop" : ""
              }`}
            >
              <span
                className={`shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center text-sm font-bold ${
                  revealed && isAnswer
                    ? "border-[#58CC02] bg-[#58CC02] text-white"
                    : revealed && selected
                    ? "border-[#FF4B4B] bg-[#FF4B4B] text-white"
                    : selected
                    ? "border-[#1CB0F6] text-[#1CB0F6]"
                    : "border-slate-300 text-slate-400"
                }`}
              >
                {revealed && isAnswer ? (
                  <Check className="w-4 h-4" strokeWidth={3} />
                ) : revealed && selected ? (
                  <X className="w-4 h-4" strokeWidth={3} />
                ) : (
                  i + 1
                )}
              </span>
              <span className="font-mono">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
