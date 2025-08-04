export interface StoryDTO {
  storyId: string;
  ownerUserId: string;
  ownerDisplayName: string;
  ownerUsername: string;
  content: string;
  createdDate: string; // ISO 8601 string
  gameId: string;
}