import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-create-bookmark',
  templateUrl: './create-bookmark.page.html',
  styleUrls: ['./create-bookmark.page.scss'],
})
export class CreateBookmarkPage implements OnInit {
  formData: {
    title: string | undefined;
    link: string | undefined;
    description: string | undefined;
  } = {
    title: undefined,
    link: undefined,
    description: undefined,
  };

  constructor(
    private readonly bookmarkService: BookmarkService,
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
      return this.bookmarkService
        .create({
          title: this.formData.title!,
          link: this.formData.link!,
          description: this.formData.description
        })
        .subscribe(
          (data: any) => {
            this.presentToast('bottom', 'success', data?.message);
          },
          (error) => {
            this.presentToast('bottom', 'danger', error?.message);
          },
        );

  }
}
