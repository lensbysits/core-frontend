import { Component, Input } from '@angular/core';

@Component({
  selector: 'lens-icon',
  templateUrl: './lens-icon.component.html',
  styleUrls: ['./lens-icon.component.scss'],
})
export class LensIconComponent {
  @Input()
  icon = 'star';
}
