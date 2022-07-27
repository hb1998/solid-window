import { Component, JSX } from "solid-js";


interface RendererProps {
    height: number;
    width: number;
    overscanCount?: number;
    renderer: Component<ItemProps>;
}
export interface ListRendererProps extends RendererProps {
    itemCount: number;
    itemSize: number;
}

export interface VariableListRendererProps extends Omit<ListRendererProps, "itemSize"> {
    itemSize: (index: number) => number
}

export interface ItemProps {
    rowIndex: number;
    style: JSX.CSSProperties;
}

export type TWindow = [number, number];

export type TItemSizeMetadata = Map<
    number,
    {
        height: number;
        top?: number;
    }>