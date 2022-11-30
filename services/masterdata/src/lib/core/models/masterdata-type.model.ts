import { IMasterdataTypeCreate, IMasterdataTypeUpdate } from "../interfaces";

export class MasterdataType implements IMasterdataTypeCreate, IMasterdataTypeUpdate {
  id!: string;
  code!: string;
  name!: string;
  description?: string;
  masterdatasCount?: number;
  metadata?: any;
}
