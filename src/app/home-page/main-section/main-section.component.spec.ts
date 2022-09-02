import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { MainSectionComponent } from './main-section.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

describe('MainSectionComponent', () => {
  let mainSectionComponent: MainSectionComponent,
    httpTestingController: HttpTestingController,
    // !! change this line to this
    toastrService: jasmine.SpyObj<ToastrService>,
    notificationServiceSpy: any;

  beforeEach(async () => {
    // !! add a new spy object before each test, now toastrService is not undefined
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [],
      providers: [
       // !! provide NotificationService to the TestBed module because it is under test
       MainSectionComponent,
       { provide: ToastrService, useValue: toastrService }],
    }).compileComponents();
    mainSectionComponent = TestBed.inject(MainSectionComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    // !! don't need the below line, we already have access to the spy object
    // toastrService = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(mainSectionComponent).toBeTruthy();
  });

  it('should test "showToast" method', () => {
    // !! you should not spyOn this anymore, toastrService has methods error
    // and success now which are both spies.
    // spyOn(toastrService, 'success').and.callThrough();
    // !! call the method
    mainSectionComponent.showToast();
    expect(toastrService.success).toHaveBeenCalledWith("Hello, I'm the toastr message.", "This title?", { timeOut: 5000, progressBar: true, closeButton: true });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
