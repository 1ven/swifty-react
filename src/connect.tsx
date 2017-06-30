import { Stream, combineArray } from "most";
import { ComponentEnhancer, mapPropsStream } from "recompose";
import { createModel, Reducer } from "swifty";
import { Transformer } from "./types";

/**
 * Connects reducers to React component.
 *
 * @param reducers Reducers list.
 * @param transform Mapper function, which should return new component props.
 * @return Returns connect HOC.
 */
export default <TInner, TOuter>(
  reducers: Reducer<any>[],
  transform: Transformer<TInner, TOuter>
) =>
  mapPropsStream<TInner, TOuter>((ownProps$: Stream<TInner>) =>
    combineArray(
      (ownProps: TInner, ...stateList) => transform(ownProps, stateList),
      [ownProps$, ...reducers.map(createModel)]
    )
  );
