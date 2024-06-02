import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { AuthService, _isAuthenticated } from '../../services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastService: CustomToastrService, private spinner: NgxSpinnerService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinner.show(SpinnerType.BallAtom);

    //const token: string = localStorage.getItem("accessToken");
    //token'ın expire olup olmadığını bilmek için 'auth0/angular-jwt' kütüphanesini yüklememiz lazım

    //const decodeToken = this.jwtHelper.decodeToken(token);
    //const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    //const expired: boolean = this.jwtHelper.isTokenExpired(token);

    //let expired: boolean;
    //try {
    //  expired = this.jwtHelper.isTokenExpired(token);
    //} catch {
    //  expired = true;
    //}

    if (!_isAuthenticated) {
      //login ekranına yönlendirme ve query params kısmı ile de token olmadığı için giremediği sayfaday login ekranına gittikten sonra başarılı giriş yaparsa eğer erişmek istediği sayfaya göndermek için.
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } }); //state url gitmek istenen component'in url'sini verir.
      this.toastService.message("Oturum açmanız gerekiyor", "Yetkisiz Erişim", {
        position: ToastrPosition.TopRight,
        messageType: ToastrMessageType.Warning
      });
    }

    this.spinner.hide(SpinnerType.BallAtom);
    return true;
  }

}
