import { Component } from "solid-js";
import FixedGridRenderer from "./components/FixedGridRenderer";
import FixedListRenderer from "./components/FixedListRenderer";
import VariableListRenderer from "./components/VariableListRenderer";
import { GridItemProps, ListItemProps } from "./types/Render.types";

const Row: Component<ListItemProps> = ({ rowIndex, style }) => (
  <div style={style}>Row {rowIndex}</div>
);

const Cell: Component<GridItemProps> = ({ rowIndex,columnIndex, style }) => {
  if(rowIndex === 0 && columnIndex === 0) {
    return null
  }
  if(rowIndex === 0) {
    return <div style={style}> {`Column ${columnIndex}`}</div>
  }
  if(columnIndex === 0) {
    return <div style={style}> {`Row ${rowIndex}`}</div>
  }
  return <div style={style}> {`${rowIndex} ${columnIndex}`}</div>
};

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
    //   rowCount={20}
    //   renderer={Row}
    // ></FixedListRenderer>
    // <VariableListRenderer
    //   height={500}
    //   width={100}
    //   itemCount={1000}
    //   itemSize={getItemSize}
    //   renderer={Row}
    // ></VariableListRenderer>
    <FixedGridRenderer
      height={500}
      width={500}
      rowCount={200}
      rowSize={20}
      columnCount={20}
      columnSize={100}
      renderer={Cell}
    ></FixedGridRenderer>
  );
};

export default App;
