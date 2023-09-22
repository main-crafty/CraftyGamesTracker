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
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';

import { UserManagementComponent } from './user-management/user-management.component';
import { GameManagementComponent } from './game-management/game-management.component';
import { GameModificationComponent } from './game-modification/game-modification.component';
import { UserXgameAssociationComponent } from './user-xgame-association/user-xgame-association.component';
import { CreateUserComponent } from './user-management/create-user/create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateGameComponent } from './game-management/create-game/create-game.component';
import { AddAssociationComponent } from './user-xgame-association/add-association/add-association.component';




@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    GameManagementComponent,
    GameModificationComponent,
    UserXgameAssociationComponent,
    CreateUserComponent,
    CreateGameComponent,
    AddAssociationComponent,
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
    HttpClientModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatListModule,
    MatSelectModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
