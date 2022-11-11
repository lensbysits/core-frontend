import { MenuItem } from "@lens/app-abstract";

export const menu: MenuItem[] = [
    {
        label: 'Manage masterdata',
        items: [
            { label: 'Types', icon: 'pi pi-fw pi-home', routerLink: ['/masterdatatypes'] },
            { label: 'Masterdata', icon: 'pi pi-fw pi-briefcase', routerLink: ['/masterdatas'] }
        ]
    }
];