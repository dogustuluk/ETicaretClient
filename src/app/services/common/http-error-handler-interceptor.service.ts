import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("Erişilmek istenen sayfaya yetkiniz bulunmamaktadır", "Yetkisiz İşlem", {
            messageType: ToastrMessageType.Info,
            position: ToastrPosition.BottomFullWidth
          });

          //refresh token
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data => {

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
      return of(error);
    }));

  }
}
