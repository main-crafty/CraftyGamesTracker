import { Injectable, OnInit } from '@angular/core';
import { User } from './interfaces';
import { Game } from './interfaces';
import { UserXGame, UiUserXGame } from './interfaces';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService{
  
  users: User[] = [];
  games: Game[] = [];
  userXGames : UserXGame[] = [];

  //http GET request variables
  userReq = this.http.get<User>('/api/api/users/users.php');
  gameReq = this.http.get<Game>('/api/api/games/games.php');
  userXGameReq = this.http.get<UserXGame>('/api/api/usersXgames/usersXgames.php');

  // GET request Observables
  usersObservable: BehaviorSubject<User[]> = new BehaviorSubject(this.users);
  gamesObservable: BehaviorSubject<Game[]> = new BehaviorSubject(this.games);
  userXGamesObservable: BehaviorSubject<UserXGame[]> = new BehaviorSubject(this.userXGames);
  
  //POST request Observables

  usersPostObservable: BehaviorSubject<any> = new BehaviorSubject(null);
  gamesPostObservable: BehaviorSubject<any> = new BehaviorSubject(null);
  userXGamePostObservable: BehaviorSubject<any> = new BehaviorSubject(null);
  
  //DELETE request Observables
  userDeleteObservable: BehaviorSubject<any> = new BehaviorSubject(this.users);
  gameDeleteObservable: BehaviorSubject<any> = new BehaviorSubject(this.games);
  userXgameDeleteObservable: BehaviorSubject<any> = new BehaviorSubject(this.userXGames);

  //PATCH request Observables
  userPatchObservable: BehaviorSubject<any> = new BehaviorSubject(this.users);
  gamePatchObservable: BehaviorSubject<any> = new BehaviorSubject(this.games);
  userXGamePatchObservable: BehaviorSubject<any> = new BehaviorSubject(this.userXGames);

  constructor(private http: HttpClient) { 
    setTimeout(
      ()=>{

        this.setUsers();
        this.setGames();
        this.setUserXGames();
      }, 1000
    )
  }

  setUsers(){
    this.userReq.subscribe(
      (users: any): void=>
      {
        this.users = users.data;
        this.usersObservable.next(this.users);

      });
    this.usersObservable.next(this.users);
  }

  postUser(user : User): Observable<User>{
    const userPost : Observable<User> = this.http.post<User>('/api/api/users/users.php', user);
    const sub:Subscription = userPost.subscribe((user:User)=>{
      this.usersPostObservable.next(user);
      sub.unsubscribe();
    });
    return userPost;
  }

  deleteUser(userID: number): Observable<User>{
    const userDel : Observable<any> = this.http.delete(`/api/api/users/users.php?userID=${userID}`);
    const sub:Subscription = userDel.subscribe((user:User)=>{
      this.userDeleteObservable.next(user);
      sub.unsubscribe();
    })
    return userDel
  }

  patchUser(userChanges: Partial<User>): Observable<User>{
    const userPatch : Observable<any> = this.http.patch(`/api/api/users/users.php`, userChanges)
    const sub:Subscription = userPatch.subscribe((user:User)=>{
      console.log(user);
      this.userPatchObservable.next(user);
      sub.unsubscribe();
    })
    //this.setUsers();
    return userPatch;
  }

  setGames(){
    this.gameReq.subscribe(
      (games: any):void=>
      {
        this.games = games.data;
        this.gamesObservable.next(this.games);
      }
     )
     this.gamesObservable.next(this.games)
    }

  postGame(game : Game): Observable<Game>{
    const gamePost : Observable<Game> = this.http.post<Game>('/api/api/games/games.php', game);
    const sub:Subscription = gamePost.subscribe((game:Game)=>{
      this.gamesPostObservable.next(game);
      sub.unsubscribe();
    })
    return gamePost;
  }

  deleteGame(gameID: number): Observable<Game>{
    const gameDel : Observable<any> = this.http.delete(`/api/api/games/games.php?gameID=${gameID}`);
    const sub:Subscription = gameDel.subscribe((game: Game)=>{
      this.gameDeleteObservable.next(game);
      sub.unsubscribe();
    })
    return gameDel
  }

  patchGame(gameChanges: Partial<Game>): Observable<Game>{
    const gamePatch: Observable<any> = this.http.patch(`/api/api/games/games.php`, gameChanges)
    const sub:Subscription = gamePatch.subscribe((game:Game)=>{
      this.gamePatchObservable.next(game)
    })
    return gamePatch;
  }
  
  setUserXGames(){
    this.userXGameReq.subscribe(
      (userXgame: any):void=>
      {
        this.userXGames = userXgame.data;
        this.userXGamesObservable.next(this.userXGames);
      }
    )
      this.userXGamesObservable.next(this.userXGames);
  }

  postUserXGames(userXgame : UserXGame): Observable<UserXGame>{
    const userXGamePost : Observable<UserXGame> = this.http.post<UserXGame>('/api/api/usersXgames/usersXgames.php', userXgame);
    
    // const sub:Subscription = userXGamePost.subscribe((userXgame:UiUserXGame)=>{
    //   this.userXGamePostObservable.next(userXgame);
    //   console.log("userXgame", userXgame);
    //   sub.unsubscribe();
    // })
    return userXGamePost; 
  }

  deleteUserXGames(userXgameID : number): Observable<UserXGame>{
    const userXgameDel : Observable<any> = this.http.delete(`/api/api/usersXgames/usersXgames.php?userXgameID=${userXgameID}`);
    const sub:Subscription = userXgameDel.subscribe((userXgameID: UserXGame)=>{
      this.userXgameDeleteObservable.next(userXgameID);
      sub.unsubscribe();
    })
    return userXgameDel;
  }

  patchUserXGame(userXgameChanges: Partial<UserXGame>): Observable<UserXGame>{
    const userXGamePatch : Observable<any> = this.http.patch(`/api/api/usersXgames/usersXgames.php`, userXgameChanges);
    const sub:Subscription = userXGamePatch.subscribe((userXgame: UserXGame)=>{
      this.userXGamePatchObservable.next(userXgame);
      sub.unsubscribe();
    })
    return userXGamePatch;
  }
}
