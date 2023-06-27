import { Injectable, OnInit } from '@angular/core';
import { User } from './interfaces';
import { Game } from './interfaces';
import { UserXGame } from './interfaces';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService{
  
  users: User[] = [];
  games: Game[] = [];
  userXGame : UserXGame[] = [];

  req = this.http.get<User>('http://gtlex-admin.chemx.xyz/api/api/users/users.php');
  

  usersObservable: BehaviorSubject<User[]> = new BehaviorSubject(this.users);
  gamesObservable: BehaviorSubject<Game[]> = new BehaviorSubject(this.games);
  userXGamesObservable: BehaviorSubject<UserXGame[]> = new BehaviorSubject(this.userXGame)
  
  constructor(private http: HttpClient) { 
    //console.log('init...');
    setTimeout(
      ()=>{

        this.setUsers();
        this.setGames();
        this.setUserXGames();
      }, 1000
    )
  }





  setUsers(){
    console.log('begin set new users...');

    this.req.subscribe(
      (users: any): void=>
      {
        console.log('out user',users);
        this.users = users.data;
        this.usersObservable.next(this.users);

      });

    // this.users.push({
    //   id: 1,
    //   username:"Marty Trujillo",
    //   nickname: "Marty",
    //   tiktok: true,
    //   tiktokName:"MartyILikeToParty",
    //   deleted: false
    // },
    // {
    //   id: 2,
    //   username:"Melissa Trujillo",
    //   nickname: "Melissa",
    //   tiktok: true,
    //   tiktokName:"CraftyByMelissa",
    //   deleted: false
    // },
    // {
    //   id: 3,
    //   username:"Alexander Trujillo",
    //   nickname: "Lex",
    //   tiktok: false,
    //   tiktokName:"N/A",
    //   deleted: true
    // },
    // {
    //   id: 4,
    //   username:"Anastasia Trujillo",
    //   nickname: "Ana",
    //   tiktok: true,
    //   tiktokName:"AnaBanana",
    //   deleted: false
    // },
    // {
    //   id: 5,
    //   username:"Rodrick Trujillo",
    //   nickname: "Rod",
    //   tiktok: true,
    //   tiktokName:"Capn Kujo",
    //   deleted: false
    // }
    // );
    //console.log('setting new users...');
    this.usersObservable.next(this.users);
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
    this.gamesObservable.next(this.games)
  }
  getUserXGames(){
    return this.userXGame;
  }
  setUserXGames(){
    this.userXGame.push({
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
    this.userXGamesObservable.next(this.userXGame)
  }
}
