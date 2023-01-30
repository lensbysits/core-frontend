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
	@Input()
	public nodes!: TreeNode<unknown>[];
	@Input()
	public filter = false;
	@Input()
	public filterMode = "strict";
	@Input()
	public selectionMode = "single";
	@Input()
	public selectedKeys?: string[] | number[];

	@Output()
	public nodeSelected = new EventEmitter<TreeNode<unknown>>();
	public nodeUnselected = new EventEmitter<TreeNode<unknown>>();

	ngOnInit(): void {
		for (const node of this.nodes) {
			// if (!node.expandedIcon) {
			// 	node.expandedIcon = "pi pi-folder-open";
			// }

			// if (!node.collapsedIcon) {
			// 	node.collapsedIcon = "pi pi-folder";
			// }
			node.selectable = !this.isDisabled;
		}
	}

	public selectedNodes(): TreeNode<unknown>[] {
		return [];
	}
}
