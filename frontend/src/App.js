import "@/App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { GameProvider } from "@/context/GameContext";
import { Sidebar } from "@/components/Sidebar";
import Learn from "@/pages/Learn";
import Lesson from "@/pages/Lesson";
import Profile from "@/pages/Profile";
import Achievements from "@/pages/Achievements";
import Login from "@/pages/Login";

function Shell({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Shell><Learn /></Shell>} />
            <Route path="/achievements" element={<Shell><Achievements /></Shell>} />
            <Route path="/profile" element={<Shell><Profile /></Shell>} />
            <Route path="/login" element={<Shell><Login /></Shell>} />
            <Route path="/lesson/:trackId/:lessonId" element={<Lesson />} />
          </Routes>
        </HashRouter>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
