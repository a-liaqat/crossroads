import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from 'src/app/main/main.component';
import { HintsComponent } from 'src/app/hints/hints.component';
import { AudioComponent } from 'src/app/audio/audio.component';
import { StoryComponent } from 'src/app/story/story.component';
import { BookComponent } from 'src/app/book/book.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main/:id', component: MainComponent },
  { path: 'hints/:id', component: HintsComponent },
  { path: 'audio', component: AudioComponent },
  { path: 'story', component: StoryComponent },
  { path: 'book', component: BookComponent },
  { path: '**',  component: MainComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
