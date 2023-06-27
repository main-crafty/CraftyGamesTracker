import { NgModule, Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';

import { UserManagementComponent } from './user-management/user-management.component';
import { GameManagementComponent } from './game-management/game-management.component';
import { GameModificationComponent } from './game-modification/game-modification.component';
import { UserXgameAssociationComponent } from './user-xgame-association/user-xgame-association.component';




@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    GameManagementComponent,
    GameModificationComponent,
    UserXgameAssociationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    NgFor,
    NgIf,
    MatButtonModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
