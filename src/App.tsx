import { Component, createSignal, For } from "solid-js";

import styles from "./App.module.css";

const listData =  new Array(1000).fill(null).map((_,index)=>({
  name:`Label-${index}`,
  height:30
}))

const App: Component = () => {
  const [list, setList] = createSignal(listData);
  const [window, setWindow] = createSignal([1,10]);
  const calculatedHeight = listData.length * 30;

  const [startIdx,endIdx] = window();
  const renderedList = list().slice(startIdx,endIdx)
  return (
    <div class={styles.App} >
      <div style={{
        "min-height":`${calculatedHeight}px`
      }} className={styles.container}>
      <For each={renderedList} fallback={<div>Loading...</div>}>
      {(item) => <div>{item.name}</div>}
      </For>
      </div>
    </div>
  );
};

export default App;
