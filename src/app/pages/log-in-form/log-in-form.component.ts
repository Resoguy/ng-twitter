import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss']
})
export class LogInFormComponent implements OnInit {
  faTwitter = faTwitter;
  isLoading: boolean = false;
  loginForm = new FormGroup({
    identifier: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  login() {
    this.isLoading = true;

    this.authService.login(this.loginForm.value)
      .subscribe((data: any) => {
        this.authService.fetchMe(data.jwt, () => {
            this.loginForm.reset();
            this.isLoading = false;
            this.router.navigateByUrl('/home');
        })
      })
  }

}
