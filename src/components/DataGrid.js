import { useState } from 'react';

function DataGrid({ data, updateTable, columns }) {
  const [selectedCell, setSelectedCell] = useState(null);
  const [currentCellContent, setCurrentCellContent] = useState('');

  if (!data?.length) return null;

  const handleClick = (e) => {
    setSelectedCell({
      x: e.target.getAttribute('data-x'),
      y: e.target.getAttribute('data-y'),
    });
    setCurrentCellContent(e.target.textContent);
  };

  const handleEdit = (e) => {
    setCurrentCellContent(e.target.value);
  };

  const updateCell = (e) => {
    const isSameData =
      currentCellContent === data[selectedCell.x][columns[selectedCell.y]];
    if (currentCellContent.trim() || !isSameData) {
      updateTable(selectedCell, currentCellContent);
    }
    setSelectedCell(null);
    setCurrentCellContent('');
  };
  return (
    <table className="w-full border-collapse border border-black border-opacity-20 table-fixed">
      <thead>
        <tr className="h-15">
          {columns.map((col, ind) => (
            <th
              key={ind}
              className="uppercase text-xs font-bold bg-primary-color bg-opacity-5 border border-black border-opacity-20"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody onClick={handleClick}>
        {data.map((row, ind) => (
          <tr
            key={ind}
            className={`h-15 ease-in-out ${
              selectedCell?.x !== `${ind}` &&
              'hover:bg-primary-color hover:bg-opacity-80 hover:text-white'
            }`}
          >
            {Object.values(row).map((item, idx) => (
              <td
                key={idx}
                className={`text-center text-sm border border-black border-opacity-20 hover:cursor-pointer ${
                  selectedCell &&
                  selectedCell?.x === `${ind}` &&
                  selectedCell?.y === `${idx}` &&
                  'border-2 border-primary-color border-opacity-100 inset-1'
                }`}
                data-x={ind}
                data-y={idx}
              >
                {selectedCell &&
                selectedCell?.x === `${ind}` &&
                selectedCell?.y === `${idx}` ? (
                  <input
                    className="text-center outline-none"
                    value={currentCellContent}
                    onChange={handleEdit}
                    onBlur={updateCell}
                    autoFocus
                  />
                ) : (
                  item
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataGrid;
