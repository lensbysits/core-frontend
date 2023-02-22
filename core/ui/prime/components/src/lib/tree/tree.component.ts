import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { TreeNode } from "primeng/api";
import { InputBaseComponent } from "../input-base/input-base.component";
import { ITreeNode } from "./models";

interface INodeMap {
	[id: string]: TreeNode<ITreeNode>;
}

@Component({
	selector: "lens-tree",
	templateUrl: "tree.component.html",
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TreeComponent), multi: true }]
})
export class TreeComponent extends InputBaseComponent {
	private _flatMap: INodeMap = {};
	private selectedNodes: TreeNode<ITreeNode>[] = [];
	private selectedNode: TreeNode<ITreeNode> | undefined;
	private _singleSelectionMode: "single" | "multiple" | "checkbox" = "single";

	@Input()
	public filter = false;
	@Input()
	public filterMode: "lenient" | "strict" = "lenient";
	@Input()
	public selectionMode: "single" | "multiple" | "checkbox" = this._singleSelectionMode;

	@Input()
	public set nodes(nodes: ITreeNode[]) {
		if (!nodes) {
			return;
		}

		this._flatMap = this.createFlatNodeMap(nodes);
		this.hierarchicalNodes = this.createNodeHierarchy(this._flatMap);

		this.setSelectedNodes(this.value);
	}

	@Output()
	public nodeSelected = new EventEmitter<TreeNode<ITreeNode>>();
	@Output()
	public nodeUnselected = new EventEmitter<TreeNode<ITreeNode>>();

	public get selection(): TreeNode<ITreeNode> | TreeNode<ITreeNode>[] | undefined {
		return this.selectionMode === this._singleSelectionMode ? this.selectedNode : this.selectedNodes;
	}

	public get selectedKeys(): string[] | number[] {
		return this.selectionMode === this._singleSelectionMode ? [this.value] : [...this.value];
	}

	public hierarchicalNodes: TreeNode<ITreeNode>[] = [];

	protected override onValueChanged(value?: number | number[]): void {
		if (!value) {
			return;
		}

		this.setSelectedNodes(value);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onNodeSelected(event: any) {
		this.updateSelection(event.node, true);
		this.nodeSelected.emit(event.node);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onNodeUnselected(event: any) {
		this.updateSelection(event.node, false);
		this.nodeUnselected.emit(event.node);
	}

	private createFlatNodeMap(values: ITreeNode[]) {
		const nodeMap: INodeMap = {};

		for (const value of values) {
			if (!Object.prototype.hasOwnProperty.call(nodeMap, value.key)) {
				nodeMap[value.key] = {
					key: value.key.toString(),
					icon: value.icon,
					label: value.label,
					data: value,
					selectable: !this.disabled,
					children: []
				};
			}
		}

		return nodeMap;
	}

	private createNodeHierarchy(nodeMap: INodeMap): TreeNode<ITreeNode>[] {
		const rootNodes: TreeNode<ITreeNode>[] = [];

		for (const nodeId in nodeMap) {
			const node = nodeMap[nodeId];
			if (!node.data?.parent || !Object.prototype.hasOwnProperty.call(nodeMap, node.data?.parent)) {
				rootNodes.push(node);
			} else {
				node.parent = nodeMap[node.data?.parent];
				let curChildren = nodeMap[node.data?.parent].children ?? [];
				curChildren.push(node);
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				curChildren = curChildren.sort((a, b) => a.label!.localeCompare(b.label!));

				nodeMap[node.data?.parent].children = curChildren;
			}
		}

		return rootNodes;
	}

	private setSelectedNodes(value: number | number[]) {
		if (this.selectionMode === this._singleSelectionMode) {
			if (Array.isArray(value)) {
				throw "Tree is in single select mode, cannot use array to set selected values";
			}

			this.selectedNode = this._flatMap[value];
			this.expandParents(this._flatMap[value]);
		} else {
			if (!Array.isArray(value)) {
				value = [value];
			}

			this.selectedNodes = [];
			for (const v of value) {
				this.selectedNodes.push(this._flatMap[v]);
				this.expandParents(this._flatMap[v]);
			}
		}
	}

	private expandParents(node?: TreeNode<ITreeNode>) {
		if (node?.parent) {
			node.parent.expanded = true;
			this.expandParents(node.parent);
		}
	}

	private updateSelection(node: TreeNode<ITreeNode>, isSelected: boolean) {
		if (this.selectionMode === this._singleSelectionMode) {
			this.selectedNode = isSelected ? node : undefined;
			this.value = isSelected ? node.key : undefined;
		} else {
			if (isSelected) {
				this.selectedNodes.push(node);
				this.value.push(node.key);
			} else {
				this.selectedNodes = this.selectedNodes.filter(n => n.key !== node.key);
				this.value = this.value.filter((v: string) => v !== node.key);
			}
		}

		this.valueChanged();
	}

	public override setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
		for (const nodeId in this._flatMap) {
			const node = this._flatMap[nodeId];
			node.selectable = !isDisabled;
		}
	}
}