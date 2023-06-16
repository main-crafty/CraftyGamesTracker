export interface User {
    id: number;
    username: string;
    nickname: string;
    tiktok: boolean;
    tiktokName:string;
    deleted:boolean;
}

export interface Game {
    id: number;
    gameName: string;
    gameDescription: string;
    deleted: boolean;
}

export interface UserXGame{
    id: number;
    userId: number;
    gameId: number;
    deleted: boolean;

}