import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { TableComponent } from "./table.component";
import { TableModule } from "./table.module";
import { action } from "@storybook/addon-actions";

export default {
    component: TableComponent,
    title: "Components/Table",
    decorators: [
        moduleMetadata({
            imports: [ TableModule ]
        })
    ]
} as Meta

const users = [
    { emailAddress: "han.solo@rebel-alliance.org", displayName: "Han Solo" },
    { emailAddress: "luke.skywalker@rebel-alliance.org", displayName: "Luke Skywalker" },
    { emailAddress: "www@ewok.com", displayName: "Wicket W. Warrick" },
    { emailAddress: "jabba@hutt.net", displayName: "Jabba the Hutt" },
    { emailAddress: "yoda@force.com", displayName: "Yoda" },
    { emailAddress: "c3po@droidnet.com", displayName: "C-3PO" },
    { emailAddress: "r2d2@robot.ai", displayName: "R2-D2" },
    { emailAddress: "padme@amidala.net", displayName: "Padmé Amidala" },
    { emailAddress: "obiwan@kenobi.com", displayName: "Obi-Wan Kenobi" },
    { emailAddress: "d.vader@galactic-empire.gov", displayName: "Darth Vader" }
];

const Template: Story = args => ({
    template: `
        <lens-table [source]="users" [totalRecords]="totalRecords" (onLazyLoad)="onLazyLoadData()" (onRowClick)="onRowClicked()" [loading]="isLoading">
            <columns>
                <column label="Name" field="displayName"></column>
                <column label="Email address" field="emailAddress"></column>
            </columns>
        </lens-table>`,
    props: {
        ...args,
        onLazyLoadData: action("onLazyLoad"),
        onRowClicked: action("onRowClicked")
    }
});

export const Default = Template.bind({});
Default.args = {
    users: users,
    totalRecords: 30,
    loading: false
}

const RowActionsTemplate: Story = args => ({
    template: `
        <lens-table [source]="users" [totalRecords]="totalRecords" (onLazyLoad)="onLazyLoadData()" (onRowClick)="onRowClicked()" [loading]="isLoading">
            <columns>
                <column label="Name" field="displayName"></column>
                <column label="Email address" field="emailAddress"></column>
            </columns>
            <row-actions>
                <action icon="pi pi-trash" label="Delete" (clicked)="onDeleteActionClicked($event)"></action>
            </row-actions>
        </lens-table>`,
    props: {
        ...args,
        onLazyLoadData: action("onLazyLoad"),
        onDeleteActionClicked: action("onDeleteActionClicked"),
        onRowClicked: action("onRowClicked")
    }
});

export const RowActions = RowActionsTemplate.bind({});
RowActions.args = {
    users: users,
    totalRecords: 30,
    loading: false
}