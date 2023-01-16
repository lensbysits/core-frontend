import { MenuItem } from "@lens/app-abstract";

export const menu: MenuItem[] = [
	{
		label: "Manage masterdata",
		items: [
			{ label: "Logs", icon: "pi pi-fw pi-home", routerLink: ["/logs"] },
			{
				label: "Masterdatas",
				icon: "pi pi-fw pi-briefcase",
				routerLink: ["/"]
			}
		]
	}
];
