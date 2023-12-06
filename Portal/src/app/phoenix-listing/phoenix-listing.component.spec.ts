import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoenixListingComponent } from './phoenix-listing.component';

describe('PhoenixListingComponent', () => {
  let component: PhoenixListingComponent;
  let fixture: ComponentFixture<PhoenixListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoenixListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoenixListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
