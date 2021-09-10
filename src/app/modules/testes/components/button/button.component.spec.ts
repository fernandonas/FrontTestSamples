import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check if the function was called by clicking the button.', () => {
    // Create spyon of function.
    spyOn(component, 'functionToCall');

    // Simulate button click
    fixture.debugElement.nativeElement.getElementsByTagName('button')[0].click();

    // Check if function was called.
    expect(component.functionToCall).toHaveBeenCalled();
  });

  it('Funtion functionToCall should call console.log ', () => {
    spyOn(window.console, 'log');
    component.functionToCall();
    expect(window.console.log).toHaveBeenCalledOnceWith("Função foi chamada!!")
  })
});
