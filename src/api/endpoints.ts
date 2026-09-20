export const ENDPOINTS = {
    AUTH: {
        LOGIN: "/api/v1/super-admins/login",
        ME: "/api/v1/super-admins/me",
        LOGOUT: "/api/v1/super-admins/logout",
        FORGOT_PASSWORD: "/api/v1/super-admins/forgot-password"
    },
    DASHBOARD: {
        OVERVIEW: "/api/v1/super-admins/dashboard/summary"
    },
    HOSPITALS: {
        LIST: "/api/v1/super-admins/hospitals",
        DETAIL: (hospitalId: number) =>
            `/api/v1/super-admins/hospitals/${hospitalId}`,
        CREATE:"/api/v1/super-admins/hospitals"
    },
    DEPARTMENTS:{
        LIST:"/api/v1/super-admins/departments"
    }
}