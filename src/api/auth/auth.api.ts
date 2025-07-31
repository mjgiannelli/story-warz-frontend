import { CredentialsDTO } from "./auth.interface";

export class AuthAPI {
    static ravenURL: string = `${process.env.REACT_APP_API_URL}/auth/`;
    
    public static async login(body: CredentialsDTO) {
        try {
            const resp = await fetch(this.ravenURL + "login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(body)
            });
    
            const data = await resp.json();
            
            return data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('An error occurred:', error.message);
                return { error: error.message }
            }
        }
    }
}