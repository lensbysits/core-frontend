import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { ButtonModule } from "../button";
import { BlockableDivComponent } from "./blockable-div.component";
import { BlockableDivModule } from "./blockable-div.module";

export default {
	component: BlockableDivComponent,
	title: "Components/BlockableDiv",
	decorators: [
		moduleMetadata({
			imports: [BlockableDivModule, ButtonModule]
		})
	]
} as Meta;

const Template: Story = args => ({
	template: `
	<lens-blockable-div
		[blocked]="blocked"
		[size]="1.5">
		<div>
			<h1>Lorem Ipsum</h1>
			<div>
				It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
			</div>
		</div>
	</lens-blockable-div>
	<div style="display: flex; width: 250px; justify-content: space-between;">
		<lens-button
			icon="pi pi-user-plus"
			label="Block"
			(clicked)="blocked=true"></lens-button>
		<lens-button
			icon="pi pi-user-plus"
			label="Unblock"
			(clicked)="blocked=false"></lens-button>
	</div>
	`,
	props: {
		...args
	}
});

export const Default = Template.bind({});
