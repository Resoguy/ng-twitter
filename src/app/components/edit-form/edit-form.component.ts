import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import {environment as env} from 'src/environments/environment';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  @Output() onCancel = new EventEmitter();
  @Output() onSuccess = new EventEmitter();
  faTimes = faTimes;
  isLoading: boolean = false;
  editForm: FormGroup;

  get user() {
    return this.authService.user || {};
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.authService.user);
    this.editForm = new FormGroup({
      bio: new FormControl(this.user.bio || ''),
      location: new FormControl(this.user.location || ''),
      link: new FormControl(this.user.link || '')
    })
  }

  closeModal() {
    this.onCancel.emit();
  }

  saveForm() {
    this.isLoading = true;
    const {user, jwt} = this.authService;

    this.http.put(`${env.baseURL}/users/${user.id}`, this.editForm.value, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    }).subscribe(data => {
      this.authService.fetchMe()
      this.onSuccess.emit();
      this.isLoading = false;
    })
  }

}
