import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faTimes, faCamera } from '@fortawesome/free-solid-svg-icons';
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
  @ViewChild('formImg') imgInput;
  faTimes = faTimes;
  faCamera = faCamera;
  isLoading: boolean = false;
  editForm: FormGroup;
  selectedProfileImgUrl: string | ArrayBuffer;

  get user() {
    return this.authService.user || {};
  }

  get profileImg() {      
    return this.selectedProfileImgUrl || this.authService.profileImg;
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      bio: new FormControl(this.user.bio || ''),
      location: new FormControl(this.user.location || ''),
      link: new FormControl(this.user.link || '')
    });
  }

  closeModal() {
    this.onCancel.emit();
  }

  setProfileImg() {
    const file = this.imgInput.nativeElement.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.selectedProfileImgUrl = reader.result;
    }

    reader.readAsDataURL(file);
  }

  sendEditForm(imgId: number = null) {
    const {user, jwt} = this.authService;
    const editForm = {...this.editForm.value};

    if (imgId) {
      editForm.profileImg = imgId;
    }

    this.http.put(`${env.baseURL}/users/${user.id}`, editForm, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    }).subscribe(data => {
      this.authService.fetchMe()
      this.onSuccess.emit();
      this.isLoading = false;
      this.imgInput.nativeElement.value = '';
      this.selectedProfileImgUrl = null;
    });
  }

  sendWithProfileImg() {
    const {jwt} = this.authService;
    const file = this.imgInput.nativeElement.files[0];

    const imgForm = new FormData();

    imgForm.append('files', file);

    this.http.post(`${env.baseURL}/upload`, imgForm, {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    }).subscribe((data) => {
      const uploadedFile = data[0];

      this.sendEditForm(uploadedFile.id);
    })
  }

  saveForm() {
    this.isLoading = true;
    const {user, jwt} = this.authService;

    if (this.selectedProfileImgUrl) {
      return this.sendWithProfileImg();
    }

    this.sendEditForm();
  }

}
