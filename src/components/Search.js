import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useState } from 'react';

function Search({ debouncedShowSearchData }) {
  const [inputValue, setInputValue] = useState('');

  function handleInputValue(evt) {
    debouncedShowSearchData(evt.target.value);
    setInputValue(evt.target.value);
  }

  return (
    <Input
      type="search"
      size="large"
      placeholder="Type to search"
      prefix={<SearchOutlined />}
      className="search"
      value={inputValue}
      onChange={(evt) => handleInputValue(evt)}
    />
  );
}
export default Search;
