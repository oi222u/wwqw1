import { Component } from '@angular/core';

import { footerItems } from './footer-static-data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  readonly footerItems = footerItems;
  panelOpenState: boolean = false;
  panelId: number = 0;
}
