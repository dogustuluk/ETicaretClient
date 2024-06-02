import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { DialogService } from '../../services/common/dialog.service';
import { HttpClientService } from '../../services/common/http-client.service';
import { ProductService } from '../../services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor
    (
      private element: ElementRef,
      private _renderer: Renderer2,
      private httpClientService: HttpClientService,
      private spinner: NgxSpinnerService,
      public dialog: MatDialog,
      private alertifyService: AlertifyService,
      private dialogService: DialogService
    ) {
    //icon'un gösterilmesi +
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/bin.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 32;
    img.height = 32;
    _renderer.appendChild(element.nativeElement, img);
    //icon'un gösterilmesi -
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();//tabloyu delete işlemi sonrasında tekrar yüklemek için.



  @HostListener("click") //-> bunu yazarak; bu fonksiyonun devreye girme şeklini belirtiyoruz. burda ne zaman bu directive'in kullanıldığı nesneye tıklanılırsa bu devreye girecek.
  async onclick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallAtom);
        //silme işleminin yapıldığı satıra ihtiyaç var.
        const td: HTMLTableCellElement = this.element.nativeElement;
        this.httpClientService.delete({
          controller: this.controller
        }, this.id).subscribe(data => {
          $(td.parentElement).animate({
            opacity: 0,
            left: "+=50",
            height: "toogle"
          }, 700, () => {
            this.callback.emit();
            this.alertifyService.message("Silme işlemi başarıyla gerçekleştirildi", {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            })
          });
        }, (errorResponse: HttpErrorResponse) => {
          this.spinner.hide(SpinnerType.BallAtom);
          this.alertifyService.message("Silme işleminde bir hata ile karşılaşıldı, lütfen daha sonra tekrar deneyiniz.", {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          })
        });
      }
    });
  }
}
