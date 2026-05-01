import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqContainer } from './faq.container';

describe('FaqContainer', () => {
  let component: FaqContainer;
  let fixture: ComponentFixture<FaqContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqContainer]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaqContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
