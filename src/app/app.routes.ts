import { Routes } from '@angular/router';
import { FormComponent } from './pages/form/form.component';
import { HomeComponent } from './pages/home/home.component';
import { TranscriptionComponent } from './pages/transcription/transcription.component';
import { authGuard } from './shared/guard/auth.guard';
import { LoginComponent } from './pages/login/login/login.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'form', component: FormComponent, canActivate: [authGuard] },
  { path: 'transcription/list', component: TranscriptionComponent, canActivate: [authGuard] },
];
