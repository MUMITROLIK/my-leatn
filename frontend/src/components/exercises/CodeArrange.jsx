import React from "react";

// value: array of block indices in chosen order. onChange(newArray)
export const CodeArrange = ({ question, value, onChange, phase }) => {
  const revealed = phase !== "answering";
  const chosen = value || [];
  const used = new Set(chosen);
  const bank = question.blocks.map((b, i) => ({ b, i })).filter((x) => !used.has(x.i));

  const add = (i) => !revealed && onChange([...chosen, i]);
  const remove = (pos) => !revealed && onChange(chosen.filter((_, idx) => idx !== pos));

  return (
    <div className="space-y-8">
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-800">
        {question.prompt}
      </h2>

      {/* Answer area */}
      <div className="min-h-[72px] rounded-2xl bg-slate-900 p-4 flex flex-wrap gap-2 items-start border-b-4 border-slate-950 shadow-lg">
        {chosen.length === 0 && (
          <span className="text-slate-500 font-mono text-sm self-center">
            Нажимай на блоки ниже, чтобы собрать код...
          </span>
        )}
        {chosen.map((bi, pos) => (
          <button
            key={pos}
            data-testid={`code-answer-block-${pos}`}
            onClick={() => remove(pos)}
            className="tactile px-3 py-2 bg-slate-700 text-emerald-300 font-mono text-sm rounded-lg border-b-2 border-slate-900"
          >
            {question.blocks[bi]}
          </button>
        ))}
      </div>

      {/* Bank */}
      <div className="flex flex-wrap gap-2 min-h-[60px]">
        {bank.map(({ b, i }) => (
          <button
            key={i}
            data-testid={`code-bank-block-${i}`}
            onClick={() => add(i)}
            className="tactile px-3 py-2 bg-white text-slate-700 font-mono text-sm rounded-lg border-2 border-b-4 border-slate-200 hover:bg-slate-50"
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
};
