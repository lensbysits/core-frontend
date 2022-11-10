import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lens-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() public label = "";
  @Input() public type: "primary" | "secondary" | "success" | "info" | "warning" | "danger" = "primary";
  @Output() public clicked = new EventEmitter();
  @Input() public icon = "";
}