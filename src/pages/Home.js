import { Button, Drawer, DataGrid, SearchInput } from 'components';
import { TABLE_DATA } from 'config/constants';
import useLocalStorage from 'hooks/useLocalStorage';
import AppLayout from 'layouts/AppLayout';
import moment from 'moment';
import { useMemo, useState, useEffect, useCallback } from 'react';
import HistorySheet from 'sheets/HistorySheet';

function Home() {
  const [data, setData] = useLocalStorage('tableData', TABLE_DATA);
  const [history, setHistory] = useLocalStorage('tableHistory', []);

  const [filteredData, setFilteredData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const columns = useMemo(() => Object.keys(data?.[0] || {}), []);

  useEffect(() => {
    const updatedData = JSON.parse(JSON.stringify(data));
    setFilteredData(updatedData);
  }, []);

  const updateTable = (coords, newValue) => {
    const { x, y } = coords;
    const updatedData = [...data];
    updatedData[Number(x)][columns[Number(y)]] = newValue;
    setData(updatedData);

    const date = moment().format('MMMM DD, YYYY');
    const time = moment().format('HH:mm');
    const newEntry = { ...coords, date, time };
    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
  };

  const handleSearchChange = useCallback((searchTerm) => {
    const updatedFilteredData = data.filter((entry) => {
      const values = Object.values(entry);
      for (let i = 0; i < values.length; i++) {
        // console.log('VALUES ', values);
        if (`${values[i]}`?.toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        }
      }
    });
    setFilteredData(updatedFilteredData);
  }, []);

  return (
    <AppLayout>
      <header className="mb-8">
        <h1 className="font-semibold text-lg mb-4.5">React Data grid</h1>
        <p className="text-sm">
          A data grid is an architecture or set of services that gives
          individuals or groups of users the ability to access, modify and
          transfer extremely large amounts of geographically distributed data
          for research purposes
        </p>
      </header>
      <div className="card">
        <div className="flex justify-between mb-5">
          <SearchInput onChange={handleSearchChange} />
          <Button icon="history" onClick={() => setIsOpen(!isOpen)}>
            History
          </Button>
        </div>
        <DataGrid
          data={filteredData}
          updateTable={updateTable}
          columns={columns}
        />
      </div>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} position="right">
        <HistorySheet onClose={() => setIsOpen(false)} />
      </Drawer>
    </AppLayout>
  );
}

export default Home;
