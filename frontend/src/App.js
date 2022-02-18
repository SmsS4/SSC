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
import {search, searchBlogs, searchWriters, getBlogs, setPageSize, searchTags, getWriter, getBlog, getBlogsByTag} from './StrApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListViewer from './ListShower';
import {STR_API_ADDRESS} from './config'
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import {SEARCH_FOR_BLOGS, SEARCH_FOR_WRITERS, SEARCH_FOR_ALL, SEARCH_FOR_TAGS, SEARCH_FOR_BLOG_BY_TAG } from './enums';
import Profile from './Writer';
import BlogPost from './Blog';




function App() {
  const [listViewerSearchFor, setListViewerSearchFor] = useState(
    SEARCH_FOR_ALL
  );
  const [searchBarValue, setSearchBarValue] = useState(null);
  const [reRender, setReRender] = useState(0)
  const [clickedItem, setClickedItem] = useState(null)

  function onPathChanged(clickedOn, history) {
    setListViewerSearchFor(clickedOn)
    history.push("/search")
    setReRender(reRender + 1);
  }

  function onChangeSearch(newValue, history) {
    setSearchBarValue(newValue);
    setReRender(reRender + 1);
    history.push("/search")
  }

  const searchForMethods = {
    SEARCH_FOR_ALL: (callback, pageNumber) => {search(callback, searchBarValue, pageNumber)},
    SEARCH_FOR_TAGS: (callback, pageNumber) => {searchTags(callback, searchBarValue, pageNumber)},
    SEARCH_FOR_BLOGS: (callback, pageNumber) => {searchBlogs(callback, searchBarValue, pageNumber)},
    SEARCH_FOR_WRITERS: (callback, pageNumber) => {searchWriters(callback, searchBarValue, pageNumber)},
    SEARCH_FOR_BLOG_BY_TAG: (callback, pageNumber) => {
      getBlogsByTag(
        callback,
        clickedItem.title.substr(2),
        pageNumber
      )
    }
  }
  
  function listViewerCallback(callback, pageNumber) {
    searchForMethods[listViewerSearchFor](callback, pageNumber);
  }



  const [writer ,setWritere] = useState(null)
  const [blog ,setBloge] = useState(null)

  function ShowWriter(writer, history) {
    setWritere(writer)
    history.push("/profile")
  }

  function ShowBlog(blogData, history) {
    setBloge(blogData)
    history.push("/blogpost")
  }

  function showTagBlogs(tag, history) {

  }

  function clickCallback(item, history) {
    console.log('clickCallback', item)
    if (item.type == "writer") {
      getWriter(
        (writer) => {ShowWriter(writer, history)},
        item.uid,
      )
    } else if (item.type == 'tag') {
      setClickedItem(item)
      setListViewerSearchFor(SEARCH_FOR_BLOG_BY_TAG)
      setReRender(reRender + 1);
      history.push("/search")
    } else if (item.type == 'blog') {
      // TODO
      // getBlog(
      //   (blogData) => {},
      //   item.uid
      // );
    }
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
          <Route exact path="/">

          </Route>
          <Route exact path="/profile">
            <Profile
              item={writer}
            />
          </Route>
          <Route exact path="/blogpost">
            <BlogPost
              item={blog}
            />
          </Route>
          <Route path="/search">
            <ListViewer
              key={reRender}
              getDataMethod={listViewerCallback}
              listViewerSearchFor={listViewerSearchFor}
              clickCallback={clickCallback}
            />
          </Route>
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </React.Fragment>
    </>
  );
}

export default App;
