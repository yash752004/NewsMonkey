import './App.css';

import React, { Component } from 'react'
import Navbar from './componets/Navbar'
import News from './componets/news'
import LoadingBar from 'react-top-loading-bar'


import {
  BrowserRouter as Router,
  // Switch in new version replaceto Routes,
  Routes,
  Route,

} from "react-router-dom";


export default class App extends Component {
  pagesize = 15;
  // eslint-disable-next-line no-undef
  apikey= process.env.REACT_APP_NEWS_API

    state={
      process: 0
    }

    setProgress =(progress) =>{
      this.setState({Progress: progress})
    }

    
    render() {
      return (
        <div>

        <Router>
        < Navbar />

          {/* Loading bar */}
          <LoadingBar
            height={3}
            
            color='#f11946'
            progress={this.state.process}
          />

          {/* <News setProgress={this.setProgress} apikey={this.apikeys}  pagesize={this.pagesize} country='in' category='science' /> */}
            <Routes>
              {/* <Route exact path="/General" element={<News setProgress={this.setProgress} apikey={this.apikeys}  Key="General " pagesize={this.pagesize} country='in' category='General' />}>< /Route> */}
              <Route exact path="/Business" element={<News setProgress={this.setProgress} apikey={this.apikeys}  Key={"Business" } pagesize={this.pagesize} country='in' category='Business' />} />
              <Route exact path="/Entertainment" element={<News setProgress={this.setProgress} apikey={this.apikeys}  Key={"Entertailment"} pagesize={this.pagesize} country='in' category='Entertainment' />} />
              <Route exact path="/Health" element={<News setProgress={this.setProgress} apikey={this.apikeys}  Key={"Health"} pagesize={this.pagesize} country='in' category='Health' />} />
              <Route exact path="/Science" element={<News setProgress={this.setProgress} apikey={this.apikeys}  Key={"Science "} pagesize={this.pagesize} country='in' category='Science' />} />
              <Route exact path="/Sports" element={<News setProgress={this.setProgress} apikey={this.apikeys}  Key={"Sports "} pagesize={this.pagesize} country='in' category='Sports' />} />
              <Route exact path="/Technology" element={<News setProgress={this.setProgress} apikey={this.apikeys}  Key={"technology"} pagesize={this.pagesize} country='in' category='Technology' />} />
            </Routes>
          </Router>


      </div>
    )
  }
}
// export default App







