import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadDialogComponent } from './file-upload-component.component';

describe('FileUploadDialogComponent', () => {
  let component: FileUploadDialogComponent;
  let fixture: ComponentFixture<FileUploadDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadDialogComponent]
    });
    fixture = TestBed.createComponent(FileUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
