import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation, useParams } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect } from "react";
import { Loader2, ArrowLeft } from "lucide-react";

export default function StudentDetails() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { sessionId } = useParams();
  const sessionIdNum = sessionId ? parseInt(sessionId) : 0;

  const { data: sessionData, isLoading } = trpc.game.getSession.useQuery(
    { sessionId: sessionIdNum },
    { enabled: sessionIdNum > 0 }
  );

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
          <p className="text-cyan-300/60">Only teachers can access this page</p>
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

  if (!sessionData?.session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">Session Not Found</p>
          <Button
            onClick={() => setLocation("/teacher-dashboard")}
            className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const { session, results } = sessionData;
  const timeTaken = session.startTime && session.endTime
    ? Math.floor((new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 1000)
    : 0;
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => setLocation("/teacher-dashboard")}
            variant="outline"
            className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
            Student #{session.studentId}
          </h1>
          <p className="text-cyan-300/60">Session Details & Performance Analysis</p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/80 border-cyan-500/30 p-4 backdrop-blur-sm">
            <p className="text-cyan-300/60 text-xs mb-1">Total Score</p>
            <p className="text-3xl font-bold text-cyan-400">{session.totalScore}</p>
            <p className="text-cyan-300/60 text-xs mt-1">/ 300</p>
          </Card>

          <Card className="bg-slate-800/80 border-lime-500/30 p-4 backdrop-blur-sm">
            <p className="text-lime-300/60 text-xs mb-1">Spheres Completed</p>
            <p className="text-3xl font-bold text-lime-400">{session.completedSpheres}</p>
            <p className="text-lime-300/60 text-xs mt-1">/ 3</p>
          </Card>

          <Card className="bg-slate-800/80 border-purple-500/30 p-4 backdrop-blur-sm">
            <p className="text-purple-300/60 text-xs mb-1">Time Taken</p>
            <p className="text-2xl font-bold text-purple-400">{minutes}m {seconds}s</p>
          </Card>

          <Card className="bg-slate-800/80 border-orange-500/30 p-4 backdrop-blur-sm">
            <p className="text-orange-300/60 text-xs mb-1">Status</p>
            <p className={`text-lg font-bold ${session.isCompleted === 1 ? 'text-lime-400' : 'text-yellow-400'}`}>
              {session.isCompleted === 1 ? '✓ Complete' : 'In Progress'}
            </p>
          </Card>
        </div>

        {/* Sphere Results */}
        <Card className="bg-slate-800/80 border-cyan-500/30 backdrop-blur-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-cyan-500/20">
            <h2 className="text-xl font-bold text-cyan-300">Sphere Performance</h2>
          </div>

          <div className="p-6 space-y-4">
            {results && results.length > 0 ? (
              results.map((result) => {
                const questionsAttempted = result.questionsAttempted || 0;
                const correctAnswers = result.correctAnswers || 0;
                const percentage = questionsAttempted > 0
                  ? Math.round((correctAnswers / questionsAttempted) * 100)
                  : 0;

                const sphereEmoji = {
                  biology: '🧬',
                  chemistry: '⚗️',
                  physics: '⚡',
                }[result.sphere] || '?';

                const sphereName = {
                  biology: 'Life Support System (Biology)',
                  chemistry: 'Power Core (Chemistry)',
                  physics: 'Communication Array (Physics)',
                }[result.sphere] || result.sphere;

                return (
                  <div key={result.id} className="bg-slate-900/50 border border-cyan-500/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-cyan-300 font-semibold">
                          {sphereEmoji} {sphereName}
                        </p>
                        <p className="text-cyan-300/60 text-sm">
                          {correctAnswers} / {questionsAttempted} correct
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-lime-400">{percentage}%</p>
                        <p className="text-cyan-300/60 text-xs">Accuracy</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-lime-500 to-cyan-500 transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-cyan-300/60">No sphere results available</p>
            )}
          </div>
        </Card>

        {/* Session Info */}
        <Card className="bg-slate-800/80 border-cyan-500/30 backdrop-blur-sm p-6">
          <h2 className="text-lg font-bold text-cyan-300 mb-4">Session Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-cyan-300/60 text-sm">Student ID</p>
              <p className="text-cyan-300">#{session.studentId}</p>
            </div>
            <div>
              <p className="text-cyan-300/60 text-sm">Session Date</p>
              <p className="text-cyan-300">{new Date(session.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-cyan-300/60 text-sm">Start Time</p>
              <p className="text-cyan-300">{new Date(session.startTime).toLocaleTimeString()}</p>
            </div>
            <div>
              <p className="text-cyan-300/60 text-sm">End Time</p>
              <p className="text-cyan-300">
                {session.endTime ? new Date(session.endTime).toLocaleTimeString() : "Not completed"}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
