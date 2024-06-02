import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from '../../../contracts/create_product';
import { List_Product } from '../../../contracts/list_product';
import { List_Product_Image } from '../../../contracts/list_product_image';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  //interface oluşturup create yaparsak daha doğru olur ama şimdilik burda yapmıyoruz bunu.
  create(product: Create_Product, successCallback?: () => void, errorCallback?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products",
    }, product)
      .subscribe(result => {
        successCallback();
        //alert("başarılı"); alertify ile verince gerek kalmadı
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error; //varolan hataları getirecek.
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallback(message);
      });
  }

  //list için read metodu yazılır.
  async read(page: number = 0, size: number = 5, successCallback?: () => void, errorCallback?: (errorMessage: string) => void): Promise<{ totalCount: number, products: List_Product[] }> {
    //toPromise ile await kullanılabilir; gelecek datayı bekleyebilirim -> c#'taki task'lara benziyor
    //await this ile başlarsak yani await eklersek callback fonksiyonlarını yazamayız bunun yerine farklı bir kurguda ilerleriz:const 
    const promiseData: Promise<{ totalCount: number, products: List_Product[] }> = this.httpClientService.get<{ totalCount: number, products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(a => successCallback())
      .catch((errorResponse: HttpErrorResponse) => errorCallback(errorResponse.message))

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "products",
    }, id);

    await firstValueFrom(deleteObservable);
  }

  async readImages(id: string, successCalback?: () => void): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      action: "getproductimages",
      controller: "products"
    }, id);

    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCalback();
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallback?: () => void) {
    const deleteObservable = this.httpClientService.delete({
      controller: "products",
      action: "deleteproductimage",
      queryString: `imageId=${imageId}`,
    }, id);
    await firstValueFrom(deleteObservable);
    successCallback();
  }

}
