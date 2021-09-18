import { Component, createEffect, createSignal, For, JSX } from "solid-js";
import styles from "../App.module.css";
import { ListRendererProps } from "../types/Render.types";
import Utils from "../utils";

const ListRenderer: Component<ListRendererProps> = ({
  height,
  itemCount,
  itemSize,
  width,
  renderer: Renderer,
  overscanCount = 1,
}) => {
  const windowSize = Math.ceil(height / itemSize);

  const [scrollState, setScrollState] = createSignal(0);

  const [list, setList] = createSignal([]);

  createEffect(() => {
    const window = Utils.getWindowSize(scrollState(), windowSize, itemSize);
    const windowItems = Utils.getWindowItems({
      window,
      overscanCount,
      itemCount,
      itemSize,
    });
    setList(windowItems);
  });

  const handleScroll: JSX.EventHandlerUnion<HTMLDivElement, UIEvent> = (
    event
  ) => {
    setScrollState(event.target.scrollTop);
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
          "min-height": Utils.wrapPx(itemSize * itemCount),
        }}
      >
        <For each={list()} fallback={<div>Loading...</div>}>
          {Renderer}
        </For>
      </div>
    </div>
  );
};

export default ListRenderer;
