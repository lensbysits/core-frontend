import { MenuItem } from '@lens/app-abstract';

export const menu: MenuItem[] = [
  {
    label: 'Manage masterdata',
    items: [
      { label: 'Type', icon: 'pi pi-fw pi-home', routerLink: ['/type'] },
      {
        label: 'Masterdatas',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/masterdatas'],
      },
    ],
  },
];
