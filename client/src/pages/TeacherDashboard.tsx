import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect } from "react";
import { Loader2, BarChart3, Users, TrendingUp } from "lucide-react";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { data: sessions, isLoading } = trpc.game.getAllSessions.useQuery();

  useEffect(() => {
    if (user && user.role !== "admin") {
      setLocation("/");
    }
  }, [user, setLocation]);

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">Access Denied</p>
          <p className="text-cyan-300/60">Only teachers can access this dashboard</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Teacher Dashboard
              </h1>
              <p className="text-cyan-300/60 mt-2">Monitor student performance and results</p>
            </div>
            <Button
              onClick={() => setLocation("/")}
              variant="outline"
              className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
            >
              Back to Home
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Total Students */}
          <Card className="bg-slate-800/80 border-cyan-500/30 p-6 backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-cyan-300/60 text-sm mb-2">Total Students</p>
                <p className="text-4xl font-bold text-cyan-400">{totalSessions}</p>
              </div>
              <Users className="w-8 h-8 text-cyan-400 opacity-50" />
            </div>
          </Card>

          {/* Completed Sessions */}
          <Card className="bg-slate-800/80 border-lime-500/30 p-6 backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lime-300/60 text-sm mb-2">Completed Sessions</p>
                <p className="text-4xl font-bold text-lime-400">{completedSessions}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-lime-400 opacity-50" />
            </div>
          </Card>

          {/* Average Score */}
          <Card className="bg-slate-800/80 border-purple-500/30 p-6 backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-purple-300/60 text-sm mb-2">Average Score</p>
                <p className="text-4xl font-bold text-purple-400">{averageScore}</p>
                <p className="text-purple-300/60 text-xs mt-1">out of 300</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-400 opacity-50" />
            </div>
          </Card>
        </div>

        {/* Student Results Table */}
        <Card className="bg-slate-800/80 border-cyan-500/30 backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-cyan-500/20">
            <h2 className="text-xl font-bold text-cyan-300">Student Results</h2>
          </div>

          {sessions && sessions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-500/20 bg-slate-900/50">
                    <th className="px-6 py-4 text-left text-cyan-300 font-semibold text-sm">Student Name</th>
                    <th className="px-6 py-4 text-left text-cyan-300 font-semibold text-sm">Email</th>
                    <th className="px-6 py-4 text-center text-cyan-300 font-semibold text-sm">Score</th>
                    <th className="px-6 py-4 text-center text-cyan-300 font-semibold text-sm">Spheres Completed</th>
                    <th className="px-6 py-4 text-center text-cyan-300 font-semibold text-sm">Status</th>
                    <th className="px-6 py-4 text-center text-cyan-300 font-semibold text-sm">Date</th>
                    <th className="px-6 py-4 text-center text-cyan-300 font-semibold text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session) => (
                    <tr key={session.id} className="border-b border-cyan-500/10 hover:bg-slate-900/30 transition-colors">
                      <td className="px-6 py-4 text-cyan-300">Student #{session.studentId}</td>
                      <td className="px-6 py-4 text-cyan-300/70">{new Date(session.createdAt).toLocaleDateString()}</td>
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
                      <td className="px-6 py-4 text-center text-cyan-300/70 text-sm">
                        {session.createdAt ? new Date(session.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          onClick={() => setLocation(`/student-details/${session.id}`)}
                          size="sm"
                          className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30"
                          variant="outline"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-cyan-300/60">No student sessions yet</p>
              <p className="text-cyan-300/40 text-sm mt-2">Students will appear here once they complete the game</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
