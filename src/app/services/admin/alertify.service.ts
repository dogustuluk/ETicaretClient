import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root' //dependency injection ile kullanmak için
})
export class AlertifyService {
  constructor() { }

  // message(message: string, messageType: MessageType, position: Position, delay: number = 3, dismissOthers: boolean = false)
  message(message: string, options:Partial<AlertifyOptions>){
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position', options.position);
    const msg = alertify[options.messageType](message);
    if(options.dismissOthers)
      msg.dismissOthers();
  }

  dismiss(){
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: Position = Position.TopRight;
  delay: number = 3;
  dismissOthers: boolean = false;

}


export enum MessageType
{
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}


export enum Position
{
  TopLeft = "top-left",
  TopCenter ="top-center",
  TopRight = "top-right",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"

}
