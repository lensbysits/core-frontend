import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { InputEmailComponent } from "./input-email.component";
import { InputEmailModule } from "./input-email.module";

const form: FormGroup = new FormGroup({
	email: new FormControl("", [])
});

export default {
	component: InputEmailComponent,
	title: "Components/InputEmail",
	decorators: [
		moduleMetadata({
			imports: [InputEmailModule, ReactiveFormsModule]
		})
	]
} as Meta;

const Template: Story = args => ({
	template: `<form [formGroup]="form">
                <lens-input-email
                    formControlName="email"
                    name="email"
                    [id]="id"
                    [icon]="icon"
                    [iconAlign]="iconAlign"
                    [placeholder]="placeholder"
                    [spinIcon]="spinIcon">
                </lens-input-email>
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
};

export const WithIcon = Template.bind({});
WithIcon.args = {
	id: "foo",
	icon: "search"
};
