import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "@/context/GameContext";
import { Sidebar } from "@/components/Sidebar";
import Learn from "@/pages/Learn";
import Lesson from "@/pages/Lesson";
import Profile from "@/pages/Profile";
import Achievements from "@/pages/Achievements";

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
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shell><Learn /></Shell>} />
          <Route path="/achievements" element={<Shell><Achievements /></Shell>} />
          <Route path="/profile" element={<Shell><Profile /></Shell>} />
          <Route path="/lesson/:trackId/:lessonId" element={<Lesson />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
