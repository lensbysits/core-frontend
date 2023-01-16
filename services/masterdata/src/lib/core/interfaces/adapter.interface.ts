export interface IAdapter<TSource, TDestination> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	adapt(source: TSource, extra: any): TDestination;
}
