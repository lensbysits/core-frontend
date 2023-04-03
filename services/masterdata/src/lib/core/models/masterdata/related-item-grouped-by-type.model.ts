export interface MasterdataRelatedItemGroupedByTypeItem {
	id: string;
	name: string;
	link?: string;
}

export interface MasterdataRelatedItemGroupedByType {
	typeId: string;
	typeName: string;
	items: MasterdataRelatedItemGroupedByTypeItem[];
}
