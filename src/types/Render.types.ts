import { Component, JSX } from "solid-js";


interface RendererProps<T> {
    height: number;
    width: number;
    overscanCount?: number;
    renderer: Component<T>;
}
export interface ListRendererProps extends RendererProps<ListItemProps> {
    itemCount: number;
    rowCount: number;
}

export interface GridRendererProps extends RendererProps<GridItemProps> {
    rowCount: number;
    rowSize: number;
    columnCount: number;
    columnSize: number;
}

export interface VariableListRendererProps extends Omit<ListRendererProps, "itemSize"> {
    itemSize: (index: number) => number
}

export interface ListItemProps {
    rowIndex: number;
    style: JSX.CSSProperties;
}

export interface GridItemProps {
    rowIndex: number;
    columnIndex: number;
    style: JSX.CSSProperties;
}

export type TWindow = [number, number];

export type TItemSizeMetadata = Map<
    number,
    {
        height: number;
        top?: number;
    }>