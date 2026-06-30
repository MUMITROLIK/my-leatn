import React from "react";

export const TheoryCard = ({ card, track }) => {
  return (
    <div className="bounce-in space-y-6">
      <h2 className="font-display font-bold text-3xl text-slate-800 dark:text-white">{card.heading}</h2>
      <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{card.body}</p>
      {card.code && (
        <pre className="bg-slate-900 text-emerald-300 font-mono text-sm sm:text-base rounded-2xl p-5 overflow-x-auto border-b-4 border-slate-950 shadow-lg">
          <code>{card.code}</code>
        </pre>
      )}
    </div>
  );
};
