import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { ButtonModule } from "../button";
import { AccordionComponent } from "./accordion.component";
import { AccordionModule } from "./accordion.module";

export default {
	component: AccordionComponent,
	title: "Components/Accordion",
	decorators: [
		moduleMetadata({
			imports: [AccordionModule, ButtonModule, BrowserAnimationsModule]
		})
	]
} as Meta;

const Template: Story = args => ({
	template: `
		<lens-accordion>
			<accordion-panels>
				<accordion-panel header="tab1-header">
					<div>tab1 content</div>
					<lens-button label="Button"></lens-button>
				</accordion-panel>
				<accordion-panel header="tab2-header">
					<div>tab2 content</div>
				</accordion-panel>
				<accordion-panel header="tab3-header">
					<div>tab3 content</div>
				</accordion-panel>
			</accordion-panels>
		</lens-accordion>
	`,
	props: {
		...args
	}
});

export const Default = Template.bind({});
Default.args = {};
