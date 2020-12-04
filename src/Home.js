import React, { Component } from 'react';

class Home extends Component {
    state = { mydata: {} }

    render() { 
        return (
            <div>
              <h2>Expense Web App to add or remove expense requests (SAMPLE APP)</h2>
              
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                App built for demo purposes.                 
              </div>
            </div>
              
            );
    }
}
 
export default Home;