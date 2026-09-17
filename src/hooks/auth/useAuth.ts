// hooks/auth/useAuth.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/api/services/auth.service";
import { queryKeys } from "@/api/query-keys";
import { saveAuthSession, clearAuthSession } from "@/lib/auth-storage";
import { getSession, signOut } from "@/lib/auth";

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const sessionQuery = useQuery({
    queryKey: queryKeys.auth.session,
    queryFn: authService.me,
    initialData: () => getSession() ?? undefined,
    staleTime: 5 * 60_000,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      saveAuthSession(response.data.access_token, response.data.admin);
      queryClient.setQueryData(queryKeys.auth.session, response.data.admin);
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: authService.forgotPassword,
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      signOut();
      clearAuthSession();
      queryClient.clear();
      router.replace("/login");
    },
  });

  return {
    // session
    user: sessionQuery.data,
    isSessionLoading: sessionQuery.isLoading,

    // login
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    // forgot password
    forgotPassword: forgotPasswordMutation.mutateAsync,
    isForgotPasswordLoading: forgotPasswordMutation.isPending,
    forgotPasswordError: forgotPasswordMutation.error,

    // logout
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}