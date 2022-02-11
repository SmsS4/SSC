import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import React from 'react'
import { Home } from './Home';
import { About } from './About';
import { NoMatch } from './NoMatch';
import Sidebar from './components/Sidebar';
import {search, searchBlogs, searchWriters, getBlogs, setPageSize} from './StrApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AntSideBar from './components/AntSideBar'
import ListViewer from './ListShower';
import {STR_API_ADDRESS} from './config'

function App() {
  // setPageSize(1);
  search((x) => {console.log(x)}, "agha", 1);
  
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
        {/* <AntSideBar />
         */}
        
        <NavigationBar />
        <Sidebar />

        

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/search" component={ListViewer} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </React.Fragment>
    </>
  );
}

export default App;
