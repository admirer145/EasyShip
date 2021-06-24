import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesWomenComponent } from './categories-women.component';

describe('CategoriesWomenComponent', () => {
  let component: CategoriesWomenComponent;
  let fixture: ComponentFixture<CategoriesWomenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesWomenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesWomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
