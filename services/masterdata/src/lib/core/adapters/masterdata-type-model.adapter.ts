//import { MasterdataType as MasterdataTypeApiModel } from '../../api-clients';
import { IAdapter } from "../interfaces";
import { MasterdataType } from "../models";

export class MasterdataTypeModelAdapter implements IAdapter<any, MasterdataType> {
  adapt(source: any): MasterdataType {
    return {
      id: source?.id,
      code: source?.code,
      name: source?.name,
      description: source?.description,
      masterdatasCount: source?.masterdatasCount,
      metadata: source?.metadata,
    };
  }
}
