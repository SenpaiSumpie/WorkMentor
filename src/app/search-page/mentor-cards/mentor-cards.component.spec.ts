import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MentorCardsComponent } from './mentor-cards.component';

describe('MentorCardsComponent', () => {
  let component: MentorCardsComponent;
  let fixture: ComponentFixture<MentorCardsComponent>;
  let activatedRoute : jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    activatedRoute = jasmine.createSpyObj<ActivatedRoute>(['params']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [ MentorCardsComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
