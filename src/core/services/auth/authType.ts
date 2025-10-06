export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResposeData {
    authToken: AuthToken;
    refreshToken: RefreshToken;
}

export interface AuthToken {
    expiresAt: string;
    expiresIn: string;
    token: string;
}

export interface RefreshToken {
    expiresAt: string;
    expiresIn: string;
    token: string;
}