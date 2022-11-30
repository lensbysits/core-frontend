import { IAdapter } from "../interfaces";
import { MasterdataType, MasterdataTypeResultList } from "../models";
import { MasterdataTypeModelAdapter } from ".";

export class MasterdataTypeResultListModelAdapter
  implements IAdapter<any, MasterdataTypeResultList>
{
  adapt(source: any): MasterdataTypeResultList {
    const masterdataTypeModelAdapter = new MasterdataTypeModelAdapter();
    if (!source) {
      return {
        totalSize: 0,
        value: [],
      };
    }
    return {
      totalSize: source.valueSize,
      value: source.value?.map((item: MasterdataType) => masterdataTypeModelAdapter.adapt(item)),
    };
  }
}
