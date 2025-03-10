import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Meta, Story, moduleMetadata } from "@storybook/angular";
import { InputSliderComponent } from "./input-slider.component";
import { InputSliderModule } from "./input-slider.module";

const form: FormGroup = new FormGroup({
	text: new FormControl("", [])
});

export default {
	component: InputSliderComponent,
	title: "Components/InputSlider",
	decorators: [
		moduleMetadata({
			imports: [InputSliderModule, ReactiveFormsModule]
		})
	]
} as Meta;

const Template: Story = (args) => ({
	template: `<form [formGroup]="form">
                <lens-input-slider
                    formControlName="text"
                    name="slider"
                    [id]="id"
                    [icon]="icon"
                    [iconAlign]="iconAlign"
                    [placeholder]="placeholder"
                    [spinIcon]="spinIcon"
					[min]="min"
					[max]="max"
					[step]="step">
                </lens-input-slider>
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
