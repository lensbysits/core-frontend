import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  HostBinding,
} from '@angular/core';
import { AppConfigurationService } from '@lens/app-abstract';
import screenfull from 'screenfull';
import { layoutDefaults, LayoutSettings, SettingsService } from '../../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @HostBinding('class') class = 'matero-header';

  @Input() showToggle = true;
  @Input() showBranding = false;

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();

  layoutSettings: LayoutSettings = layoutDefaults

  constructor(private settings: SettingsService) {
    this.layoutSettings = settings.getLayoutSettings();
  }

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
