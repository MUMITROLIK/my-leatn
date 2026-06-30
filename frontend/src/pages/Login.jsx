import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LogIn, UserPlus, AlertTriangle } from "lucide-react";

export default function Login() {
  const { login, register, firebaseEnabled, user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // login | register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) {
    navigate("/profile");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate("/profile");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setBusy(false);
    }
  };

  if (!firebaseEnabled) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md bg-white dark:bg-slate-900 border-2 border-amber-300 rounded-2xl p-6 flex gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
          <div>
            <h2 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-1">
              Облачная синхронизация не настроена
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Прогресс сохраняется только локально в этом браузере. Чтобы включить вход
              и синхронизацию между устройствами, добавь ключи Firebase в файл .env
              (см. README.md).
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 border-b-4 rounded-2xl p-6"
      >
        <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-white mb-1">
          {mode === "login" ? "Вход" : "Регистрация"}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
          Прогресс синхронизируется на все твои устройства.
        </p>

        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:border-emerald-400"
          placeholder="you@example.com"
        />

        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Пароль</label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:border-emerald-400"
          placeholder="минимум 6 символов"
        />

        {error && <p className="text-sm font-bold text-[#FF4B4B] mb-3">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="tactile w-full flex items-center justify-center gap-2 bg-[#58CC02] text-white font-display font-bold uppercase py-3 rounded-xl border-b-4 border-green-700 disabled:opacity-60"
        >
          {mode === "login" ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          {mode === "login" ? "Войти" : "Создать аккаунт"}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="w-full text-center text-sm font-bold text-slate-500 dark:text-slate-400 mt-4 hover:text-emerald-500"
        >
          {mode === "login" ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
        </button>
      </form>
    </div>
  );
}
