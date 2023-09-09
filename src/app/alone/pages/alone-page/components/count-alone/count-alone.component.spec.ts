import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountAloneComponent } from './count-alone.component';

describe('CountAloneComponent', () => {
  let component: CountAloneComponent;
  let fixture: ComponentFixture<CountAloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CountAloneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountAloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
