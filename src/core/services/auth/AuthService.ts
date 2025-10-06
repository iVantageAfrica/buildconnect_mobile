import { useApiClient } from "../../hooks/useApiClient"


export const useAuthService = () => {

    const api = useApiClient();

    const login = async(email: string, password: string) => {
        try {
            const response = await api.post("auth/login", {email, password});
            return response.data
        } catch (error: any) {
            throw error;
        }
    }

    return {
        login
    };
}