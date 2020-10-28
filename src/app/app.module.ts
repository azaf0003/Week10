import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddactorComponent } from './addactor/addactor.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { ListactorsComponent } from './listactors/listactors.component';
import { ListmoviesComponent } from './listmovies/listmovies.component';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseService } from './database.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const week10Routes:Routes=[
  {path: 'addactor', component: AddactorComponent},
  
  {path: 'addmovie', component: AddmovieComponent},
  
  {path: 'listactors', component: ListactorsComponent},
  
  {path: 'listmovies', component: ListmoviesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AddactorComponent,
    AddmovieComponent,
    ListactorsComponent,
    ListmoviesComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(week10Routes, { useHash: true}), HttpClientModule, FormsModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
