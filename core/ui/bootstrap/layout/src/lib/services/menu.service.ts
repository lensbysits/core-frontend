import { Injectable } from "@angular/core";
import { MenuItem } from "@lens/app-abstract";

@Injectable()
export class MenuService {
	private allowedChars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	private nodeFound!: MenuItem;

	setNodeId(nodes: MenuItem[]): void {
		nodes.forEach((node: MenuItem) => {
			if (!Object.prototype.hasOwnProperty.call(node, "id")) {
				node.id = this.generateId();
			}
			if (node.items !== undefined) {
				this.setNodeId(node.items);
			}
		});
	}

	checkNodeIdExists(node: MenuItem, nodeId: string): boolean {
		if (node.id === nodeId) {
			return true;
		}
		if (node.items !== undefined) {
			return node.items.some((nestedNode: MenuItem) => {
				return this.checkNodeIdExists(nestedNode, nodeId);
			});
		}
		return false;
	}

	getNodeByRoute(nodes: MenuItem[], nodeRoute: string): MenuItem {
		this.findNode({ nodes, nodeRoute });
		return this.nodeFound;
	}

	private generateId(): string {
		let id = "";
		for (let i = 0; i < 25; i++) {
			id += this.allowedChars.charAt(
				Math.floor(Math.random() * this.allowedChars.length)
			);
		}
		return id;
	}

	private findNode({
		nodes,
		nodeRoute,
		nodeId
	}: {
		nodes: MenuItem[];
		nodeRoute?: string;
		nodeId?: string;
	}): void {
		for (let index = 0; index < nodes.length; index++) {
			const node = nodes[index];
			for (const key in node) {
				if (Object.prototype.hasOwnProperty.call(node, key)) {
					if (
						node?.routerLink &&
						node.routerLink.length &&
						encodeURI(node.routerLink[0]) === nodeRoute
					) {
						this.nodeFound = node;
					} else if (node.id === nodeId) {
						this.nodeFound = node;
					} else {
						if (node.items !== undefined) {
							this.findNode({
								nodes: node.items,
								nodeRoute: nodeRoute ?? undefined,
								nodeId: nodeId ?? undefined
							});
						}
					}
				}
			}
		}
	}
}
