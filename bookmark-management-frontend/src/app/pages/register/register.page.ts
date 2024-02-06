import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formData: {
    email: string | undefined;
    password: string | undefined;
    confirm_password: string | undefined;
    fullname: string | undefined;
  } = {
    email: undefined,
    password: undefined,
    confirm_password: undefined,
    fullname: undefined,
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

  async submit() {
    if (this.formData.password === this.formData.confirm_password) {
      return this.authService
        .signup({
          email: this.formData.email!,
          fullname: this.formData.fullname!,
          password: this.formData.password!,
        })
        .subscribe(
          (data) => {
            console.log({
              data,
            });

            window.localStorage.clear();

          },
          (error) => {
            this.presentToast('bottom', 'danger', error?.message);
          },
        );
    }
    return;
  }

  reloadPage(): void {
    window.location.reload();
  }
}
