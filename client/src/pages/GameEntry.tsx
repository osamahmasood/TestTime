import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function GameEntry() {
  const [, setLocation] = useLocation();
  const [studentId, setStudentId] = useState<number | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  const startSessionMutation = trpc.game.startSession.useMutation();

  useEffect(() => {
    const id = localStorage.getItem('studentId');
    const role = localStorage.getItem('userRole');

    if (!id || role !== 'student') {
      setLocation('/student-login');
      return;
    }

    setStudentId(parseInt(id));
  }, [setLocation]);

  const handleStart = async () => {
    if (!studentId) return;

    setIsStarting(true);
    try {
      const result = await startSessionMutation.mutateAsync({
        studentId,
      });

      if (result) {
        // Navigate to game screen
        setLocation('/play');
      }
    } catch (error) {
      console.error('Failed to start session:', error);
    } finally {
      setIsStarting(false);
    }
  }

  if (!studentId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="animate-spin text-cyan-400 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Mission Briefing Container */}
        <div className="bg-slate-800/80 border border-cyan-500/30 rounded-lg p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🛰️</div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
              BIO-SPHERE EXPLORER
            </h1>
            <p className="text-cyan-300/70 text-sm">MISSION CONTROL</p>
          </div>

          {/* Mission Briefing */}
          <div className="bg-slate-900/50 border border-cyan-500/20 rounded p-4 mb-8">
            <p className="text-cyan-300 text-sm leading-relaxed">
              <span className="text-cyan-400 font-semibold">ALERT:</span> The Bio-Sphere research station is in critical condition. Life support systems are failing. Power core is unstable. Communication array is offline.
            </p>
            <p className="text-cyan-300 text-sm leading-relaxed mt-3">
              <span className="text-lime-400 font-semibold">MISSION:</span> You must answer science questions across three vital systems to restore power, life support, and communications.
            </p>
            <p className="text-cyan-300 text-sm leading-relaxed mt-3">
              <span className="text-purple-400 font-semibold">STATUS:</span> Awaiting operator identification.
            </p>
          </div>

          {/* Start Button */}
          <div className="space-y-4">
            <Button
              onClick={handleStart}
              disabled={isStarting}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg text-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isStarting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Initializing...
                </>
              ) : (
                <>🚀 INITIATE MISSION</>
              )}
            </Button>

            <Button
              onClick={() => setLocation('/student-dashboard')}
              variant="outline"
              className="w-full border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
            >
              Back to Dashboard
            </Button>
          </div>

          {/* System Status */}
          <div className="mt-8 pt-6 border-t border-cyan-500/20 space-y-2 text-xs text-cyan-300/60">
            <div className="flex justify-between">
              <span>LIFE SUPPORT:</span>
              <span className="text-red-400">● CRITICAL</span>
            </div>
            <div className="flex justify-between">
              <span>POWER CORE:</span>
              <span className="text-red-400">● CRITICAL</span>
            </div>
            <div className="flex justify-between">
              <span>COMMUNICATIONS:</span>
              <span className="text-red-400">● OFFLINE</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-cyan-300/40 text-xs mt-6">
          Bio-Sphere Explorer © 2024
        </p>
      </div>
    </div>
  );
}
