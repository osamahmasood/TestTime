import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';
import { Loader2 } from 'lucide-react';

export default function StudentLogin() {
  const [, setLocation] = useLocation();
  const [studentNumber, setStudentNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loginMutation = trpc.student.login.useMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call the login API
      const result = await loginMutation.mutateAsync({
        studentNumber,
        studentName,
      });

      if (result.success && result.studentId) {
        // Store student ID in localStorage
        localStorage.setItem('studentId', result.studentId.toString());
        localStorage.setItem('studentName', studentName);
        localStorage.setItem('userRole', 'student');
        
        // Redirect to student dashboard
        setLocation('/student-dashboard');
      } else {
        setError('Invalid student number or name');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-slate-800/80 border-cyan-500/30 p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🎓</div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
              Student Login
            </h1>
            <p className="text-cyan-300/60">Enter your credentials to access the game</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Student Number */}
            <div>
              <label className="block text-cyan-300 text-sm font-semibold mb-2">
                Student Number
              </label>
              <input
                type="text"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                placeholder="Enter your student number"
                className="w-full px-4 py-2 bg-slate-900/50 border border-cyan-500/30 rounded text-cyan-300 placeholder-cyan-300/40 focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-cyan-300 text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 bg-slate-900/50 border border-cyan-500/30 rounded text-cyan-300 placeholder-cyan-300/40 focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded p-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-2 rounded transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'LOGIN'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-cyan-500/20"></div>

          {/* Teacher Login Link */}
          <div className="text-center">
            <p className="text-cyan-300/60 text-sm mb-3">Are you a teacher?</p>
            <Button
              onClick={() => setLocation('/teacher-login')}
              variant="outline"
              className="w-full border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
            >
              Teacher Login
            </Button>
          </div>

          {/* Back Button */}
          <Button
            onClick={() => setLocation('/')}
            variant="outline"
            className="w-full mt-3 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
          >
            Back to Home
          </Button>
        </Card>

        {/* Footer */}
        <p className="text-center text-cyan-300/40 text-xs mt-6">
          Bio-Sphere Explorer © 2024
        </p>
      </div>
    </div>
  );
}
