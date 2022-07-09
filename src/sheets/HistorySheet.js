import { BUTTON_MAP } from 'config/constants';
import useLocalStorage from 'hooks/useLocalStorage';
import { useMemo } from 'react';

function HistorySheet({ onClose }) {
  const [history] = useLocalStorage('tableHistory');

  const formattedHistory = useMemo(() => {
    const updatedHistory = new Map();
    history.forEach((hist) => {
      if (updatedHistory.has(hist.date)) {
        updatedHistory.set(hist.date, [...updatedHistory.get(hist.date), hist]);
      } else {
        updatedHistory.set(hist.date, [hist]);
      }
    });
    return updatedHistory;
  }, [history]);

  return (
    <>
      <header className="h-15 bg-primary-color text-white px-5 py-5 flex justify-between items-center">
        <span className="flex items-center">
          <img
            src={BUTTON_MAP['history']}
            alt="History"
            className="inline mr-4"
          />
          <span className="text-lg font-normal">History</span>
        </span>
        <button type="button" onClick={onClose}>
          <img src={BUTTON_MAP['close']} alt="Close" />
        </button>
      </header>
      <div className="flex h-[calc(100%-3.75rem)] w-full">
        <div className="h-full ml-5 border-r border-black border-opacity-20" />
        <div className="-ml-2 w-full mr-4">
          {[...formattedHistory.keys()].map((day, ind) => (
            <HistoryDate
              day={day}
              changes={formattedHistory.get(day)}
              key={`day-${ind}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

const HistoryDate = ({ day, changes }) => {
  return (
    <div className="flex mt-9 mb-19">
      <div className="w-[14px] h-[14px] bg-white border-2 border-primary-color rounded-full mr-4" />
      <div className="w-full">
        <div>
          <div className="uppercase mb-5 font-bold text-xs text-opacity-50 tracking-wider">
            {day}
          </div>
          {changes.map(({ x, y, time }, idx) => (
            <div
              className="flex items-center justify-between mb-4.5 text-sm"
              key={`change-${idx}`}
            >
              <span>
                updated value at row {Number(x) + 1}, column {Number(y) + 1}
              </span>
              <span>{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistorySheet;
