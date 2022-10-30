import { Component, createEffect, createSignal, For, JSX } from "solid-js";
import styles from "../App.module.css";
import { GridItemProps, GridRendererProps, ListItemProps, ListRendererProps } from "../types/Render.types";
import Utils from "../utils";

const FixedGridRenderer: Component<GridRendererProps> = ({
  height,
  rowCount,
  rowSize,
  columnCount,
  columnSize,
  width,
  renderer: Renderer,
  overscanCount = 1,
}) => {
  const rowWindowSize = Math.ceil(width / rowSize);
  const colWindowSize = Math.ceil(width / columnSize);

  const [scrollXState, setScrollXState] = createSignal(0);
  const [scrollYState, setScrollYState] = createSignal(0);

  const [rows, setRows] = createSignal<Partial<GridItemProps>[]>([]);
  const [columns, setColumns] = createSignal<Partial<GridItemProps>[]>([]);

  createEffect(() => {
    const verticalWindow = Utils.getWindowSize(scrollXState(), rowWindowSize, rowSize);
    const windowItems = Utils.getWindowItems({
      window: verticalWindow,
      overscanCount,
      itemCount: rowCount,
      itemSize: rowSize,
      getItem: (index: number, itemSize: number) => {
        return {
          rowIndex: index,
          style: {
            height: Utils.wrapPx(itemSize),
            position: "absolute",
            top: Utils.wrapPx((index + 1) * itemSize),
          },
        } as Partial<GridItemProps>;
      }
    });
    setRows(windowItems);
  });

  createEffect(() => {
    const horizontalWindow = Utils.getWindowSize(scrollYState(), colWindowSize, columnSize);
    const windowItems = Utils.getWindowItems({
      window: horizontalWindow,
      overscanCount,
      itemCount: columnCount,
      itemSize: columnSize,
      getItem: (index: number, itemSize: number) => {
        return {
          columnIndex: index,
          style: {
            width: Utils.wrapPx(itemSize),
            position: "absolute",
            left: Utils.wrapPx((index + 1) * itemSize),
          },
        } as Partial<GridItemProps>;
      }
    });
    setColumns(windowItems);
  });

  const handleScroll: JSX.EventHandlerUnion<HTMLDivElement, UIEvent> = (
    event
  ) => {
    setScrollXState(event.target.scrollTop);
    setScrollYState(event.target.scrollLeft);
  };

  return (
    <div
      style={{
        height: Utils.wrapPx(height),
        width: Utils.wrapPx(width),
      }}
      onscroll={handleScroll}
      class={styles.wrapper}
    >
      <div
        style={{
          "min-height": Utils.wrapPx(rowSize * rowCount),
          "min-width": Utils.wrapPx(columnSize * columnCount),
        }}
      >
        <For each={rows()} fallback={<div>Loading...</div>}>
          {row => <For each={columns()} fallback={<div>Loading...</div>}>
            {column => {
              const style = { ...row.style, ...column.style } as GridItemProps;
              return <Renderer rowIndex={row.rowIndex} columnIndex={column.columnIndex} style={style} />
            }}
          </For>}

        </For>
      </div>
    </div>
  );
};

export default FixedGridRenderer;
