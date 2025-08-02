export interface StoryDTO {
  storyId: string;
  ownerUserId: string;
  content: string;
  createdDate: string; // ISO 8601 string
  gameId: string;
}