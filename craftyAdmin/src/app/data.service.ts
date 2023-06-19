import { Injectable } from '@angular/core';
import { User } from './interfaces';
import { Game } from './interfaces';
import { UserXGame } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  users: User[] = [];
  games: Game[] = [];
  UserXGame : UserXGame[] = [];

  constructor() { 
    this.setUsers();
    this.setGames();
    this.setUserXGames();
  }

  getUsers(){

    return this.users;
  }
  setUsers(){
    this.users.push({
      id: 1,
      username:"Marty Trujillo",
      nickname: "Marty",
      tiktok: true,
      tiktokName:"MartyILikeToParty",
      deleted: false
    },
    {
      id: 2,
      username:"Melissa Trujillo",
      nickname: "Melissa",
      tiktok: true,
      tiktokName:"CraftyByMelissa",
      deleted: false
    },
    {
      id: 3,
      username:"Alexander Trujillo",
      nickname: "Lex",
      tiktok: false,
      tiktokName:"N/A",
      deleted: false
    },
    {
      id: 4,
      username:"Anastasia Trujillo",
      nickname: "Ana",
      tiktok: true,
      tiktokName:"AnaBanana",
      deleted: false
    },
    {
      id: 5,
      username:"Rodrick Trujillo",
      nickname: "Rod",
      tiktok: true,
      tiktokName:"Capn Kujo",
      deleted: false
    }
    );
  }
  getGames(){
    return this.games;
  }
  setGames(){
    this.games.push({
      id: 1,
      gameName:"First Game",
      gameDescription:"Description the first",
      deleted:false
    },
    {
      id: 2,
      gameName:"Second Game",
      gameDescription:"Description the second",
      deleted:false
    },
    {
      id:3,
      gameName:"Third Game",
      gameDescription:"Description the third",
      deleted:false
    }
    )
  }
  getUserXGames(){
    return this.UserXGame;
  }
  setUserXGames(){
    this.UserXGame.push({
      id:1,
      userId:1,
      gameId:1,
      deleted:false,
    },
    {
      id: 2,
      userId: 1,
      gameId:2,
      deleted:false
    },
    {
      id: 3,
      userId: 3,
      gameId: 1,
      deleted:false
    }
    )
  }
}
