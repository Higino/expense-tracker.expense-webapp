  
import React, { Component } from 'react';
import {Nav,Navbar,NavItem,NavbarBrand, NavLink, NavbarText} from 'reactstrap';


class AppNav extends Component {
    state = {  }
    render() {
        return (
          <div>
            <Navbar color="dark" dark expand="md">
              <NavbarBrand href="/">Home</NavbarBrand>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <NavLink href="/categories">Categories</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/expenses">Expenses</NavLink>
                  </NavItem>
                </Nav>
                <NavbarText>Expense Traker</NavbarText>
            </Navbar>
          </div>
        );
      }
}
 
export default AppNav;