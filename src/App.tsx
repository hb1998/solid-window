import { Component } from "solid-js";
import FixedListRenderer from "./components/FixedListRenderer";
import { ItemProps } from "./types/Render.types";

const Row: Component<ItemProps> = ({ rowIndex, style }) => (
  <div style={style}>Row {rowIndex}</div>
);

const App: Component = () => {
  return (
    <FixedListRenderer
      height={500}
      width={100}
      itemCount={200}
      itemSize={20}
      renderer={Row}
    ></FixedListRenderer>
  );
};

export default App;
