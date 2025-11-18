import { StoryDTO } from "../story/story.interface";
export interface Vote {
  userId: string;
  displayName: string;
  username: string;
}

export interface PlayerVote {
  voterId: string;
  gameId: string;
  vote: Vote;
}

export interface RoundDTO {
  id: string;
  gameId: string;
  roundNum: number;
  storyContent: string;
  votes: PlayerVote[]
};