import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateItemBottomSheetComponent } from './create-item-bottom-sheet.component';

describe('CreateItemBottomSheetComponent', () => {
  let component: CreateItemBottomSheetComponent;
  let fixture: ComponentFixture<CreateItemBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateItemBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateItemBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
