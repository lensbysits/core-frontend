import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { InputTextComponent } from "./input-text.component";
import { InputTextModule } from "primeng/inputtext";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

const form: FormGroup = new FormGroup({
    text: new FormControl("", []),
});

export default {
    component: InputTextComponent,
    title: "Components/InputText",
    decorators: [
        moduleMetadata({
            imports: [ InputTextModule, ReactiveFormsModule ]
        })
    ]
} as Meta

const Template: Story = args => ({
    template:  `<form [formGroup]="form">
                <lens-input-text
                    formControlName="text"
                    name="text"
                    [id]="id"
                    [icon]="icon"
                    [iconAlign]="iconAlign"
                    [placeholder]="placeholder"
                    [spinIcon]="spinIcon">
                </lens-input-text>
                </form>`,
    props: {
        ...args,
        form: form
    }
});

export const Default = Template.bind({});
Default.args = {
    id: "foo",
    placeholder: "test"
}

export const WithIcon = Template.bind({});
WithIcon.args = {
    id: "foo",
    icon: "search"
}