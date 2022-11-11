export interface IAdapter<TSource, TDestination> {
  adapt(source: TSource, extra: any): TDestination;
}
