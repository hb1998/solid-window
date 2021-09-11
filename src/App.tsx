import { Component, createSignal, For } from "solid-js";
import ListRenderer from "./components/ListRenderer";


const listData = new Array(1000).fill(null).map((_, index) => ({
  name: `Label-${index}`,
  height: 50
}))


const App: Component = () => {

  return (
    <ListRenderer height={500} width={500} itemCount={200} itemSize={20} />
  )
};

export default App;
