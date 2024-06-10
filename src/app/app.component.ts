import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { AuthService } from './services/common/auth.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { HttpClientService } from './services/common/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';

declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //directive'in referansini olustur.
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective; //directive referansindan bir degisken


  constructor(public authService: AuthService, private toastrService: CustomToastrService, private router: Router, private httpclient: HttpClientService, private dynamicLoadComponentService: DynamicLoadComponentService) {

    authService.identityCheck();

  }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();

    this.toastrService.message("Çıkış Yapıldı", "Oturum Bilgisi", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight
    });
    this.router.navigate([""]);
  }

  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }
}
