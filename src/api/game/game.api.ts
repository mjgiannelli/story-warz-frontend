import { CreateGameDTO, GameDTO } from "./game.interface";

export class GameAPI {
    static ravenURL: string = `${process.env.REACT_APP_API_URL}/game/`;
    
    public static async createGame(body: CreateGameDTO) {
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
    public static async updateGame(body: Partial<GameDTO>) {
        try {
            const resp = await fetch(this.ravenURL, {
                method: 'PATCH',
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