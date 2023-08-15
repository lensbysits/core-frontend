import { action } from "@storybook/addon-actions";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { ButtonComponent } from "./button.component";
import { ButtonModule } from "./button.module";

export default {
	component: ButtonComponent,
	title: "Components/Button",
	decorators: [
		moduleMetadata({
			imports: [ButtonModule]
		})
	]
} as Meta;

const Template: Story = args => ({
	props: {
		...args,
		clicked: action("clicked")
	}
});

export const Default = Template.bind({});
Default.args = {
	label: "Secondary",
	type: "secondary"
};
