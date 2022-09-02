import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MainSearchResultsComponent } from './main-search-results.component';

describe('MainSearchResultsComponent', () => {
  let component: MainSearchResultsComponent;
  let fixture: ComponentFixture<MainSearchResultsComponent>;
  let activatedRoute : jasmine.SpyObj<ActivatedRoute>;
  let searchField : jasmine.SpyObj<string>;

  beforeEach(async () => {
    activatedRoute = jasmine.createSpyObj<ActivatedRoute>(['params']);
    searchField = jasmine.createSpyObj<string>(['replace']);
    
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
      ],
      declarations: [ MainSearchResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
