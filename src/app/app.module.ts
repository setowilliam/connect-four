import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatListModule, MatCardModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { GridComponent } from './grid/grid.component';
import { HeaderComponent } from './header/header.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ContentComponent } from './content/content.component';
@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    HeaderComponent,
    ChatWindowComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatGridListModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatListModule, MatCardModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
