import { ComponentFixture, TestBed } from '@angular/core/testing';

import { bookatContainer } from './bookat.container';

describe('bookatContainer', () => {
  let component: bookatContainer;
  let fixture: ComponentFixture<bookatContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [bookatContainer]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(bookatContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
