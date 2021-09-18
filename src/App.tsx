import { Component } from "solid-js";
import FixedListRenderer from "./components/FixedListRenderer";
import VariableListRenderer from "./components/VariableListRenderer";
import { ItemProps } from "./types/Render.types";

const Row: Component<ItemProps> = ({ rowIndex, style }) => (
  <div style={style}>Row {rowIndex}</div>
);

const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));

const getItemSize = (index) => rowHeights[index];

const App: Component = () => {
  return (
    // <FixedListRenderer
    //   height={500}
    //   width={100}
    //   itemCount={200}
    //   itemSize={20}
    //   renderer={Row}
    // ></FixedListRenderer>
    <VariableListRenderer
      height={500}
      width={100}
      itemCount={1000}
      itemSize={getItemSize}
      renderer={Row}
    ></VariableListRenderer>
  );
};

export default App;
