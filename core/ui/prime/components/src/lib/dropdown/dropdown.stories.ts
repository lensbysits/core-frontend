import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { DropdownComponent } from "./dropdown.component";
import { DropdownModule } from "primeng/dropdown";
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

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
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const form = new FormGroup({
	dropdown: new FormControl()
});

const Template: Story = (args) => {
	return {
		props: {
			...args
		}
	};
};

type Option = { value: string | number; label: string; items?: Option[] };

const options: Option[] = [
	{ value: 1, label: "Item 1" },
	{ value: 2, label: "Item 2" },
	{ value: 3, label: "Item 3" },
	{ value: 4, label: "Item 4" },
	{ value: 5, label: "Item 5" }
];

const groupedOptions: Option[] = [
	{
		value: "group1",
		label: "Group 1",
		items: [
			{ value: 1, label: "Item 1" },
			{ value: 2, label: "Item 2" },
			{ value: 3, label: "Item 3" },
			{ value: 4, label: "Item 4" },
			{ value: 5, label: "Item 5" }
		]
	},
	{
		value: "group2",
		label: "Group 2",
		items: [
			{ value: 6, label: "Item 6" },
			{ value: 7, label: "Item 7" },
			{ value: 8, label: "Item 8" },
			{ value: 9, label: "Item 9" },
			{ value: 10, label: "Item 10" }
		]
	},
	{
		value: "group3",
		label: "Group 3",
		items: [
			{ value: 11, label: "Item 11" },
			{ value: 12, label: "Item 12" },
			{ value: 13, label: "Item 13" },
			{ value: 14, label: "Item 14" },
			{ value: 15, label: "Item 15" }
		]
	}
];

export const Default = Template.bind({});
Default.args = {
	id: "foo",
	options: options,
	placeholder: "test"
};

export const Grouped = Template.bind({});
Grouped.args = {
	id: "foo",
	options: groupedOptions,
	placeholder: "test",
	grouped: true
};

export const Editable = Template.bind({});
Editable.args = {
	id: "foo",
	options: options,
	placeholder: "test",
	editable: true
};

// Editable.play = async (context) => {
// 	userEvent.click(context.canvasElement.getElementsByClassName("p-dropdown-trigger")[0]);
// 	userEvent.click(context.canvasElement.getElementsByClassName("p-dropdown-item")[1]);
// 	userEvent.click(context.canvasElement.getElementsByClassName("p-dropdown-label")[0]);
// 	userEvent.type(context.canvasElement.getElementsByClassName("p-dropdown-label")[0], "{backspace}".repeat(6));
// 	userEvent.type(context.canvasElement.getElementsByClassName("p-dropdown-label")[0], "This is a test");
// 	await expect(
// 		// form.values.dropdown.value
// 		(context.canvasElement.getElementsByClassName("p-dropdown-label")[0] as HTMLInputElement).value
// 	).toBe("This is a test");
// 	userEvent.click(context.canvasElement.getElementsByClassName("p-dropdown-trigger")[0]);
// 	userEvent.click(context.canvasElement.getElementsByClassName("p-dropdown-item")[1]);
// 	userEvent.click(context.canvasElement.getElementsByClassName("p-dropdown-label")[0]);
// 	userEvent.type(context.canvasElement.getElementsByClassName("p-dropdown-label")[0], "{backspace}".repeat(6));
// 	userEvent.type(context.canvasElement.getElementsByClassName("p-dropdown-label")[0], "This is a test");
// 	await expect(
// 		// form.values.dropdown.value
// 		(context.canvasElement.getElementsByClassName("p-dropdown-label")[0] as HTMLInputElement).value
// 	).toBe("This is a test");
// };
