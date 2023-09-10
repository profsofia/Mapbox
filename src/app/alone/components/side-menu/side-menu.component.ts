import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { route: '/maps/fullscreen', name: 'FullScreen' },
    { route: '/maps/markers', name: 'Markers' },
    { route: '/maps/properties', name: 'Properties' },
    { route: '/maps/zoom', name: 'ZoomRange' },
    { route: '/alone', name: 'AloneComponent' },
  ];
}
