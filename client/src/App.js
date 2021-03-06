
import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom';

import Login from "./components/Login";
import Register from "./components/Register";
import AddInsurance from "./components/Insurance/AddInsurance";
import GetInsurance from "./components/Insurance/GetInsurance";
import EditInsurance from "./components/Insurance/EditInsurance";
import EditApp from "./components/Insurance/EditApp";
import AddApp from "./components/Insurance/AddApp";
import GetApp from "./components/Insurance/GetApp";
import Myapp from "./components/Insurance/Myapp";
import DashBoard from './dashboard/Dashboard';
import Home from './template/home';
import withAuth from './tools/withAuth';
import Navbar from './components/Navbar';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Contact from './components/Contact';
import AddCarpooling from './components/Carpooling Crud/addCarpooling'
import CarpoolingList from './components/Carpooling Crud/carpoolingList'
import EditCarpooling from './components/Carpooling Crud/editCarrpooling'
import AddComment from './components/Carpooling Crud/addComment'
import ListComments from './components/Carpooling Crud/ListComments'
import CarpoolingDetails from './components/Carpooling Crud/carpoolingDetails'
import ParcelPict from './components/Carpooling Crud/parcelPict'
import Map from './components/Carpooling Crud/map'
import simpleForm from './components/Carpooling Crud/simpleForm'
import review from './components/Carpooling Crud/review'
import Results from './components/Carpooling Crud/results'
import Chat from './components/Chat'








import { Claim } from './components/Claim/Claim';
import AllClaim from './components/Claim/AllClaim';
import Test from "./components/Claim/Test";
import Onne from "./components/Claim/Onne";
import Posts from "./components/Posts";
import { ClaimsList } from './components/Claim/claimsList';

class App extends Component {
  render() {
    const current_url = window.location.href;
    let is_dashboard = current_url.split("/")[3];
    console.log("is_dashboard", is_dashboard)
    return (
      <div>


        <Router>
          {is_dashboard === undefined ? <Navbar /> : null}

          <div>
            <Route path="/chat" component={Chat} />
            <Switch>

              <Route path="/dashboard" component={DashBoard} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route path="/claim" component={Claim} />
              <Route path='/all' component={AllClaim} />
              <Route path='/addins/:id' component={AddInsurance} />
              <Route path='/getins/:id' component={GetInsurance} />
              <Route path='/editins/:id' component={EditInsurance} />
              <Route path='/addapp/:id' component={AddApp} />
              <Route path='/getapp/:idap' component={GetApp} />
              <Route path='/myapp' component={Myapp} />
              <Route path='/editapp/:idap' component={EditApp} />

              <Route path='/claimsList' component={ClaimsList} />


              <Route path="/all" component={AllClaim} />
              <Route path="/test" component={Test} />


              <Route path="/onne/:id" component={Onne} />

              <Route exact path="/posts" component={Posts} />


              <Route exact path='/' component={Home} />
              <Route path='/addCarpooling' component={AddCarpooling} />
              <Route path='/carpoolingList' component={CarpoolingList} />
              <Route path='/editCarpooling/:id' component={EditCarpooling} />
              <Route path='/addComment/:id' component={AddComment} />
              <Route path='/listComments/:id' component={ListComments} />
              <Route path='/carpoolingDetails/:id' component={CarpoolingDetails} />
              <Route path='/parcelPict/:id' component={ParcelPict} />
              <Route path='/map' component={Map} />
              <Route path='/simpleForm' component={simpleForm} />
              <Route path='/review' component={review} />
              <Route path='/results' component={Results} />

              <Route path='/about' component={About} />
              <Route path='/services' component={Services} />

              <Route path='/portfolio' component={Portfolio} />
              <Route path='/blog' component={Blog} />
              {/* <Route exact Path='/contact' component={Contact} /> */}



            </Switch>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;