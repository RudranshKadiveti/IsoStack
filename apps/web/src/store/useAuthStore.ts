import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  session: Session | null;
  user: User | null;
  initialized: boolean;
  setSession: (session: Session | null) => void;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  initialized: false,
  setSession: (session) => set({ session, user: session?.user || null }),
  initialize: async () => {
    // Get initial session
    const { data: { session } } = await supabase.auth.getSession();
    set({ session, user: session?.user || null, initialized: true });

    // Listen for auth changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      set({ session, user: session?.user || null });
      
      if (event === 'SIGNED_IN' && session?.provider_token) {
        try {
          // First, try to insert the token (for new users)
          const { error: insertError } = await supabase
            .from('user_github_tokens')
            .insert({
              user_id: session.user.id,
              token: session.provider_token,
              github_username: session.user.user_metadata?.user_name || session.user.email?.split('@')[0]
            });

          // If insert fails with duplicate key error (23505), update instead
          if (insertError?.code === '23505' || insertError?.code === '23503' || insertError?.message?.includes('duplicate')) {
            const { error: updateError } = await supabase
              .from('user_github_tokens')
              .update({
                token: session.provider_token,
                github_username: session.user.user_metadata?.user_name || session.user.email?.split('@')[0],
                updated_at: new Date().toISOString()
              })
              .eq('user_id', session.user.id);

            if (updateError) {
              console.error('Failed to update GitHub token:', updateError);
            }
          } else if (insertError) {
            console.error('Failed to store GitHub token:', insertError);
          }
        } catch (err) {
          console.error('Unexpected error storing GitHub token:', err);
        }
      }
    });
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null });
  }
}));
