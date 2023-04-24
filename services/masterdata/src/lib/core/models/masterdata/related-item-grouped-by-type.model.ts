export interface MasterdataRelatedItemGroupedByTypeItem {
	id: string;
	name: string;
	link?: string;
	count?: number;
}

export interface MasterdataRelatedItemGroupedByType {
	typeId: string;
	typeName: string;
	items: MasterdataRelatedItemGroupedByTypeItem[];
}
