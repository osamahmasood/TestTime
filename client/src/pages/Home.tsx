import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl text-center">
            {/* Logo */}
            <div className="text-7xl mb-6 animate-bounce">🛰️</div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-4">
              BIO-SPHERE EXPLORER
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-cyan-300/70 mb-8">
              An Interactive Science Quiz Game for Students
            </p>

            {/* Description */}
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-8 mb-12 backdrop-blur-sm">
              <p className="text-cyan-300 mb-4">
                Welcome to the Bio-Sphere Explorer! A thrilling science adventure where you must answer questions across three critical systems to save a research station.
              </p>
              <p className="text-cyan-300/70 text-sm">
                Test your knowledge of Biology, Chemistry, and Physics in this engaging, narrative-driven quiz game.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl mb-2">🧬</div>
                <h3 className="text-cyan-300 font-bold mb-2">Biology</h3>
                <p className="text-cyan-300/60 text-sm">Cells, organisms, and ecosystems</p>
              </div>
              <div className="bg-slate-800/50 border border-orange-500/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl mb-2">⚗️</div>
                <h3 className="text-orange-300 font-bold mb-2">Chemistry</h3>
                <p className="text-orange-300/60 text-sm">Elements, compounds, and reactions</p>
              </div>
              <div className="bg-slate-800/50 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="text-blue-300 font-bold mb-2">Physics</h3>
                <p className="text-blue-300/60 text-sm">Forces, energy, and waves</p>
              </div>
            </div>

            {/* Login Buttons */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Button
                onClick={() => setLocation('/student-login')}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold px-8 py-3 rounded-lg text-lg transition-all duration-300"
              >
                🎓 STUDENT LOGIN
              </Button>
              <Button
                onClick={() => setLocation('/teacher-login')}
                className="bg-gradient-to-r from-lime-500 to-orange-500 hover:from-lime-600 hover:to-orange-600 text-white font-bold px-8 py-3 rounded-lg text-lg transition-all duration-300"
              >
                👨‍🏫 TEACHER LOGIN
              </Button>
            </div>

            {/* QR Code Info */}
            <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-cyan-300/60 text-sm mb-4">
                <span className="font-semibold text-cyan-300">For Teachers:</span> Share the game URL with your students via QR code or direct link.
              </p>
              <p className="text-cyan-300/60 text-xs">
                Students can scan the QR code or visit the link directly to access the game from their mobile devices or computers.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-cyan-500/20 py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-cyan-300/60 text-sm">
              Bio-Sphere Explorer © 2024 | Created for Educational Excellence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
