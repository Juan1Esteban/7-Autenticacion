import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

import * as jwt_decode from "jwt-decode";
import { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    setCookie('token-trello', token, { expires: 1, path: '/' });
  }

  getToken() {
    const token = getCookie('token-trello');
    return token;
  }

  removeToken() {
    removeCookie('token-trello');
  }

  isValidToken() {
    const token = this.getToken();
      if (!token) {
        return false;
      }
      const decodeToken = jwt_decode.jwtDecode<JwtPayload>(token);
      if(decodeToken && decodeToken?.exp) {
        const tokenDate = new Date(0);
        tokenDate.setUTCSeconds(decodeToken.exp);
        const today = new Date();
        return tokenDate.getTime() > today.getTime();
      }
      return false;
  }

  // Refresh Token
  saveRefreshToken(RefreshToken: string) {
    setCookie('RefreshToken-trello', RefreshToken, { expires: 1, path: '/' });
  }

  getRefreshToken() {
    const RefreshToken = getCookie('RefreshToken-trello');
    return RefreshToken;
  }

  removeRefreshToken() {
    removeCookie('RefreshToken-trello');
  }

  isValidRefreshToken() {
    const Refreshtoken = this.getRefreshToken();
      if (!Refreshtoken) {
        return false;
      }
      const decodeRefreshToken = jwt_decode.jwtDecode<JwtPayload>(Refreshtoken);
      if(decodeRefreshToken && decodeRefreshToken?.exp) {
        const tokenDate = new Date(0);
        tokenDate.setUTCSeconds(decodeRefreshToken.exp);
        const today = new Date();
        return tokenDate.getTime() > today.getTime();
      }
      return false;
  }

}
