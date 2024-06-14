import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl: string) { }

  

  start(hubUrl: string) {
    hubUrl = this.baseSignalRUrl + hubUrl;

    //başlatılmış bir hub dönecek.
      //hub oluşturacak olan builder
      const builder: HubConnectionBuilder = new HubConnectionBuilder();
      //builder üzerinden hub connection oluştur. withAutomaticReconnect ile otomatik bağlar.
      const hubConnection: HubConnection =
        builder.withUrl(hubUrl)
          .withAutomaticReconnect()
          .build();

      //connection'ı başlatırız
      hubConnection.start()
        .then(() => console.log("Connected"))
        //bağlantıda sorun varsa her 2 saniyede bir tetikleme yaparız
        .catch(error => setTimeout(() => this.start(hubUrl), 2000));



    //bağlantı kurulduktan sonra bağlantı kopacak veya kurulma süreci olacak veya bağlantıyı tekrardan kurmaya çalışırken istemeden bağlantı kopacak. bu durumları yönetmek için ->
    hubConnection.onreconnected(connectionId => console.log("Reconnected"));//connectionId'yi bize sağlar. istenilen işlemi yaparız.
    hubConnection.onreconnecting(error => console.log("Reconnecting"))//kopan bağlantının tekrardan bağlanma sürecinde olduğunu ifade eder.
    hubConnection.onclose(error => console.log("Close Reconnection"));//tekrar edilen bağlantının kurulamadığını söyler.
    //---
    return hubConnection;

  }

  invoke(hubUrl:string,procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
    //signalR üzerinden herhangi bir client'ın bir başka client'a mesaj göndermek istersek. event fırlatmak gibi.
    this.start(hubUrl).invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  ///'...' yaptığımızda c#'taki params'a karşılık gelir, bir dizi olarak tanımlar
  on(hubUrl:string,procedureName: string, callBack: (...message: any) => void) {
    //server'dan gelecek mesajların runtime'da anlık olarak yakalanmasını sağlar. temel alıcı fonksiyonları tanımlarız. gelen mesaja karşılık hangi event'in tetikleneceğini yazarız.
    this.start(hubUrl).on(procedureName, callBack);
  }
}
