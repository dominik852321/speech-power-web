import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { BasicModule } from '../../../shared/modules/basic.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../shared/services/auth.service';
import { catchError, finalize, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, BasicModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        localStorage.setItem('token', res);
        this.router.navigate(['/']);
        this.loading = false;
      },
      (err) => {
        this.snackBar.open('Niepoprawne hasło', 'Close', {
          duration: 3000,
        });
        this.loading = false;
      }
    );
  }
}
