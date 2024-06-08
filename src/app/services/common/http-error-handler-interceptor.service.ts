import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, of } from 'rxjs';
import { SpinnerType } from '../../base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService, private router: Router, private spinner: NgxSpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          
          //refresh token --> daha sonra optimize edilecektir
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state => {
            if (!state) {
              const url = this.router.url;
              if (url == "/products")
                this.toastrService.message("Sepete ürün eklemek için oturum açmanız gerekmektedir", "Oturum Açınız", {
                  messageType: ToastrMessageType.Warning,
                  position: ToastrPosition.TopRight
                });
              else
                this.toastrService.message("Erişilmek istenen sayfaya yetkiniz bulunmamaktadır", "Yetkisiz İşlem", {
                  messageType: ToastrMessageType.Info,
                  position: ToastrPosition.BottomFullWidth
                });

            }
          })).then(data => {

          });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucu hatası oluştu, lütfen daha sonra tekrar deneyiniz", "Sunucu Hatası", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek, lütfen girdiğiniz bilgileri kontrol ediniz", "Hatalı İstek", {
            messageType: ToastrMessageType.Info,
            position: ToastrPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Erişmek istediğiniz sayfa bulunamadı", "Sayfa Bulunamadı", {
            messageType: ToastrMessageType.Info,
            position: ToastrPosition.BottomFullWidth
          });
          break;

        default:
          this.toastrService.message("Hata!", "Hata", {
            messageType: ToastrMessageType.Info,
            position: ToastrPosition.BottomFullWidth
          });
      }

      this.spinner.hide(SpinnerType.BallAtom);
      return of(error);
    }));

  }
}
