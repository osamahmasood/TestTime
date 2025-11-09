import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { trpc } from '@/lib/trpc';

export default function CompletionScreen() {
  const { gameState, resetGame } = useGame();
  const [, setLocation] = useLocation();
  const submitScoreMutation = trpc.game.submitScore.useMutation();

  useEffect(() => {
    if (!gameState.playerName) {
      setLocation('/game');
    }
  }, [gameState.playerName, setLocation]);

  useEffect(() => {
    // Submit the score to the database when the completion screen loads
    if (gameState.playerName && gameState.endTime && gameState.startTime) {
      const completedSpheresCount = Object.values(gameState.sphereProgress).filter(s => s.completed).length;
      
      // In a full implementation, sessionId should be tracked from game start
      // For now, we'll use a timestamp-based ID
      const sessionId = Math.floor(gameState.startTime / 1000);
      
      submitScoreMutation.mutate({
        sessionId,
        totalScore: gameState.score,
        completedSpheres: completedSpheresCount,
        endTime: new Date(gameState.endTime),
      });
    }
  }, []);

  const calculateTimeTaken = () => {
    if (!gameState.startTime || !gameState.endTime) return 'N/A';
    const seconds = Math.floor((gameState.endTime - gameState.startTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const getPerformanceBadge = () => {
    if (gameState.score >= 270) return { title: 'MASTER SCIENTIST', color: 'text-yellow-400' };
    if (gameState.score >= 240) return { title: 'EXPERT SCIENTIST', color: 'text-cyan-400' };
    if (gameState.score >= 200) return { title: 'SKILLED RESEARCHER', color: 'text-green-400' };
    if (gameState.score >= 150) return { title: 'RISING SCHOLAR', color: 'text-blue-400' };
    return { title: 'EXPLORER', color: 'text-purple-400' };
  };

  const badge = getPerformanceBadge();
  const timeTaken = calculateTimeTaken();

  const handlePlayAgain = () => {
    resetGame();
    setLocation('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-lime-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Completion Container */}
        <div className="bg-slate-800/80 border border-lime-500/30 rounded-lg p-8 backdrop-blur-sm text-center">
          {/* Success Icon */}
          <div className="text-6xl mb-6 animate-bounce">✓</div>

          {/* Mission Complete */}
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-cyan-400 mb-2">
            MISSION COMPLETE
          </h1>
          <p className="text-lime-300/70 text-sm mb-8">All systems restored successfully</p>

          {/* Results Box */}
          <div className="bg-slate-900/50 border border-lime-500/20 rounded p-6 mb-8 space-y-4">
            {/* Player Name */}
            <div className="border-b border-lime-500/20 pb-4">
              <p className="text-lime-300/60 text-xs uppercase">Operator</p>
              <p className="text-lime-300 text-xl font-bold">{gameState.playerName}</p>
            </div>

            {/* Score */}
            <div className="border-b border-lime-500/20 pb-4">
              <p className="text-lime-300/60 text-xs uppercase">Energy Units Restored</p>
              <p className="text-4xl font-bold text-lime-400">{gameState.score}</p>
              <p className="text-lime-300/60 text-xs mt-1">out of 300 maximum</p>
            </div>

            {/* Time */}
            <div className="border-b border-lime-500/20 pb-4">
              <p className="text-lime-300/60 text-xs uppercase">Time Taken</p>
              <p className="text-lime-300 text-lg font-semibold">{timeTaken}</p>
            </div>

            {/* Performance Badge */}
            <div className="pt-4">
              <p className="text-lime-300/60 text-xs uppercase mb-2">Achievement</p>
              <p className={`text-2xl font-bold ${badge.color}`}>{badge.title}</p>
            </div>
          </div>

          {/* Sphere Results */}
          <div className="bg-slate-900/50 border border-lime-500/20 rounded p-4 mb-8 space-y-3 text-sm">
            <p className="text-lime-300/60 uppercase text-xs font-semibold">System Status</p>
            <div className="flex justify-between items-center">
              <span className="text-cyan-300">🧬 Life Support System</span>
              <span className={gameState.sphereProgress.biology.completed ? 'text-lime-400' : 'text-yellow-400'}>
                {gameState.sphereProgress.biology.completed ? '● RESTORED' : '● PENDING'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-cyan-300">⚗️ Power Core</span>
              <span className={gameState.sphereProgress.chemistry.completed ? 'text-lime-400' : 'text-yellow-400'}>
                {gameState.sphereProgress.chemistry.completed ? '● RESTORED' : '● PENDING'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-cyan-300">⚡ Communication Array</span>
              <span className={gameState.sphereProgress.physics.completed ? 'text-lime-400' : 'text-yellow-400'}>
                {gameState.sphereProgress.physics.completed ? '● RESTORED' : '● PENDING'}
              </span>
            </div>
          </div>

          {/* Certificate Message */}
          <div className="bg-slate-900/50 border border-lime-500/20 rounded p-4 mb-8">
            <p className="text-lime-300 text-sm leading-relaxed">
              This certifies that <span className="font-bold">{gameState.playerName}</span> has successfully completed the Bio-Sphere Explorer mission and demonstrated exceptional knowledge of science.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handlePlayAgain}
              className="w-full bg-gradient-to-r from-lime-500 to-cyan-500 hover:from-lime-600 hover:to-cyan-600 text-white font-bold py-2 rounded transition-all duration-300"
            >
              PLAY AGAIN
            </Button>
            <Button
              onClick={() => setLocation('/')}
              variant="outline"
              className="w-full border-lime-500/30 text-lime-300 hover:bg-lime-500/10"
            >
              RETURN HOME
            </Button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-lime-300/40 text-xs mt-6">
          Thank you for playing Bio-Sphere Explorer
        </p>
      </div>
    </div>
  );
}
