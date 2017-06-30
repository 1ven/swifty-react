import { combineArray } from "most";
import { ComponentEnhancer, mapPropsStream } from "recompose";
import { createModel, Reducer } from "swifty";

function connect<TInner, TOuter, S1>(
  reducers: [Reducer<S1>],
  transform: (stateList: [S1], ownProps?: TInner) => TOuter
): ComponentEnhancer<TInner, TOuter>;

function connect<TInner, TOuter, S1, S2>(
  reducers: [Reducer<S1>, Reducer<S2>],
  transform: (stateList: [S1, S2], ownProps?: TInner) => TOuter
): ComponentEnhancer<TInner, TOuter>;

function connect<TInner, TOuter, S1, S2, S3>(
  reducers: [Reducer<S1>, Reducer<S2>, Reducer<S3>],
  transform: (stateList: [S1, S2, S3], ownProps?: TInner) => TOuter
): ComponentEnhancer<TInner, TOuter>;

function connect<TInner, TOuter, S1, S2, S3, S4>(
  reducers: [Reducer<S1>, Reducer<S2>, Reducer<S3>, Reducer<S4>],
  transform: (stateList: [S1, S2, S3, S4], ownProps?: TInner) => TOuter
): ComponentEnhancer<TInner, TOuter>;

function connect<TInner, TOuter, S1, S2, S3, S4, S5>(
  reducers: [Reducer<S1>, Reducer<S2>, Reducer<S3>, Reducer<S4>, Reducer<S5>],
  transform: (stateList: [S1, S2, S3, S4, S5], ownProps?: TInner) => TOuter
): ComponentEnhancer<TInner, TOuter>;

/**
 * Connects reducers to React component.
 *
 * @param reducers Reducers list.
 * @param transform Mapper function, which should return new component props.
 * @return Returns connect HOC.
 */
function connect(reducers, transform) {
  return mapPropsStream(ownProps$ =>
    combineArray((ownProps, ...stateList) => transform(stateList, ownProps), [
      ownProps$,
      ...reducers.map(createModel)
    ])
  );
}

export default connect;
