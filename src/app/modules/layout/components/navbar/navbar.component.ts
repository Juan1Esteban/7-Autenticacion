import { Component } from '@angular/core';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  user$ = this.authS.user$;

  constructor(
    private authS: AuthService,
    private tokenS: TokenService,
    private router: Router
  ) {}

  logout() {
    this.authS.logout();
    this.router.navigate(['/login']);
  }

  isValidToken() {
    console.log(this.tokenS.isValidToken());
  }
}
