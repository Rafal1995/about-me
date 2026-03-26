import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveBackground } from './interactive-background';

describe('InteractiveBackground', () => {
  let component: InteractiveBackground;
  let fixture: ComponentFixture<InteractiveBackground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveBackground]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractiveBackground);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
