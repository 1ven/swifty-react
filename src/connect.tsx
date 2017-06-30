import { combineArray } from "most";
import { ComponentEnhancer, mapPropsStream } from "recompose";
import { createModel, Reducer } from "swifty";

export function connect<TInner, TOuter, S1>(
  reducers: [Reducer<S1>],
  transform: (ownProps: TInner, stateList: [S1]) => TOuter
): ComponentEnhancer<TInner, TOuter>;

export function connect<TInner, TOuter, S1, S2>(
  reducers: [Reducer<S1>, Reducer<S2>],
  transform: (ownProps: TInner, stateList: [S1, S2]) => TOuter
): ComponentEnhancer<TInner, TOuter>;

export function connect<TInner, TOuter, S1, S2, S3>(
  reducers: [Reducer<S1>, Reducer<S2>, Reducer<S3>],
  transform: (ownProps: TInner, stateList: [S1, S2, S3]) => TOuter
): ComponentEnhancer<TInner, TOuter>;

export function connect<TInner, TOuter, S1, S2, S3, S4>(
  reducers: [Reducer<S1>, Reducer<S2>, Reducer<S3>, Reducer<S4>],
  transform: (ownProps: TInner, stateList: [S1, S2, S3, S4]) => TOuter
): ComponentEnhancer<TInner, TOuter>;

export function connect<TInner, TOuter, S1, S2, S3, S4, S5>(
  reducers: [Reducer<S1>, Reducer<S2>, Reducer<S3>, Reducer<S4>, Reducer<S5>],
  transform: (ownProps: TInner, stateList: [S1, S2, S3, S4, S5]) => TOuter
): ComponentEnhancer<TInner, TOuter>;

/**
 * Connects reducers to React component.
 *
 * @param reducers Reducers list.
 * @param transform Mapper function, which should return new component props.
 * @return Returns connect HOC.
 */
export function connect(reducers, transform) {
  return mapPropsStream(ownProps$ =>
    combineArray((ownProps, ...stateList) => transform(ownProps, stateList), [
      ownProps$,
      ...reducers.map(createModel)
    ])
  );
}
