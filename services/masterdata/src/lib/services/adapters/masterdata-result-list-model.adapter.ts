import { IAdapter } from '../interfaces';
import { Masterdata, MasterdataResultList } from '../models';
import { MasterdataModelAdapter } from './';

export class MasterdataResultListModelAdapter
  implements IAdapter<any, MasterdataResultList>
{
  adapt(source: any): MasterdataResultList {
    const masterdataModelAdapter = new MasterdataModelAdapter();
    if (!source) {
      return {
        totalSize: 0,
        value: [],
      };
    }
    return {
      totalSize: source.valueSize,
      value: source.value?.map((item: Masterdata) =>
        masterdataModelAdapter.adapt(item)
      ),
    };
  }
}
