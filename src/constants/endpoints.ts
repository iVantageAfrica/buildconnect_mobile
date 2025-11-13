
export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/signup",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESEND_OTP: "/auth/resend-verification",
    REFRESH_TOKEN: "/auth/refresh-token",
    VERIFY_OTP: "/auth/verify-otp",
    CLIENT_VERIFY_IDENTITY: "/auth/client-verify-identity",
    RESET_PASSWORD: "/auth/reset-password",
  },

  UPLOAD: {
    PREPARE_UPLOAD: "/files/prepare-upload",
    CONFIRM_UPLOAD: (fileId: string) => `/files/${fileId}/confirm-upload`,
  },

  LOOKUP: {
    PROJECT_TYPES: "/lookups/lookups/project-types",
    TIMELINES: "/lookups/timelines",
    BUDGET_RANGES: "/lookups/budget-ranges",
  },

  DASHBOARD: {
    GET_PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/update",
  }
};
