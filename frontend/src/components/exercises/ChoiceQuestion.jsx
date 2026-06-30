import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export const ChoiceQuestion = ({ question, value, onChange, phase }) => {
  const revealed = phase !== "answering";
  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-800 dark:text-white">
        {question.prompt}
      </h2>
      <div className="grid gap-3">
        {question.options.map((opt, i) => {
          const selected = value === i;
          const isAnswer = question.answer === i;
          let cls =
            "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200";
          if (revealed) {
            if (isAnswer) cls = "border-[#58CC02] bg-[#D7FFB8] text-[#58A700]";
            else if (selected) cls = "border-[#FF4B4B] bg-[#FFDFE0] text-[#EA2B2B]";
            else cls = "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-600";
          } else if (selected) {
            cls = "border-[#1CB0F6] bg-[#DDF4FF] dark:bg-[#1CB0F6]/15 text-[#1899D6] dark:text-[#1CB0F6]";
          }
          return (
            <motion.button
              key={i}
              data-testid={`answer-choice-${i}`}
              disabled={revealed}
              onClick={() => onChange(i)}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 24 }}
              whileHover={!revealed ? { scale: 1.02 } : {}}
              whileTap={!revealed ? { scale: 0.97 } : {}}
              className={`text-left p-4 border-2 border-b-4 rounded-2xl flex items-center gap-4 text-lg font-bold ${cls}`}
            >
              <span
                className={`shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center text-sm font-bold ${
                  revealed && isAnswer
                    ? "border-[#58CC02] bg-[#58CC02] text-white"
                    : revealed && selected
                    ? "border-[#FF4B4B] bg-[#FF4B4B] text-white"
                    : selected
                    ? "border-[#1CB0F6] text-[#1CB0F6]"
                    : "border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500"
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
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
