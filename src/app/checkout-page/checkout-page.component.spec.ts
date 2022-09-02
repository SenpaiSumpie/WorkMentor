import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CheckoutPageComponent } from './checkout-page.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { IterableDiffers } from '@angular/core';

describe('CheckoutPageComponent', () => {
  let component: CheckoutPageComponent;
  let fixture: ComponentFixture<CheckoutPageComponent>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  const params = new BehaviorSubject({
    mentorId: 1,
    package: 'basic',
  });

  beforeEach(async () => {
    activatedRoute = jasmine.createSpyObj<ActivatedRoute>(['params']);
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);

    await TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
            RouterTestingModule,
            ToastrModule.forRoot(),
        ],
      declarations: [CheckoutPageComponent],
      providers : [
        {provide: ActivatedRoute, useValue: {params: params}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should requestMentorship', () => {
    component.requestMentorShip();
  });
});
