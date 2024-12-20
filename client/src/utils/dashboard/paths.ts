export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    messages: '/dashboard/messages',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
  },
  errors: { },
} as const;
