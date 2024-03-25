import { Routes } from '@angular/router';
import { UploadComponent } from './pages/input/upload/upload.component';
import { HomeComponent } from './pages/home/home.component';
import { TranscriptionComponent } from './pages/transcription/transcription.component';
import { authGuard } from './shared/guard/auth.guard';
import { TranscriptionDetailsComponent } from './pages/transcription/transcription-details/transcription-details.component';
import { LoginComponent } from './pages/account/login/login.component';
import { QuestionsComponent } from './pages/input/questions/questions.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadComponent, canActivate: [authGuard] },
  { path: 'questions', component: QuestionsComponent, canActivate: [authGuard] },
  { path: 'transcription/list', component: TranscriptionComponent, canActivate: [authGuard] },
  { path: 'transcription/details/:id', component: TranscriptionDetailsComponent, canActivate: [authGuard] },
];
