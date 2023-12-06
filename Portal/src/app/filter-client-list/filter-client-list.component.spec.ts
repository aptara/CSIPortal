import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterClientListComponent } from './filter-client-list.component';

describe('FilterClientListComponent', () => {
  let component: FilterClientListComponent;
  let fixture: ComponentFixture<FilterClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterClientListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
