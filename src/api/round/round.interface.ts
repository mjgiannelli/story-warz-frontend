export interface RoundDTO {
  id: string;
  gameId: string;
  fooledPlayerIds: string[];
  correctPlayerIds: string[];
  playerIds: string[];
  roundNum: number;
  storyId: string;
  storyOwnerId: string;
}