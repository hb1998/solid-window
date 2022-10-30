import {
  ListItemProps,
  TItemSizeMetadata,
  TWindow,
} from "./../types/Render.types";
export default class Utils {
  static getWindowSize(
    scrollState: number,
    windowSize: number,
    itemSize: number
  ): TWindow {
    const startIndex = Math.floor(scrollState / itemSize);
    return [startIndex, startIndex + windowSize];
  }

  static wrapPx(length: number) {
    return `${length}px`;
  }

  static getWindowItems({
    window,
    itemSize,
    overscanCount,
    itemCount,
    getItem,
  }: {
    itemSize: number;
    window: [number, number];
    overscanCount: number;
    itemCount: number;
    getItem: (index: number, itemSize: number) => any;
  }) {
    const items: ListItemProps[] = [];
    const startIndex = Math.max(0, window[0] - overscanCount);
    const endIndex = Math.min(window[1] + overscanCount, itemCount);
    for (let index = startIndex; index < endIndex; index++) {
      // items.push({
      //   rowIndex: index,
      //   style: {
      //     height: Utils.wrapPx(itemSize),
      //     width: "100%",
      //     position: "absolute",
      //     top: Utils.wrapPx((index + 1) * itemSize),
      //   },
      // } as ListItemProps);
      items.push(getItem(index, itemSize));
    }
    return items;
  }

  static getVariableWindowSize({
    scrollState,
    windowSize,
    itemSize,
    rowHeightMeta,
  }: {
    scrollState: number;
    windowSize: number;
    itemSize: () => number;
    height: number;
    rowHeightMeta: TItemSizeMetadata;
  }): TWindow {
    const startIndex = this.getWindowStartIndex(null);
    return null
  }

  static getWindowLastIndex({
    startIndex,
    containerHeight,
    itemSize,
    rowHeightMeta,
  }: {
    startIndex: number;
    containerHeight: number;
    itemSize: (index: number) => number;
    rowHeightMeta: TItemSizeMetadata;
  }) {
    let runningHeight = 0;
    let index = startIndex;
    let initialTop = rowHeightMeta.get(startIndex).top || 0;
    while (runningHeight > containerHeight) {
      const rowHeight = itemSize(index);
      rowHeightMeta.set(index, {
        height: rowHeight,
        top: initialTop + runningHeight + rowHeight,
      });
      index += 1;
      runningHeight += rowHeight;
    }
  }

  static getWindowStartIndex({
    rowHeightMeta,
    scrollState,
  }: {
    scrollState: number;
    rowHeightMeta: TItemSizeMetadata;
  }) {
    const lastVisitedRow = rowHeightMeta.get(rowHeightMeta.size);
    for (const [index, rowHeight] of rowHeightMeta) {
      if (rowHeight) return null;
    }
  }
}
