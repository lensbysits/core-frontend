import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { DropdownComponent } from "./dropdown.component";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";

export default {
    component: DropdownComponent,
    title: "Components/Dropdown",
    decorators: [
        moduleMetadata({
            imports: [
                DropdownModule,
                BrowserAnimationsModule,
                FormsModule // FormsModule needs to imported or else writeValue() isn't called, giving unexpected results | https://github.com/storybookjs/storybook/issues/14643
            ]
        })
    ]
} as Meta

const Template: Story = args => {
    return {
        //template: "<form [formGroup]='form'><lens-dropdown [id]='id' [placeholder]='placeholder' [editable]='editable' [options]='options' [grouped]='grouped' formControlName='dropdown'></lens-dropdown></form>",
        props: {
            ...args
        }
    };
};

const options: any[] = [
    { value: 1, label: "Item 1" },
    { value: 2, label: "Item 2" },
    { value: 3, label: "Item 3" },
    { value: 4, label: "Item 4" },
    { value: 5, label: "Item 5" }
];

const groupedOptions: any = [
    { value: "group1", label: "Group 1", items: [
        { value: 1, label: "Item 1" },
        { value: 2, label: "Item 2" },
        { value: 3, label: "Item 3" },
        { value: 4, label: "Item 4" },
        { value: 5, label: "Item 5" }
    ] },
    { value: "group2", label: "Group 2", items: [
        { value: 6, label: "Item 6" },
        { value: 7, label: "Item 7" },
        { value: 8, label: "Item 8" },
        { value: 9, label: "Item 9" },
        { value: 10, label: "Item 10" }    
    ] },
    { value: "group3", label: "Group 3", items: [
        { value: 11, label: "Item 11" },
        { value: 12, label: "Item 12" },
        { value: 13, label: "Item 13" },
        { value: 14, label: "Item 14" },
        { value: 15, label: "Item 15" }
    ] }
];

export const Default = Template.bind({});
Default.args = {
    id: "foo",
    options: options,
    placeholder: "test"
}

export const Grouped = Template.bind({});
Grouped.args = {
    id: "foo",
    options: groupedOptions,
    placeholder: "test",
    grouped: true
}

export const Editable = Template.bind({});
Editable.args = {
    id: "foo",
    options: options,
    placeholder: "test",
    editable: true
}