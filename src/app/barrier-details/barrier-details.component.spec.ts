import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrierDetailsComponent } from './barrier-details.component';

describe('BarrierDetailsComponent', () => {
  let component: BarrierDetailsComponent;
  let fixture: ComponentFixture<BarrierDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarrierDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarrierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
