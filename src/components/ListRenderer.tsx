import { Component, createEffect, createSignal, For, JSX } from "solid-js";
import styles from "../App.module.css";

interface ListRendererProps {
  height: number;
  itemCount: number;
  itemSize: number;
  width: number;
  overscanCount?: number;
}

interface ItemProps {
  rowIndex: number;
  style: JSX.CSSProperties;
}
type TWindow = [number, number];

const ListRenderer: Component<ListRendererProps> = ({
  height,
  itemCount,
  itemSize,
  width,
  overscanCount = 5,
}) => {
  const initialWindowSize = Math.ceil(height / itemSize);

  const [window, setWindow] = createSignal<TWindow>([0, initialWindowSize]);
  const [scrollState, setScrollState] = createSignal(0);

  const [list, setList] = createSignal([]);
  let gridContainerRef: HTMLDivElement;

  createEffect(() => {
    const windowItems = getWindowItems({
      width,
      window: window(),
      overscanCount,
      height,
      itemCount,
      itemSize,
      scrollState: scrollState(),
    });
    setList(windowItems);
  });

  const handleScroll: JSX.EventHandlerUnion<HTMLDivElement, UIEvent> = (
    event
  ) => {
    event.preventDefault();
    setScrollState(event.target.scrollTop);
  };

  return (
    <div
      style={{
        height: wrapPx(height),
        width: wrapPx(width),
      }}
      onscroll={handleScroll}
      class={styles.wrapper}
    >
      <div
        ref={gridContainerRef}
        style={{
          "min-height": wrapPx(itemSize * itemCount),
        }}
      >
        <For each={list()} fallback={<div>Loading...</div>}>
          {(item) => <div style={item.style}>{item.rowIndex}</div>}
        </For>
      </div>
    </div>
  );
};

function getWindowItems({
  window,
  width,
  height,
  itemSize,
  overscanCount,
  itemCount,
  scrollState,
}: {
  width: number;
  height: number;
  itemSize: number;
  window: [number, number];
  overscanCount: number;
  itemCount: number;
  scrollState: number;
}) {
  const items: ItemProps[] = [];
  const startIndex = Math.max(0, window[0] - overscanCount);
  const endIndex = Math.min(window[1] + overscanCount, itemCount);
  for (let index = startIndex; index < endIndex; index++) {
    items.push({
      rowIndex: index,
      style: {
        height: wrapPx(itemSize),
        position: "absolute",
        top: wrapPx((index + 1) * 20),
      },
    } as ItemProps);
  }
  return items;
}

function wrapPx(length: number) {
  return `${length}px`;
}
export default ListRenderer;
