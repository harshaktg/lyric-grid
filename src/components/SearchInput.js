import { useState, useCallback, useEffect } from 'react';
import { BUTTON_MAP } from 'config/constants';

function SearchInput({ icon = 'search', onChange }) {
  const [search, setSearch] = useState('');

  const handleChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  useEffect(() => {
    onChange && onChange(search);
  }, [search]);

  return (
    <div className="h-7.5 border-black border-opacity-20 w-96 border rounded-5 flex items-center">
      <input
        type="search"
        placeholder="Search for data..."
        className="outline-none text-xs px-3 my-2 flex-auto"
        value={search}
        onChange={handleChange}
      />
      <button type="submit" className="flex items-center">
        <img src={BUTTON_MAP[icon]} alt="History" className="inline pr-2" />
      </button>
    </div>
  );
}

export default SearchInput;
