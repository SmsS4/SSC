import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from './components/NavigationBar';
import React from 'react'
import { Home } from './Home';
import { About } from './About';
import { NoMatch } from './NoMatch';
import Sidebar from './components/Sidebar';
import {search, searchBlogs, searchWriters, getBlogs, setPageSize, searchTags} from './StrApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListViewer from './ListShower';
import {STR_API_ADDRESS} from './config'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import {SEARCH_FOR_BLOGS, SEARCH_FOR_WRITERS, SEARCH_FOR_BLOGS_AND_WRITERS, SEARCH_FOR_TAGS } from './enums';





function App() {
  const [listViewerSearchFor, setListViewerSearchFor] = useState(
    SEARCH_FOR_BLOGS_AND_WRITERS
  );
  const [searchBarValue, setSearchBarValue] = useState(null);
  const [reRender, setReRender] = useState(0)
  // const pathAndSearchFor = [
  //   ["/writers", SEARCH_FOR_WRITERS],
  //   ["/tags", SEARCH_FOR_TAGS],
  //   ["/search", SEARCH_FOR_BLOGS_AND_WRITERS],
  //   ["/blogs", SEARCH_FOR_BLOGS],
  // ]
  // function goToPath(history) {
  //   console.log(listViewerSearchFor)
  //   for (let i = 0; i < pathAndSearchFor.length; i++) {
  //     if (listViewerSearchFor == pathAndSearchFor[i][1]) {
  //       /// history.push(pathAndSearchFor[i][0])
  //       history.push("/search")
  //       break
  //     }
  //   }
  // }

  function onPathChanged(clickedOn, history) {
    setListViewerSearchFor(clickedOn)
    // for (let i = 0; i < pathAndSearchFor.length; i++) {
    //   if (newPath == pathAndSearchFor[i][0]) {
    //     setListViewerSearchFor(pathAndSearchFor[i][1])
    //     break
    //   }
    // }
    history.push("/search")
    setReRender(reRender + 1);
    
  }

  function onChangeSearch(newValue, history) {
    setSearchBarValue(newValue);
    setReRender(reRender + 1);
    history.push("/search")
    // goToPath(history)
  }

  const searchForMethods = {
    SEARCH_FOR_BLOGS_AND_WRITERS: (callback, pageNumber) => {search(callback, searchBarValue, pageNumber)},
    SEARCH_FOR_TAGS: (callback, pageNumber) => {searchTags(callback, searchBarValue, pageNumber)},
    SEARCH_FOR_BLOGS: (callback, pageNumber) => {searchBlogs(callback, searchBarValue, pageNumber)},
    SEARCH_FOR_WRITERS: (callback, pageNumber) => {searchWriters(callback, searchBarValue, pageNumber)},
  }

  function listViewerCallback(callback, pageNumber) {
    searchForMethods[listViewerSearchFor](callback, pageNumber);
  }


  return (
    <>
    <ToastContainer
      position="top-right"
      theme="dark"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    
    <React.Fragment>

      <Router>
        <NavigationBar onChange={onChangeSearch}/>
        <Sidebar onPathChanged={onPathChanged}/>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/about" component={About} /> */}
          <Route path="/search">
            <ListViewer key={reRender} getDataMethod={listViewerCallback} listViewerSearchFor={listViewerSearchFor} />
          </Route>
          {/* <Route path="/tags">
            <ListViewer reRender={2*reRender} key={reRender} searchBarValue={searchBarValue} getDataMethod={listViewerCallback} listViewerSearchFor={SEARCH_FOR_TAGS} />
          </Route>
          <Route path="/writers">
            <ListViewer reRender={2*reRender+1} key={reRender} searchBarValue={searchBarValue} getDataMethod={listViewerCallback} listViewerSearchFor={listViewerSearchFor} />
          </Route> */}
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </React.Fragment>
    </>
  );
}

export default App;
