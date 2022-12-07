import { IAdapter } from "../interfaces";

export class DefaultAdapter<TSource, TDestination> implements IAdapter<TSource, TDestination> {
  adapt(source: TSource): TDestination {
    return (<unknown>source) as TDestination;
  }
}
