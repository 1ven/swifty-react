import { Stream } from "most";
import { ComponentEnhancer, mapPropsStream } from "recompose";
import { createModel, combineReducers, Reducer } from "swifty";
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
  mapPropsStream<TInner, TOuter>((ownProps$: Stream<TInner>) => {
    // TODO: Replace by `combineArray`?
    const model$ = createModel(combineReducers({ ...reducers } as any));
    return model$.combine(
      (data, ownProps) =>
        transform(ownProps, reducers.map((_, i: number) => data[i])),
      ownProps$
    );
  });
