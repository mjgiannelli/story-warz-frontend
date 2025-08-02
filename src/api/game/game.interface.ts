import { UserScore, Book } from "../../App.interface";
import { RoundDTO } from "../round/round.interface";
import { StoryDTO } from "../story/story.interface";
import { UserDTO } from "../user/user.interface";

export interface GameDTO {
    gameId: string;
    topic: string;
    stories: StoryDTO[];
    userScoreBoard: UserScore[];
    players: UserDTO[];
    currentRoundNum: number;
    createdDate: string;     // ISO 8601 date string
    completedDate: string;   // ISO 8601 date string
    book: Book;
    roundResults: RoundDTO[];
    creatorId: string;
}

export interface CreateGameDTO {
    topic: string;
    createdDate: string;     // ISO 8601 date string
    book: Book;
    creatorId: string;
}