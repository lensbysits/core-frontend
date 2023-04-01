import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { ButtonModule } from "../button";
import { TabsComponent } from "./tabs.component";
import { TabsModule } from "./tabs.module";

export default {
	component: TabsComponent,
	title: "Components/Tabs",
	decorators: [
		moduleMetadata({
			imports: [TabsModule, ButtonModule, BrowserAnimationsModule]
		})
	]
} as Meta;

const Template: Story = args => ({
	template: `
		<lens-tabs>
			<tab-panels>
				<tab-panel header="tab1-header">
					<div>tab1 content</div>
					<lens-button label="Button"></lens-button>
				</tab-panel>
				<tab-panel header="tab2-header">
					<div>tab2 content</div>
				</tab-panel>
				<tab-panel header="tab3-header">
					<div>tab3 content</div>
				</tab-panel>
			</tab-panels>
		</lens-tabs>
	`,
	props: {
		...args
	}
});

export const Default = Template.bind({});
Default.args = {};
