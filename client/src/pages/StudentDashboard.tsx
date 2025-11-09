import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';
import { Loader2, LogOut } from 'lucide-react';

export default function StudentDashboard() {
  const [, setLocation] = useLocation();
  const [studentId, setStudentId] = useState<number | null>(null);
  const [studentName, setStudentName] = useState('');

  const { data: sessions, isLoading } = trpc.game.getStudentSessions.useQuery(
    { studentId: studentId || 0 },
    { enabled: studentId !== null }
  );

  useEffect(() => {
    const id = localStorage.getItem('studentId');
    const name = localStorage.getItem('studentName');
    const role = localStorage.getItem('userRole');

    if (!id || role !== 'student') {
      setLocation('/student-login');
      return;
    }

    setStudentId(parseInt(id));
    setStudentName(name || '');
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem('studentId');
    localStorage.removeItem('studentName');
    localStorage.removeItem('userRole');
    setLocation('/');
  };

  const handlePlayGame = () => {
    setLocation('/game');
  };

  if (!studentId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="animate-spin text-cyan-400 w-8 h-8" />
      </div>
    );
  }

  const totalSessions = sessions?.length || 0;
  const completedSessions = sessions?.filter(s => s.isCompleted === 1).length || 0;
  const averageScore = sessions && sessions.length > 0
    ? Math.round(sessions.reduce((sum, s) => sum + (s.totalScore || 0), 0) / sessions.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Welcome, {studentName}!
              </h1>
              <p className="text-cyan-300/60 mt-2">Your Science Quest Dashboard</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500/30 text-red-300 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/80 border-cyan-500/30 p-6 backdrop-blur-sm">
            <p className="text-cyan-300/60 text-sm mb-2">Total Attempts</p>
            <p className="text-4xl font-bold text-cyan-400">{totalSessions}</p>
          </Card>

          <Card className="bg-slate-800/80 border-lime-500/30 p-6 backdrop-blur-sm">
            <p className="text-lime-300/60 text-sm mb-2">Completed</p>
            <p className="text-4xl font-bold text-lime-400">{completedSessions}</p>
          </Card>

          <Card className="bg-slate-800/80 border-purple-500/30 p-6 backdrop-blur-sm">
            <p className="text-purple-300/60 text-sm mb-2">Average Score</p>
            <p className="text-4xl font-bold text-purple-400">{averageScore}</p>
            <p className="text-purple-300/60 text-xs mt-1">/ 300</p>
          </Card>

          <Card className="bg-slate-800/80 border-orange-500/30 p-6 backdrop-blur-sm">
            <p className="text-orange-300/60 text-sm mb-2">Best Score</p>
            <p className="text-4xl font-bold text-orange-400">
              {sessions && sessions.length > 0
                ? Math.max(...sessions.map(s => s.totalScore || 0))
                : 0}
            </p>
          </Card>
        </div>

        {/* Play Game Button */}
        <div className="mb-8">
          <Button
            onClick={handlePlayGame}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-4 rounded text-lg transition-all duration-300"
          >
            🚀 START NEW MISSION
          </Button>
        </div>

        {/* Previous Results */}
        <Card className="bg-slate-800/80 border-cyan-500/30 backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-cyan-500/20">
            <h2 className="text-xl font-bold text-cyan-300">Your Previous Attempts</h2>
          </div>

          {sessions && sessions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-500/20 bg-slate-900/50">
                    <th className="px-6 py-4 text-left text-cyan-300 font-semibold text-sm">#</th>
                    <th className="px-6 py-4 text-left text-cyan-300 font-semibold text-sm">Date</th>
                    <th className="px-6 py-4 text-center text-cyan-300 font-semibold text-sm">Score</th>
                    <th className="px-6 py-4 text-center text-cyan-300 font-semibold text-sm">Spheres</th>
                    <th className="px-6 py-4 text-center text-cyan-300 font-semibold text-sm">Status</th>
                    <th className="px-6 py-4 text-center text-cyan-300 font-semibold text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session, index) => (
                    <tr key={session.id} className="border-b border-cyan-500/10 hover:bg-slate-900/30 transition-colors">
                      <td className="px-6 py-4 text-cyan-300">{index + 1}</td>
                      <td className="px-6 py-4 text-cyan-300/70">
                        {new Date(session.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-lime-400 font-bold">{session.totalScore}</span>
                        <span className="text-cyan-300/60 text-sm"> / 300</span>
                      </td>
                      <td className="px-6 py-4 text-center text-cyan-300">
                        {session.completedSpheres} / 3
                      </td>
                      <td className="px-6 py-4 text-center">
                        {session.isCompleted === 1 ? (
                          <span className="inline-block px-3 py-1 bg-lime-500/20 border border-lime-500/30 rounded text-lime-400 text-xs font-semibold">
                            ✓ Completed
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded text-yellow-400 text-xs font-semibold">
                            In Progress
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          onClick={() => setLocation(`/student-details/${session.id}`)}
                          size="sm"
                          className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30"
                          variant="outline"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-cyan-300/60">No attempts yet</p>
              <p className="text-cyan-300/40 text-sm mt-2">Start your first mission to see your results here!</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
