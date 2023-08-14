import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { LoadingSpinnerComponent } from "./loading-spinner.component";
import { LoadingSpinnerModule } from "./loading-spinner.module";

export default {
	component: LoadingSpinnerComponent,
	title: "Components/LoadingSpinner",
	decorators: [
		moduleMetadata({
			imports: [LoadingSpinnerModule]
		})
	]
} as Meta;

const Template: Story = args => ({
	props: {
		...args
	}
});

export const Default = Template.bind({});
Default.args = {
	isLoading: true
};
