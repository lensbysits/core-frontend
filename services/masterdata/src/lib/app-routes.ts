import { Routes } from "@angular/router";
import {
  LoggerMessagesComponent,
  MasterdataDashboardComponent,
  MasterdatasDetailsComponent,
  MasterdatasEditFormComponent,
  MasterdatasListComponent,
  MasterdataTypeDetailsComponent,
  MasterdataTypeEditFormComponent,
  MasterdataTypeListComponent,
} from "./components";

export const masterdataRoutes: Routes = [
  {
    path: "",
    component: MasterdataDashboardComponent,
  },
  { path: "logs", component: LoggerMessagesComponent },
  // masterdata-type
  { path: "type", component: MasterdataTypeListComponent },
  { path: "type/details/:id", component: MasterdataTypeDetailsComponent },
  { path: "type/add", component: MasterdataTypeEditFormComponent },
  { path: "type/edit/:id", component: MasterdataTypeEditFormComponent },
  // masterdatas
  { path: "masterdatas", component: MasterdatasListComponent },
  { path: "masterdatas/add", component: MasterdatasEditFormComponent },
  { path: "masterdatas/:typeId/add", component: MasterdatasEditFormComponent },
  { path: "masterdatas/:typeId", component: MasterdatasListComponent },
  {
    path: "masterdatas/details/:typeId/:id",
    component: MasterdatasDetailsComponent,
  },
  {
    path: "masterdatas/:typeId/edit/:id",
    component: MasterdatasEditFormComponent,
  },
];
