import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswardComponent } from './forget-passward.component';

describe('ForgetPasswardComponent', () => {
  let component: ForgetPasswardComponent;
  let fixture: ComponentFixture<ForgetPasswardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPasswardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPasswardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
