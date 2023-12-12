import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

export const canreadGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const helper = new JwtHelperService()
  if (localStorage.getItem('JWT') != null) {
    // @ts-ignore
    const roles = helper.decodeToken(localStorage.getItem("JWT"));
    if(roles.roles.indexOf('can_read') > -1){
      return true;
    }
  }
  alert("Nemate dozvolu za pregled postojecih korisnika");
  return false;
};
