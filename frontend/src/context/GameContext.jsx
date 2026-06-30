import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { loadProgress, saveProgress } from "@/lib/firebase";

const STORAGE_KEY = "codequest_state_v1";
const MAX_HEARTS = 5;

const todayStr = () => new Date().toISOString().slice(0, 10);

const defaultState = {
  xp: 0,
  gems: 50,
  hearts: MAX_HEARTS,
  streak: 0,
  lastActive: null,
  completed: {}, // lessonId -> { score, date }
  activeTrack: "hacking",
  dailyGoal: 50,
  xpToday: 0,
  xpTodayDate: todayStr(),
  heartsRefilledAt: null,
  theme: "light",
};

const GameContext = createContext(null);

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch {
    return { ...defaultState };
  }
}

export function GameProvider({ children }) {
  const [state, setState] = useState(loadState);
  const { user, firebaseEnabled } = useAuth();
  const syncedUidRef = useRef(null);
  const skipNextSaveRef = useRef(false);
  const saveTimerRef = useRef(null);
  const [cloudStatus, setCloudStatus] = useState("idle"); // idle | syncing | synced | error

  // Persist locally (cache, works offline)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // When user logs in: pull cloud progress (cloud wins if it exists)
  useEffect(() => {
    if (!firebaseEnabled || !user) return;
    if (syncedUidRef.current === user.uid) return;
    syncedUidRef.current = user.uid;
    setCloudStatus("syncing");
    loadProgress(user.uid)
      .then((cloud) => {
        if (cloud) {
          skipNextSaveRef.current = true;
          setState((s) => ({ ...defaultState, ...cloud }));
        }
        setCloudStatus("synced");
      })
      .catch(() => setCloudStatus("error"));
  }, [user, firebaseEnabled]);

  // Push to cloud on change (debounced), skip the echo right after pulling
  useEffect(() => {
    if (!firebaseEnabled || !user) return;
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }
    setCloudStatus("syncing");
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveProgress(user.uid, state)
        .then(() => setCloudStatus("synced"))
        .catch(() => setCloudStatus("error"));
    }, 800);
    return () => clearTimeout(saveTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, user, firebaseEnabled]);

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [state.theme]);

  const toggleTheme = useCallback(() => {
    setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));
  }, []);

  // Daily reset for xpToday & hearts regen on new day
  useEffect(() => {
    setState((s) => {
      const t = todayStr();
      if (s.xpTodayDate !== t) {
        return { ...s, xpToday: 0, xpTodayDate: t, hearts: MAX_HEARTS };
      }
      return s;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setActiveTrack = useCallback((trackId) => {
    setState((s) => ({ ...s, activeTrack: trackId }));
  }, []);

  const loseHeart = useCallback(() => {
    setState((s) => ({ ...s, hearts: Math.max(0, s.hearts - 1) }));
  }, []);

  const refillHearts = useCallback(() => {
    setState((s) => {
      if (s.hearts >= MAX_HEARTS) return s;
      if (s.gems < 30) return s;
      return { ...s, hearts: MAX_HEARTS, gems: s.gems - 30 };
    });
  }, []);

  const completeLesson = useCallback((lessonId, xpEarned, score) => {
    setState((s) => {
      const t = todayStr();
      const wasDoneToday = s.lastActive === t;
      let newStreak = s.streak;
      if (!wasDoneToday) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        newStreak = s.lastActive === yesterday ? s.streak + 1 : 1;
      }
      const alreadyDone = !!s.completed[lessonId];
      return {
        ...s,
        xp: s.xp + xpEarned,
        xpToday: s.xpToday + xpEarned,
        gems: s.gems + (alreadyDone ? 2 : 5),
        streak: newStreak,
        lastActive: t,
        completed: { ...s.completed, [lessonId]: { score, date: t, xp: xpEarned } },
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setState({ ...defaultState });
  }, []);

  const level = Math.floor(state.xp / 100) + 1;
  const xpIntoLevel = state.xp % 100;

  const value = {
    ...state,
    MAX_HEARTS,
    level,
    xpIntoLevel,
    cloudStatus,
    isCompleted: (id) => !!state.completed[id],
    setActiveTrack,
    toggleTheme,
    loseHeart,
    refillHearts,
    completeLesson,
    resetProgress,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
