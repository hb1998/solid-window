import { ItemProps, TWindow } from './../types/Render.types';
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
  }: {
    itemSize: number;
    window: [number, number];
    overscanCount: number;
    itemCount: number;
  }) {
    const items: ItemProps[] = [];
    const startIndex = Math.max(0, window[0] - overscanCount);
    const endIndex = Math.min(window[1] + overscanCount, itemCount);
    for (let index = startIndex; index < endIndex; index++) {
      items.push({
        rowIndex: index,
        style: {
          height: Utils.wrapPx(itemSize),
          width: "100%",
          position: "absolute",
          top: Utils.wrapPx((index + 1) * itemSize),
        },
      } as ItemProps);
    }
    return items;
  }
}