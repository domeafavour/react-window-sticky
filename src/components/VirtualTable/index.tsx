import React, { PropsWithChildren, useState } from 'react';
import { GridChildComponentProps, VariableSizeGrid } from 'react-window';

type ItemData = {
  name: string;
  toggleChecked: (rowIndex: number) => void;
  list: Item[];
};

type Item = {
  key: string;
  checked: boolean;
  index: number;
};

type ColumnType = {
  key: keyof Item;
  width: number;
  sticky?: boolean;
};

const columns: ColumnType[] = [
  //
  { key: 'index', width: 50, sticky: true },
  { key: 'checked', width: 50 },
  { key: 'key', width: 300 },
  { key: 'key', width: 300 },
  { key: 'key', width: 300 },
  { key: 'key', width: 300 },
  { key: 'key', width: 300 },
  { key: 'key', width: 300 },
  { key: 'key', width: 300 },
];

function VirtualCell({
  style,
  columnIndex,
  rowIndex,
  data,
}: GridChildComponentProps<ItemData>) {
  const { list, toggleChecked } = data;
  const column = columns[columnIndex];
  const row = list[rowIndex];

  if (column.sticky) {
    return null;
  }

  return (
    <div
      style={{
        ...style,
        borderRight: '1px solid #f00',
        borderBottom: '1px solid #f00',
        transition: 'all .3s',
        background: row.checked ? '#3d82e5' : 'transparent',
        color: row.checked ? '#fff' : 'inherit',
        boxSizing: 'border-box',
      }}
      onClick={() => {
        toggleChecked(rowIndex);
      }}
    >
      {JSON.stringify(row[column.key])}
    </div>
  );
}

const initialData = Array.from(
  { length: 10000 },
  (_, index) =>
    ({
      key: crypto.randomUUID(),
      checked: false,
      index,
    } as Item)
);

const InnerElementType = React.forwardRef<HTMLDivElement, PropsWithChildren>(
  ({ children, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <div
          style={{
            position: 'sticky',
            left: 0,
            width: 50,
            background: '#f00',
            zIndex: 1,
          }}
        >
          STK
        </div>
        {children}
      </div>
    );
  }
);

const VirtualTable: React.FC = () => {
  const [data, setData] = useState(initialData);

  function toggleChecked(rowIndex: number) {
    setData((prev) =>
      prev.map((item, index) => {
        if (rowIndex === index) {
          return { ...item, checked: !item.checked };
        }
        return item;
      })
    );
  }

  return (
    <VariableSizeGrid
      height={300}
      rowCount={data.length}
      width={500}
      columnCount={columns.length}
      columnWidth={(columnIndex) => columns[columnIndex].width}
      rowHeight={() => 52}
      itemData={{ name: 'grid', list: data, toggleChecked }}
      style={{ border: '1px solid #f00' }}
      innerElementType={InnerElementType}
    >
      {VirtualCell}
    </VariableSizeGrid>
  );
};

export default VirtualTable;
