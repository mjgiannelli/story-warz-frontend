import { CreateUserDTO } from "./user.interface";

export class UserAPI {
    static ravenURL: string = `${process.env.REACT_APP_API_URL}/user/`;
    
    public static async signUp(body: CreateUserDTO) {
        try {
            const resp = await fetch(this.ravenURL, {
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