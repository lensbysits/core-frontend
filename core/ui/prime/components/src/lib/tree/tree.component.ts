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
	public  hierarchicalNodes: TreeNode<ITreeNode>[] = [];

	private _searchFailsafe = 2500;
	private _searchKey: string | number = "";

	private _singleSelectionMode: "single" | "multiple" | "Checkbox" = "single";

	private selectedNode: TreeNode<ITreeNode> | undefined;
	private selectedNodes: TreeNode<ITreeNode>[] = [];

	@Input()
	public filter = false;
	@Input()
	public filterMode: "lenient" | "strict" = "lenient";
	@Input()
	public selectionMode: "single" | "multiple" | "Checkbox" = this._singleSelectionMode;

	@Input()
	public set nodes(nodes: ITreeNode[]) {
		if (!nodes) {
			return;
		}

		const flatNodes = this.createFlatNodeMap(nodes);
		this.hierarchicalNodes = this.createNodeHierarchy(flatNodes);

		this.searchNodes();
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

	protected override onValueChanged(value?: number): void {
		if (!value || value <= 0) {
			return;
		}

		this.searchNodes();
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
				curChildren = curChildren.sort((a, b) => a.label!.localeCompare(b.label!))

				nodeMap[node.data?.parent].children = curChildren;
			}
		}

		return rootNodes;
	}


	private searchNodes() {
		if (!this.shouldExecuteSearch()) {
			return;
		}

		this._searchKey = this.value;
		for (const selectedKey of this.selectedKeys) {
			const node = this.executeDfsSearch(selectedKey, this.hierarchicalNodes);
			if (node) {
				this.updateSelection(node, true);
			}
		}
	}

	private executeDfsSearch(nodeKey: string | number, nodes: TreeNode<ITreeNode>[], curDepth: number = 0): TreeNode<ITreeNode> | undefined {
		let foundNode: TreeNode<ITreeNode> | undefined = undefined;

		for (const node of nodes) {
			this.checkRecursiveFailsafe();

			if (foundNode) {
				this.expandParents(foundNode);
				break;
			}

			if (node.key === nodeKey.toLocaleString()) {
				foundNode = node;
			} else if (node.children && node.children.length > 0) {
				foundNode = this.executeDfsSearch(nodeKey, node.children, curDepth + 1);
			}
		}

		return foundNode;
	}

	private expandParents(node: TreeNode<ITreeNode>) {
		if (node.parent) {
			node.parent.expanded = true;
			this.expandParents(node.parent);
		}
	}

	private updateSelection(node: TreeNode<ITreeNode>, isSelected: boolean) {
		if (this.selectionMode === this._singleSelectionMode) {
			this.selectedNode = isSelected ? node : undefined;
		} else {
			if (isSelected) {
				this.selectedNodes.push(node);
			} else {
				this.selectedNodes = this.selectedNodes.filter(n => n.key !== node.key);
			}
		}
	}

	private checkRecursiveFailsafe() {
		this._searchFailsafe = this._searchFailsafe - 1;
		if (this._searchFailsafe <= 0) {
			throw "TreeComponent: Max depth reached while searching for selected keys";
		}
	}

	private shouldExecuteSearch() {
		// we only should search the tree if we have all data in place and its usefull to search the tree (current search key deviates from the previous search)
		return this._searchKey !== this.value && this.hierarchicalNodes && this.hierarchicalNodes.length > 0 && this.selectedKeys  && this.value;
	}
}
