import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNav from './AppNav';
import Category from './Category';
import Home from './Home';
import Expenses from './Expenses'; 

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <AppNav/>
            <Router>
                <Switch>
                     <Route path='/' exact={true} component={Home}/>
                     <Route path='/categories' exact={true} component={Category}/>
                     <Route path='/expenses' exact={true} component={Expenses}/>
                </Switch>
             </Router>
             </>
        );
    }
}
 
export default App;
