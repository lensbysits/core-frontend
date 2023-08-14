import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Meta, Story, moduleMetadata } from "@storybook/angular";
import { TreeComponent } from "./tree.component";
import { TreeModule } from "./tree.module";

export default {
	component: TreeComponent,
	title: "Components/Tree",
	decorators: [
		moduleMetadata({
			imports: [TreeModule, ReactiveFormsModule, BrowserAnimationsModule, FormsModule]
		})
	]
} as Meta;

const Template: Story = args => ({
	props: {
		...args
	}
});

export const Filterable = Template.bind({});
Filterable.args = {
	selectionMode: "single",
	filterMode: "lenient",
	filter: true,
	nodes: [
		{ key: 1, label: "Item 1" },
		{ key: 2, label: "Item 2", parent: 1 },
		{ key: 3, label: "Item 3", parent: 2 },
		{ key: 4, label: "Item 4", parent: 1 }
	]
};

export const NotFilterable = Template.bind({});
NotFilterable.args = {
	selectionMode: "single",
	filterMode: "lenient",
	filter: false,
	nodes: [
		{ key: 1, label: "Item 1" },
		{ key: 2, label: "Item 2", parent: 1 },
		{ key: 3, label: "Item 3", parent: 2 },
		{ key: 4, label: "Item 4", parent: 1 }
	]
};
