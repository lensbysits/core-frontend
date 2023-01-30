import { Component, forwardRef, Input, Output } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { TreeNode } from "primeng/api";
import { InputBaseComponent } from "../input-base/input-base.component";

@Component({
    selector: "lens-tree", 
    templateUrl: "tree.component.html",
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TreeComponent), multi: true }
    ]
})
export class TreeComponent extends InputBaseComponent {
	@Input()
	public nodes!: TreeNode<unknown>[]
	@Input()
	public filter = false
	@Input()
	public filterMode = "strict"
	@Input()
	public selectionMode = "single"

	@Input()
	public selectedNodes?: TreeNode<unknown>[]

}