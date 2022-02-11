import SearchBar from "material-ui-search-bar";
import { useState } from "react";



function SearchFiled({callback}) {
    const [value, setValue] = useState("");
    return (
        <SearchBar
            style={{marginLeft: '60px'}}
            onChange={(newValue) => setValue(newValue)}
            value={value}
            onRequestSearch={callback}
            placeholder= {'جست و جو'}
            // onCancelSearch={setValue("")}
        />
    )
}

export default SearchFiled;