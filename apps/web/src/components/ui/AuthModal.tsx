import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Sparkles, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export function AuthModal() {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoadingEmail(true);
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Check your email for the confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Successfully logged in!");
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to authenticate');
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoadingGoogle(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin }
      });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message || 'Failed to sign in with Google');
      setIsLoadingGoogle(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setIsLoadingGithub(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: window.location.origin }
      });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message || 'Failed to sign in with GitHub');
      setIsLoadingGithub(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0B0F1A]/90 backdrop-blur-md z-[999] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0F172A] border border-[#1E293B] p-8 rounded-2xl shadow-2xl max-w-md w-full flex flex-col items-center my-8">
        <div className="w-16 h-16 rounded-full bg-[#0B0F1A] border-2 border-[#334155]/60 flex items-center justify-center mb-6 shadow-md overflow-hidden flex-shrink-0">
          <img src="/logo.png" alt="IsoStack Logo" className="w-full h-full object-cover object-center scale-110" />
        </div>
        <h2 className="text-3xl text-[#F1F5F9] mb-2 text-center font-medium tracking-wide" style={{ fontFamily: "'Newsreader', serif" }}>Welcome to IsoStack</h2>
        <p className="text-[#94A3B8] text-sm text-center mb-6">
          Sign in to generate architectures, save your progress, and export your code to GitHub.
        </p>

        <form onSubmit={handleEmailAuth} className="w-full space-y-3 mb-6">
          <div className="space-y-1">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input 
                type="email" 
                placeholder="Email address"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#1E293B] border border-[#334155] text-[#F1F5F9] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>
          </div>
          <div className="space-y-1">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input 
                type="password" 
                placeholder="Password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#1E293B] border border-[#334155] text-[#F1F5F9] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoadingEmail}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoadingEmail ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
          <div className="text-center mt-2">
            <button 
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-[#3B82F6] hover:text-[#60A5FA]"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>

        <div className="w-full flex items-center gap-4 mb-6">
          <div className="h-px bg-[#1E293B] flex-1"></div>
          <span className="text-xs text-[#64748B] uppercase tracking-wider font-semibold">Or continue with</span>
          <div className="h-px bg-[#1E293B] flex-1"></div>
        </div>

        <div className="w-full space-y-3">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoadingGoogle || isLoadingGithub || isLoadingEmail}
            className="w-full relative flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoadingGoogle ? (
              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  <path fill="none" d="M1 1h22v22H1z"/>
                </svg>
                Google
              </>
            )}
          </button>
          
          <button
            onClick={handleGithubLogin}
            disabled={isLoadingGoogle || isLoadingGithub || isLoadingEmail}
            className="w-full relative flex items-center justify-center gap-3 bg-[#24292F] hover:bg-[#1b1f23] text-white font-semibold px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50 border border-[#475569]"
          >
            {isLoadingGithub ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </>
            )}
          </button>
        </div>
        
        <p className="mt-6 text-xs text-[#64748B] text-center px-4 leading-relaxed">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
