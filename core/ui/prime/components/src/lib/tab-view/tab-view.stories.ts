import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { TabViewModule } from "primeng/tabview";
import { TabViewComponent } from "./tab-view.component";

export default {
	component: TabViewComponent,
	title: "Components/TabView",
	decorators: [
		moduleMetadata({
			imports: [TabViewModule, BrowserAnimationsModule]
		})
	]
} as Meta;

const Template: Story = args => ({
	template: `
		<lens-tab-view>
			<tab-panels>
				<tab-panel header="tab1-header">
					<div>tab1 content</div>
				</tab-panel>
				<tab-panel header="tab2-header">
					<div>tab2 content</div>
				</tab-panel>
				<tab-panel header="tab3-header">
					<div>tab3 content</div>
				</tab-panel>
			</tab-panels>
		</lens-tab-view>
	`,
	props: {
		...args
	}
});

export const Default = Template.bind({});
Default.args = {};
