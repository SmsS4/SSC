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
import {search, searchBlogs, searchWriters, getBlogs, setPageSize} from './StrApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListViewer from './ListShower';
import {STR_API_ADDRESS} from './config'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { SEARCH_FOR_BLOGS_AND_WRITERS } from './enums';





function App() {
  const [listViewerSearchFor, setListViewerSearchFor] = useState('nothing');
  const [searchBarValue, setSearchBarValue] = useState(null);

  function searchBlogsAndWriters(value, history) {
    setListViewerSearchFor(SEARCH_FOR_BLOGS_AND_WRITERS);
    setSearchBarValue(value);
    history.push("/search")
  }

  const searchForMethods = {
    SEARCH_FOR_BLOGS_AND_WRITERS: (callback, pageNumber) => {search(callback, searchBarValue, pageNumber)}
  }

  function listViewerCallback(callback, pageNumber) {
    console.log("list viewr is looking for", listViewerSearchFor)
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
        <NavigationBar searchBlogsAndWriters={searchBlogsAndWriters}/>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/search">
            <ListViewer getDataMethod={listViewerCallback} listViewerSearchFor={listViewerSearchFor} />
          </Route>
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </React.Fragment>
    </>
  );
}

export default App;
