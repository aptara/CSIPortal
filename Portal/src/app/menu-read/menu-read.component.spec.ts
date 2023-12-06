import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReadComponent } from './menu-read.component';

describe('MenuReadComponent', () => {
  let component: MenuReadComponent;
  let fixture: ComponentFixture<MenuReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
