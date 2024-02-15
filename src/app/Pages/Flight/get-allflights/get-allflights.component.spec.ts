import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetALLFLightsComponent } from './get-allflights.component';

describe('GetALLFLightsComponent', () => {
  let component: GetALLFLightsComponent;
  let fixture: ComponentFixture<GetALLFLightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetALLFLightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetALLFLightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
