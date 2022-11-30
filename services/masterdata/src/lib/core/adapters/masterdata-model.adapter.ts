//import { MasterdataType as MasterdataTypeApiModel } from '../../api-clients';
import { IAdapter } from "../interfaces";
import { Masterdata } from "../models";

export class MasterdataModelAdapter implements IAdapter<any, Masterdata> {
  adapt(source: any): Masterdata {
    return {
      id: source?.id,
      masterdataTypeId: source?.masterdataTypeId,
      masterdataTypeName: source?.masterdataTypeName,
      key: source?.key,
      value: source?.value,
      name: source?.name,
      description: source?.description,
      metadata: source?.metadata,
    };
  }
}
