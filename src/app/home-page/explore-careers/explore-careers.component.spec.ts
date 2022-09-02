import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreCareersComponent } from './explore-careers.component';

describe('ExploreCareersComponent', () => {
  let component: ExploreCareersComponent;
  let fixture: ComponentFixture<ExploreCareersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreCareersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreCareersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
