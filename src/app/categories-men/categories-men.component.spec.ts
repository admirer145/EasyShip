import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesMenComponent } from './categories-men.component';

describe('CategoriesMenComponent', () => {
  let component: CategoriesMenComponent;
  let fixture: ComponentFixture<CategoriesMenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesMenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
