import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCareersComponent } from './popular-careers.component';

describe('PopularCareersComponent', () => {
  let component: PopularCareersComponent;
  let fixture: ComponentFixture<PopularCareersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularCareersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularCareersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
