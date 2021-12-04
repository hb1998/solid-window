import { Component, createEffect, createSignal, For, JSX } from "solid-js";
import styles from "../App.module.css";
import {
  TItemSizeMetadata,
  TWindow,
  VariableListRendererProps,
} from "../types/Render.types";
import Utils from "../utils";

const VariableListRenderer: Component<VariableListRendererProps> = ({
  height,
  itemCount,
  itemSize,
  width,
  renderer: Renderer,
  overscanCount = 5,
}) => {
  const [scrollState, setScrollState] = createSignal(0);

  const [list, setList] = createSignal([]);
  const rowHeightMeta: TItemSizeMetadata = new Map();
  
  createEffect(() => {
    const window = Utils.getVariableWindowSize(scrollState(), itemSize);
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
        ref={gridContainerRef}
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

export default VariableListRenderer;
