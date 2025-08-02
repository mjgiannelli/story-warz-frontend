import { Book } from "../../App.interface";

export interface CreateUserDTO {
    username: string;
    password: string;
    displayName: string;
}

export interface UserDTO {
    id: string;
    username: string;
    displayName: string;
    friends: UserDTO[];
    library: Book[];
    createdDate: string;
}