import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';
import { Loader2 } from 'lucide-react';

export default function TeacherLogin() {
  const [, setLocation] = useLocation();
  const [teacherCode, setTeacherCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loginMutation = trpc.teacher.login.useMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call the login API
      const result = await loginMutation.mutateAsync({
        teacherCode,
        password,
      });

      if (result.success && result.teacherId) {
        // Store teacher ID in localStorage
        localStorage.setItem('teacherId', result.teacherId.toString());
        localStorage.setItem('teacherName', result.teacherName || '');
        localStorage.setItem('userRole', 'teacher');
        
        // Redirect to teacher dashboard
        setLocation('/teacher-dashboard');
      } else {
        setError('Invalid teacher code or password');
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-lime-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-slate-800/80 border-lime-500/30 p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">👨‍🏫</div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-orange-400 mb-2">
              Teacher Login
            </h1>
            <p className="text-lime-300/60">Access the teacher dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Teacher Code */}
            <div>
              <label className="block text-lime-300 text-sm font-semibold mb-2">
                Teacher Code
              </label>
              <input
                type="text"
                value={teacherCode}
                onChange={(e) => setTeacherCode(e.target.value)}
                placeholder="Enter your teacher code"
                className="w-full px-4 py-2 bg-slate-900/50 border border-lime-500/30 rounded text-lime-300 placeholder-lime-300/40 focus:outline-none focus:border-lime-400 transition-colors"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-lime-300 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-slate-900/50 border border-lime-500/30 rounded text-lime-300 placeholder-lime-300/40 focus:outline-none focus:border-lime-400 transition-colors"
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
              className="w-full bg-gradient-to-r from-lime-500 to-orange-500 hover:from-lime-600 hover:to-orange-600 text-white font-bold py-2 rounded transition-all duration-300 flex items-center justify-center gap-2"
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
          <div className="my-6 border-t border-lime-500/20"></div>

          {/* Student Login Link */}
          <div className="text-center">
            <p className="text-lime-300/60 text-sm mb-3">Are you a student?</p>
            <Button
              onClick={() => setLocation('/student-login')}
              variant="outline"
              className="w-full border-lime-500/30 text-lime-300 hover:bg-lime-500/10"
            >
              Student Login
            </Button>
          </div>

          {/* Back Button */}
          <Button
            onClick={() => setLocation('/')}
            variant="outline"
            className="w-full mt-3 border-lime-500/30 text-lime-300 hover:bg-lime-500/10"
          >
            Back to Home
          </Button>
        </Card>

        {/* Footer */}
        <p className="text-center text-lime-300/40 text-xs mt-6">
          Bio-Sphere Explorer © 2024
        </p>
      </div>
    </div>
  );
}
