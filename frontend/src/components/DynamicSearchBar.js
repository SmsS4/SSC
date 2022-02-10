// import React, { useState } from 'react'
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import SearchBar from "material-ui-search-bar";

// const DynamicSearchBar = () => {
  
//   const [myOptions, setMyOptions] = useState([])
  
//   const getDataFromAPI = () => {
//     console.log("Options Fetched from API")
//     myOptions.push("hey12");
//     myOptions.push("alooo");
//     setMyOptions(myOptions);
//     console.log(myOptions);
//     // fetch('http://dummy.restapiexample.com/api/v1/employees').then((response) => {
//     //   return response.json()
//     // }).then((res) => {
//     //   console.log(res.data)
//     //   for (var i = 0; i < res.data.length; i++) {
//     //     myOptions.push(res.data[i].employee_name)
//     //   }
//     //   setMyOptions(myOptions)
//     // })
//   }
  
//   return (
//     <div style={{ background:'white', color:'white',  marginLeft: '60px'}}>
//       <Autocomplete
//         style={{color: 'white' }}
//         freeSolo
//         autoComplete
//         autoHighlight
//         options={myOptions}
//         renderInput={(params) => (
//           <SearchBar {...params}
//             onChange={getDataFromAPI}
//             variant="outlined"
//             label="Search Box"
//           />
//         )}
//       />
//     </div>
//   );
// }
  
// export default DynamicSearchBar