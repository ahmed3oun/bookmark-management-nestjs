import { Component, OnInit } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formData: {
    login: string;
    password: string;
  } = {
    login: '',
    password: '',
  };

  constructor(
    private readonly authService: AuthService,
    private toastController: ToastController,
  ) {}

  ngOnInit() {}

  async presentToast(
    position: 'top' | 'middle' | 'bottom',
    color: 'success' | 'danger' | 'warning',
    text: string | undefined,
  ) {
    const toast = await this.toastController.create({
      color: color,
      message: text,
      duration: 2000,
      position: position,
    });

    await toast.present();
  }

  submit() {
    return this.authService
      .login({
        email: this.formData.login,
        password: this.formData.password,
      })
      .subscribe(
        (data) => {
          console.log({
            data,
          });

          window.localStorage.clear();
          window.localStorage.setItem('token', data?.['user']?.token);
          this.presentToast('bottom', 'success', data?.['message']);
          setTimeout(() => {
            this.reloadPage();
          }, 1000);
        },
        (error) => {
          this.presentToast('bottom', 'danger', error?.message);
        },
      );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
