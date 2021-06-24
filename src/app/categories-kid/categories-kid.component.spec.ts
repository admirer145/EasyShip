import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesKidComponent } from './categories-kid.component';

describe('CategoriesKidComponent', () => {
  let component: CategoriesKidComponent;
  let fixture: ComponentFixture<CategoriesKidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesKidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesKidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
