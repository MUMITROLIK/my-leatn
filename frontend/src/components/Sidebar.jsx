import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Trophy, User, Sparkles } from "lucide-react";

const items = [
  { to: "/", label: "Учиться", icon: Home, testid: "nav-learn" },
  { to: "/achievements", label: "Достижения", icon: Trophy, testid: "nav-achievements" },
  { to: "/profile", label: "Профиль", icon: User, testid: "nav-profile" },
];

export const Sidebar = () => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sticky top-0 h-screen transition-colors">
        <div className="flex items-center gap-2 mb-10 px-2">
          <span className="w-10 h-10 rounded-2xl bg-[#58CC02] flex items-center justify-center shadow-md">
            <Sparkles className="w-6 h-6 text-white fill-white" />
          </span>
          <span className="font-display font-bold text-xl text-slate-800 dark:text-white">CodeQuest</span>
        </div>
        <nav className="flex flex-col gap-2">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              data-testid={it.testid}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-colors ${
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-200 dark:border-emerald-500/30"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-transparent"
                }`
              }
            >
              <it.icon className="w-6 h-6" />
              {it.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-40 flex justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-colors">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            data-testid={`${it.testid}-mobile`}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl text-xs font-bold ${
                isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"
              }`
            }
          >
            <it.icon className="w-6 h-6" />
            {it.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
};
