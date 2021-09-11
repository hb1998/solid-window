import { Component, createSignal, For } from "solid-js";
import styles from "../App.module.css";


interface ListRendererProps {
    height: number;
    itemCount: number;
    itemSize: number;
    width: number;
    overscanCount?: number;
}
type TWindow = [number, number];

const ListRenderer: Component<ListRendererProps> = ({
    height,
    itemCount,
    itemSize,
    width,
    children,
    overscanCount = 5
}) => {

    const initialWindow = Math.ceil(height / itemSize);

    const [window, setWindow] = createSignal<TWindow>([0, initialWindow]);

    const [list, setList] = createSignal(getWindowItems(window()));

    return (
        <div class={styles.wrapper} >
            <div style={{
                "min-height": `${height}px`
            }} className={styles.container}>
                <For  each={list()} fallback={<div>Loading...</div>}>
                    {
                        (item) =>
                            <div style={{ height: `${item.height}px` }} >
                                {item.name}
                            </div>
                    }
                </For>
            </div>
        </div>
    );
};

function getWindowItems([startIdx, endIndex]: [number, number]):number[] {
    const items = [];

    for (let i = startIdx; i < endIndex; i++) {
        items.push({
            rowIndex:i,
            style:{

            }
        })
    }
    return items;
}

export default ListRenderer;