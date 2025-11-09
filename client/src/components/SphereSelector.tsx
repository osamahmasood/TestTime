import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { sphereInfo } from '@/data/questions';

export default function SphereSelector() {
  const { gameState, startSphere } = useGame();
  const [, setLocation] = useLocation();

  const handleSelectSphere = (sphere: 'biology' | 'chemistry' | 'physics') => {
    startSphere(sphere);
    setLocation('/play');
  };

  const allSpheresComplete =
    gameState.sphereProgress.biology.completed &&
    gameState.sphereProgress.chemistry.completed &&
    gameState.sphereProgress.physics.completed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
            SELECT YOUR MISSION
          </h1>
          <p className="text-cyan-300/70">
            {gameState.playerName}, choose a system to restore
          </p>
        </div>

        {/* Sphere Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Biology Sphere */}
          <div
            className={`relative group cursor-pointer ${
              gameState.sphereProgress.biology.completed ? 'opacity-60' : ''
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${sphereInfo.biology.color} rounded-lg blur-lg opacity-20 group-hover:opacity-30 transition-opacity`}></div>
            <div className="relative bg-slate-800/80 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-400/60 transition-all">
              <div className="text-5xl mb-4">{sphereInfo.biology.icon}</div>
              <h2 className="text-xl font-bold text-cyan-300 mb-2">
                {sphereInfo.biology.name}
              </h2>
              <p className="text-cyan-300/60 text-sm mb-4">
                {sphereInfo.biology.description}
              </p>
              <p className="text-cyan-300/50 text-xs mb-4">
                {sphereInfo.biology.questions} questions
              </p>
              {gameState.sphereProgress.biology.completed && (
                <div className="mb-4 p-2 bg-lime-500/20 border border-lime-500/30 rounded">
                  <p className="text-lime-400 text-xs font-semibold">✓ COMPLETED</p>
                  <p className="text-lime-300/70 text-xs">Score: {gameState.sphereProgress.biology.score}</p>
                </div>
              )}
              <Button
                onClick={() => handleSelectSphere('biology')}
                disabled={gameState.sphereProgress.biology.completed}
                className={`w-full ${
                  gameState.sphereProgress.biology.completed
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white'
                } font-bold py-2 rounded transition-all duration-300`}
              >
                {gameState.sphereProgress.biology.completed ? 'COMPLETED' : 'START'}
              </Button>
            </div>
          </div>

          {/* Chemistry Sphere */}
          <div
            className={`relative group cursor-pointer ${
              gameState.sphereProgress.chemistry.completed ? 'opacity-60' : ''
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${sphereInfo.chemistry.color} rounded-lg blur-lg opacity-20 group-hover:opacity-30 transition-opacity`}></div>
            <div className="relative bg-slate-800/80 border border-orange-500/30 rounded-lg p-6 backdrop-blur-sm hover:border-orange-400/60 transition-all">
              <div className="text-5xl mb-4">{sphereInfo.chemistry.icon}</div>
              <h2 className="text-xl font-bold text-orange-300 mb-2">
                {sphereInfo.chemistry.name}
              </h2>
              <p className="text-orange-300/60 text-sm mb-4">
                {sphereInfo.chemistry.description}
              </p>
              <p className="text-orange-300/50 text-xs mb-4">
                {sphereInfo.chemistry.questions} questions
              </p>
              {gameState.sphereProgress.chemistry.completed && (
                <div className="mb-4 p-2 bg-lime-500/20 border border-lime-500/30 rounded">
                  <p className="text-lime-400 text-xs font-semibold">✓ COMPLETED</p>
                  <p className="text-lime-300/70 text-xs">Score: {gameState.sphereProgress.chemistry.score}</p>
                </div>
              )}
              <Button
                onClick={() => handleSelectSphere('chemistry')}
                disabled={gameState.sphereProgress.chemistry.completed}
                className={`w-full ${
                  gameState.sphereProgress.chemistry.completed
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white'
                } font-bold py-2 rounded transition-all duration-300`}
              >
                {gameState.sphereProgress.chemistry.completed ? 'COMPLETED' : 'START'}
              </Button>
            </div>
          </div>

          {/* Physics Sphere */}
          <div
            className={`relative group cursor-pointer ${
              gameState.sphereProgress.physics.completed ? 'opacity-60' : ''
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${sphereInfo.physics.color} rounded-lg blur-lg opacity-20 group-hover:opacity-30 transition-opacity`}></div>
            <div className="relative bg-slate-800/80 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm hover:border-blue-400/60 transition-all">
              <div className="text-5xl mb-4">{sphereInfo.physics.icon}</div>
              <h2 className="text-xl font-bold text-blue-300 mb-2">
                {sphereInfo.physics.name}
              </h2>
              <p className="text-blue-300/60 text-sm mb-4">
                {sphereInfo.physics.description}
              </p>
              <p className="text-blue-300/50 text-xs mb-4">
                {sphereInfo.physics.questions} questions
              </p>
              {gameState.sphereProgress.physics.completed && (
                <div className="mb-4 p-2 bg-lime-500/20 border border-lime-500/30 rounded">
                  <p className="text-lime-400 text-xs font-semibold">✓ COMPLETED</p>
                  <p className="text-lime-300/70 text-xs">Score: {gameState.sphereProgress.physics.score}</p>
                </div>
              )}
              <Button
                onClick={() => handleSelectSphere('physics')}
                disabled={gameState.sphereProgress.physics.completed}
                className={`w-full ${
                  gameState.sphereProgress.physics.completed
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-magenta-500 hover:from-blue-600 hover:to-magenta-600 text-white'
                } font-bold py-2 rounded transition-all duration-300`}
              >
                {gameState.sphereProgress.physics.completed ? 'COMPLETED' : 'START'}
              </Button>
            </div>
          </div>
        </div>

        {/* Mission Status */}
        <div className="bg-slate-800/80 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm">
          <p className="text-cyan-300/60 text-sm mb-4">MISSION STATUS</p>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-cyan-300">Life Support System</span>
              <span className={gameState.sphereProgress.biology.completed ? 'text-lime-400' : 'text-yellow-400'}>
                {gameState.sphereProgress.biology.completed ? '● RESTORED' : '● IN PROGRESS'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-cyan-300">Power Core</span>
              <span className={gameState.sphereProgress.chemistry.completed ? 'text-lime-400' : 'text-yellow-400'}>
                {gameState.sphereProgress.chemistry.completed ? '● RESTORED' : '● IN PROGRESS'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-cyan-300">Communication Array</span>
              <span className={gameState.sphereProgress.physics.completed ? 'text-lime-400' : 'text-yellow-400'}>
                {gameState.sphereProgress.physics.completed ? '● RESTORED' : '● IN PROGRESS'}
              </span>
            </div>
          </div>

          {allSpheresComplete && (
            <Button
              onClick={() => window.location.href = '/complete'}
              className="w-full bg-gradient-to-r from-lime-500 to-cyan-500 hover:from-lime-600 hover:to-cyan-600 text-white font-bold py-2 rounded transition-all duration-300"
            >
              VIEW MISSION RESULTS
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
