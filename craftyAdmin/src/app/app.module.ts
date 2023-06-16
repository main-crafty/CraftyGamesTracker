import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { UserManagementComponent } from './user-management/user-management.component';
import { GameManagementComponent } from './game-management/game-management.component';
import { UserXgameAssociationComponent } from './user-xgame-association/user-xgame-association.component';
import { GameModificationComponent } from './game-modification/game-modification.component';



@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    GameManagementComponent,
    UserXgameAssociationComponent,
    GameModificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
