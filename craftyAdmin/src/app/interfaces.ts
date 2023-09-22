export interface User {
    userID?: number;
    username: string;
    nickname: string;
    tiktok: boolean;
    tiktokName:string;
    deleted?:boolean;
    SQL?:string;
}

export interface Game {
    gameID?: number;
    gameName: string;
    gameDescription: string;
    deleted?: boolean;
}

export interface UserXGame{
    userXgameID?: number;
    userID: number;
    gameID: number;
    deleted?: boolean;
}

export interface UiUserXGame
{
    userXgameID?: number;
    userID: number;
    username?: string;
    gameID: number;
    gameName?: string;
    deleted?: boolean;
}
