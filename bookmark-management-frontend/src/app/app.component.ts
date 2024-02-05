import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentRoute: string | null = null;
  isAuth: boolean | undefined = this.userService.isLoggedIn();

  user_fullname = signal('');

  user_data: {
    fullname: string | undefined;
    email: string | undefined;
  } = {
    fullname: undefined,
    email: undefined,
  };

  navLinks = [
    {
      url: 'bookmarks',
      icon: 'bookmark',
      title: 'Bookmarks',
    },
    {
      url: 'bookmark/create',
      icon: 'add',
      title: 'Add bookmark',
    },
    {
      url: 'profile',
      icon: 'person',
      title: 'Profile',
    },
  ];
  constructor(
    public router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    if (window.localStorage.getItem('token')) {
      this.userService.getMe().subscribe(
        (data: any) => {
          this.userService.fullname.set(data?.user?.fullname);
          this.userService.email.set(data.user.email);
          this.userService.isLoggedIn.set(true);
          //this.isAuth = window.localStorage.getItem('token') ? true : false;
          this.isAuth = this.userService.isLoggedIn();
          this.user_data.email = this.userService.email()!;
          this.user_data.fullname = this.userService.firstName()();
        },
        (err) => {
          this.userService.isLoggedIn.set(false);
          this.userService.fullname.set(undefined);
          this.userService.email.set(undefined);
        },
      );
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }
}
