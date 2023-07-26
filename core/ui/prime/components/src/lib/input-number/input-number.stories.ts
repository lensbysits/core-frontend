import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Meta, Story, moduleMetadata } from "@storybook/angular";
import { InputNumberComponent } from "./input-number.component";
import { InputNumberModule } from "./input-number.module";

const form: FormGroup = new FormGroup({
	text: new FormControl("", [])
});

export default {
	component: InputNumberComponent,
	title: "Components/InputNumber",
	decorators: [
		moduleMetadata({
			imports: [InputNumberModule, ReactiveFormsModule]
		})
	]
} as Meta;

const Template: Story = args => ({
	template: `<form [formGroup]="form">
                <lens-input-number
                    formControlName="text"
                    name="number"
                    [id]="id"
                    [icon]="icon"
                    [iconAlign]="iconAlign"
                    [placeholder]="placeholder"
                    [spinIcon]="spinIcon"
					[min]="min"
					[max]="max"
					[step]="step">
                </lens-input-number>
                </form>`,
	props: {
		...args,
		form: form
	}
});

export const Default = Template.bind({});
Default.args = {
	id: "foo",
	placeholder: "test",
	min: 1,
	max: 10,
	step: 1
};

export const WithIcon = Template.bind({});
WithIcon.args = {
	id: "foo",
	placeholder: "test",
	icon: "search",
	iconAlign: "right",
	min: 10,
	max: 50,
	step: 10
};
