import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CardComponent } from "./card.component";
import { CardModule } from "./card.module";

export default {
	component: CardComponent,
	title: "Components/Card",
	decorators: [
		moduleMetadata({
			imports: [CardModule, BrowserAnimationsModule]
		})
	]
} as Meta;

const Template: Story = args => ({
	template: `<lens-card header="header" subheader="subheader">foo</lens-card>`,
	props: {
		...args
	}
});

export const Default = Template.bind({});
Default.args = {
	header: "Header",
	subheader: "Subheader"
};
