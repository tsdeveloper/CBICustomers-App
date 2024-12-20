import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskPipe, NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule, NgxMaskPipe, NgxMaskDirective
  ],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';
  @Input() mask!: string;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }
  get control() {
    return this.controlDir.control as FormControl
  }

}
