import { Routes } from "@angular/router";
import { 
    MasterdataComponent, 
    MdataDetailsComponent, 
    MdataEditFormComponent, 
    MdataListComponent, 
    MdtDetailsComponent, 
    MdtEditFormComponent, 
    MdtListComponent } from "./components";


export const masterdataRoutes: Routes = [
    {
        path: '',
        component: MasterdataComponent,
    },
    {
        path: 'masterdatatypes',
        component: MdtListComponent,
        children: [
            { path: 'details/:id', component: MdtDetailsComponent },
            { path: 'add', component: MdtEditFormComponent },
            { path: 'edit/:id', component: MdtEditFormComponent },
          ]
    },
    {
        path: 'masterdatas',
        component: MdataListComponent,
        children: [
            { path: 'add', component: MdataEditFormComponent },
            { path: ':typeId/add', component: MdataEditFormComponent },
            { path: ':typeId', component: MdataListComponent },
            { path: 'details/:typeId/:id', component: MdataDetailsComponent },
            { path: ':typeId/edit/:id', component: MdataEditFormComponent },
          ]
    },
]