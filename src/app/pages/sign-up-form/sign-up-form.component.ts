import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  faTwitter = faTwitter;
  isLoading: boolean = false;
  signupForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signup() {
    this.isLoading = true;

    this.authService.signup(this.signupForm.value)
      .subscribe((data: any) => {
        this.authService.fetchMe(data.jwt);
        this.signupForm.reset();
        this.isLoading = false;
        this.router.navigateByUrl('/home');
      })
  }

}
