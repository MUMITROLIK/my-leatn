import React from "react";

export const FillBlank = ({ question, value, onChange, phase }) => {
  const revealed = phase !== "answering";
  const parts = question.template.split("____");
  const chosen = value != null ? question.options[value] : "____";

  return (
    <div className="space-y-8">
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-800">
        {question.prompt}
      </h2>

      <div className="bg-slate-900 text-emerald-300 font-mono text-lg rounded-2xl p-6 border-b-4 border-slate-950 shadow-lg">
        {parts[0]}
        <span
          className={`inline-block min-w-[80px] text-center px-2 mx-1 rounded-md border-b-2 ${
            value != null ? "bg-[#1CB0F6]/20 text-[#7dd3fc] border-[#1CB0F6]" : "text-slate-500 border-slate-600"
          }`}
        >
          {chosen}
        </span>
        {parts[1]}
      </div>

      <div className="flex flex-wrap gap-3">
        {question.options.map((opt, i) => {
          const selected = value === i;
          const isAnswer = question.answer === i;
          let cls = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50";
          if (revealed) {
            if (isAnswer) cls = "bg-[#D7FFB8] border-[#58CC02] text-[#58A700]";
            else if (selected) cls = "bg-[#FFDFE0] border-[#FF4B4B] text-[#EA2B2B]";
          } else if (selected) {
            cls = "bg-[#DDF4FF] border-[#1CB0F6] text-[#1899D6]";
          }
          return (
            <button
              key={i}
              data-testid={`fill-option-${i}`}
              disabled={revealed}
              onClick={() => onChange(i)}
              className={`tactile px-5 py-3 border-2 border-b-4 rounded-xl font-mono font-bold text-lg ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};
