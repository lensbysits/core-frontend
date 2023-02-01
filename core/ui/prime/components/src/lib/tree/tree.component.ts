import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { TreeNode } from "primeng/api";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
	selector: "lens-tree",
	templateUrl: "tree.component.html",
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TreeComponent), multi: true }]
})
export class TreeComponent extends InputBaseComponent {
	private _nodes: TreeNode<unknown>[] = [];
	private _searchFailsafe = 2500;
	private _searchKey: string | number = "";

	private _singleSelectionMode: "single" | "multiple" | "Checkbox" = "single";

	private selectedNode: TreeNode<unknown> | undefined;
	private selectedNodes: TreeNode<unknown>[] = [];

	@Input()
	public filter = false;
	@Input()
	public filterMode: "lenient" | "strict" = "lenient";
	@Input()
	public selectionMode: "single" | "multiple" | "Checkbox" = this._singleSelectionMode;

	@Input()
	public get nodes(): TreeNode<unknown>[] {
		return this._nodes;
	}
	public set nodes(nodes: TreeNode<unknown>[]) {
		this._nodes = nodes;
		if (!nodes) {
			return;
		}

		this.searchNodes();
	}

	@Output()
	public nodeSelected = new EventEmitter<TreeNode<unknown>>();
	@Output()
	public nodeUnselected = new EventEmitter<TreeNode<unknown>>();

	public get selection(): TreeNode<unknown> | TreeNode<unknown>[] | undefined {
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

	private searchNodes() {
		if (this.shouldExecuteSearch()) {
			return;
		}

		this._searchKey = this.value;
		for (const selectedKey of this.selectedKeys) {
			const node = this.executeDfsSearch(selectedKey, this.nodes);
			if (node) {
				this.updateSelection(node, true);
			}
		}
	}

	private executeDfsSearch(nodeKey: string | number, nodes: TreeNode<unknown>[], curDepth: number = 0): TreeNode<unknown> | undefined {
		let foundNode: TreeNode<unknown> | undefined = undefined;

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

	private expandParents(node: TreeNode<unknown>) {
		if (node.parent) {
			node.parent.expanded = true;
			this.expandParents(node.parent);
		}
	}

	private updateSelection(node: TreeNode<unknown>, isSelected: boolean) {
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
		return this._searchKey === this.value || !this.nodes || this.nodes.length === 0 || !this.selectedKeys || !this.value;
	}
}
