import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import useSupabase from '@/lib/supabase/use-supabase';

function useSignUp() {
    const client = useSupabase();

    return useMutation((credentials: SignUpWithPasswordCredentials) => {
        const emailRedirectTo = [window.location.origin, '/auth/callback'].join('');

        const options = {
            emailRedirectTo,
            ...(credentials.options ?? {}),
        };

        return client.auth
            .signUp({
                ...credentials,
                options,
            })
            .then((response) => {
                if (response.error) {
                    throw response.error.message;
                }

                return response.data;
            });
    });
}

export default useSignUp;