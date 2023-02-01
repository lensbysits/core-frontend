import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { TreeNode } from "primeng/api";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
	selector: "lens-tree",
	templateUrl: "tree.component.html",
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TreeComponent), multi: true }]
})
export class TreeComponent extends InputBaseComponent implements OnInit {

	// private _selectedNodes: TreeNode<unknown>[] = [];
	private _nodes: TreeNode<unknown>[] = [];
	private _searchFailsafe = 2500;
	private _initialized = false;
	private _defaultSelectionMode = "single";

	private selectedNode: TreeNode<unknown> | undefined;
	private selectedNodes: TreeNode<unknown>[] = [];

	@Input()
	public filter = false;
	@Input()
	public filterMode = "strict";
	@Input()
	public selectionMode = this._defaultSelectionMode;
	// @Input()
	// public nodes!: TreeNode<unknown>[];

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
		return this.selectionMode === this._defaultSelectionMode ? this.selectedNode : this.selectedNodes;
	}
	
	public get selectedKeys(): string[] | number[] {
		return this.selectionMode === this._defaultSelectionMode ? [this.value] : (this.value as []);
	}

	
	protected override onValueChanged(value?: number): void {
		if(!value ||  value <= 0){
			return;
		}

		console.log("value changed. Searching nodes. Value: ", value)
		this.searchNodes();
	}

	public ngOnInit(): void {
		//this.registerOnChange
	}

	// public get selectedNodes(): TreeNode<unknown>[] {
	// 		console.log("get", this._nodes)
	// 		return this._selectedNodes;
	// }

	// public set selectedNodes(nodes: TreeNode<unknown>[]) {
	// 	this._selectedNodes = nodes;
	// }


	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onNodeSelected(event: any) {
		this.nodeSelected.emit(event.node);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public onNodeUnselected(event: any) {
		this.nodeUnselected.emit(event.node);
	}

	private searchNodes() {
		if (this._initialized || !this.nodes || this.nodes.length === 0) {
			return;
		}

		this._initialized = true;

		console.log("searching nodes...");
		
		console.log("SelectedKeys: ", this.selectedKeys)
		for (const selectedKey of this.selectedKeys) {
			const node = this.executeDfsSearch(selectedKey, this.nodes);
			if (node) {
				// if(node.parent){
				// 	node.parent.expanded = true
				// };
				this.updateSelection(node);
			}
		}
	}

	// eslint-disable-next-line complexity
	private executeDfsSearch(nodeKey: string | number, nodes: TreeNode<unknown>[], curDepth: number = 0): TreeNode<unknown> | undefined {
		//search tree depth first
		let foundNode: TreeNode<unknown> | undefined = undefined;

		for (const node of nodes) {
			this.checkFailsafe();

			if (foundNode) {
				this.expandParents(foundNode);
				break;
			}

			console.log(
				"".padEnd(curDepth, "---"),
				"searching node (Key=",
				node.key,
				"searchKey=",
				nodeKey,
				") ",
				node.label,
				"with ",
				node.children?.length ?? 0,
				" children. Failsave: ",
				this._searchFailsafe
			);
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
			console.log("Expanding node ", node.label);
			node.parent.expanded = true;
			this.expandParents(node.parent);
		}
	}

	private checkFailsafe() {
		this._searchFailsafe = this._searchFailsafe - 1;
		if (this._searchFailsafe <= 0) {
			throw "TreeComponent: Max depth reached while searching for selected keys";
		}
	}
	
	private updateSelection(node: TreeNode<unknown>) {
		if (this.selectionMode === this._defaultSelectionMode) {
			this.selectedNode = node;
		} else {
			this.selectedNodes.push(node);
		}
	}
}
