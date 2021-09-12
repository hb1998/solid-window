import { Component } from "solid-js";
import FixedListRenderer, { ItemProps } from "./components/FixedListRenderer";

const Row: Component<any> = ({ rowIndex, style }) => (
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
