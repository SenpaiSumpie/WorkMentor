import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { MentorPageContentComponent } from './mentor-page-content.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MentorPageContentComponent', () => {
  let component: MentorPageContentComponent;
  let fixture: ComponentFixture<MentorPageContentComponent>;
  let activatedRoute : jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    activatedRoute = jasmine.createSpyObj<ActivatedRoute>(['params']);

    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,    
        RouterTestingModule,
      ],
      declarations: [ MentorPageContentComponent ],
      providers:[
        
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
