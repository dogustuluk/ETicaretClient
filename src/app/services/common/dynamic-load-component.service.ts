import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
  /*uygulama uzerinde dinamik olarak yuklemek istedigimiz componentlerde kullaniriz.*/
/*ViewContainerRef: bu turden bir nesne ile bir container olusturuyoruz ve bu container iceirisnde dinamik olarak olusturulacak olan bilesenimizi barindiriyoruz. --> dikkat edilmesi gereken nokta ise her bir dinamik yukleme esnasinda onceki view'leri clear etmemiz gerekmektedir.
 * createComponent ile bizim Component'imize karsilik bir referans olusturuyoruz(burda basket component icin)
 * ComponentFactory ; Component'lerin instance'larini olusturmak icin kullaniriz.
 * ComponentFactoryResolver ; belirli bir component icin ComponentFactory'i resolve eden siniftir.resolveComponentFactory fonksiyonu araciligiyla ilgili component'e dair bir ComponentFactory nesnesi olusturup doner.
 */
export class DynamicLoadComponentService {

  constructor() { }

  async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef) {
    let _component: any = null;

    switch (component) {
      case ComponentType.BasketsComponent:
        _component = (await import("../../ui/components/basket/basket.component")).BasketComponent;
        break;

      default:
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component)
  }
}

export enum ComponentType {
  BasketsComponent
}
