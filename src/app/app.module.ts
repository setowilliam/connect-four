import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatListModule, MatCardModule, MatDialogModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { GridComponent } from './grid/grid.component';
import { HeaderComponent } from './header/header.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { GameComponent } from './game/game.component';
import { DialogComponent } from './dialog/dialog.component';
import { LobbyComponent } from './lobby/lobby.component';
import { ContentComponent } from './content/content.component';
import { ChatUsersComponent } from './chat-users/chat-users.component';
@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    HeaderComponent,
    ChatWindowComponent,
    GameComponent,
    DialogComponent,
    LobbyComponent,
    ContentComponent,
    ChatUsersComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatGridListModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatListModule, MatCardModule, MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
