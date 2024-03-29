import { Routes } from "@angular/router";
import {
	MasterdatasDetailsComponent,
	MasterdatasEditFormComponent,
	MasterdatasListComponent,
	MasterdataTypeDetailsComponent,
	MasterdataTypeEditFormComponent,
	MasterdataTypeListComponent
} from "./components";

export const masterdataRoutes: Routes = [
	{ path: "", component: MasterdataTypeListComponent },
	// masterdata-type
	{ path: "add", component: MasterdataTypeEditFormComponent },
	{
		path: ":masterdatatype",
		children: [
			{ path: "", component: MasterdatasListComponent },
			{ path: "details", component: MasterdataTypeDetailsComponent },
			{ path: "edit", component: MasterdataTypeEditFormComponent },

			// masterdata
			{ path: "add", component: MasterdatasEditFormComponent },
			{
				path: ":masterdata",
				children: [
					{ path: "", component: MasterdatasDetailsComponent },
					{ path: "edit", component: MasterdatasEditFormComponent }
				]
			}
		]
	}
];
