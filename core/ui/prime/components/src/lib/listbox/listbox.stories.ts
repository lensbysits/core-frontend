import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, Story, moduleMetadata } from "@storybook/angular";
import { ListboxComponent } from "./listbox.component";
import { ListboxModule } from "./listbox.module";

export default {
	component: ListboxComponent,
	title: "Components/Listbox",
	decorators: [
		moduleMetadata({
			imports: [
				ListboxModule,
				BrowserAnimationsModule,
				FormsModule // FormsModule needs to imported or else writeValue() isn't called, giving unexpected results | https://github.com/storybookjs/storybook/issues/14643
			]
		})
	]
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const form = new FormGroup({
	listbox: new FormControl()
});

const Template: Story = args => {
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

export const Default = Template.bind({});
Default.args = {
	id: "foo",
	options: options,
	placeholder: "test"
};
