export interface ITreeNode {
	parent?: string;
	key: string;
	label: string;
	icon?: string;
	data?:unknown;
}
