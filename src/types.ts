export type Transformer<TInner, TOuter> = (
  ownProps: TInner,
  stateList: any[]
) => TOuter;
