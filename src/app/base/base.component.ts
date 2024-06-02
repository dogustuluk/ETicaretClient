import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

//bir nevi class bu, component değil, bu sadece component'lerimin belirli özelliklerini içerisinde barındıracak.
export class BaseComponent {
  constructor(private spinner : NgxSpinnerService){}

  showSpinner(spinnerNameType : SpinnerType){
    this.spinner.show(spinnerNameType);

    //setTimeout(() => this.hideSpinner(spinnerNameType),2000);
  }

  hideSpinner(spinnerNameType : SpinnerType){
    this.spinner.hide(spinnerNameType);
  }
}

export enum SpinnerType
{
  BallAtom = "s1",
  BallScaleMultiple = "s2",
  BallSpinFadeRotating = "s3"
}
