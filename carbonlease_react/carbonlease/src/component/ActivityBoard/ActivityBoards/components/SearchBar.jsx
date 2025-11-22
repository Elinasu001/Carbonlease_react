import { useState } from "react";
import { SearchBox } from "../ActivityBoards.styles";

const SearchBar = ({filter, setFilter, onSearch}) => {

  const [keyword, setKeyword] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(keyword);
    }
  };

  return (
      <SearchBox>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setKeyword("");
            }}
          >
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="nickname">닉네임</option>
          </select>

          <input 
            type="text"
            placeholder="검색어를 입력해주세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown} 
          />

          <button onClick={() => onSearch(keyword)}>검색</button>
      </SearchBox>
  )
}

export default SearchBar;