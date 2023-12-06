import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseMenusComponent } from './collapse-menus.component';

describe('CollapseMenusComponent', () => {
  let component: CollapseMenusComponent;
  let fixture: ComponentFixture<CollapseMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapseMenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollapseMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
