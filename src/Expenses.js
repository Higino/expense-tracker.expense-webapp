import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import './App.css';



class Expenses extends Component {

    constructor(props){
      super(props)

      this.state = { 
        isLoading :true,
        categories:[],
        expenses : [],
        date :new Date(),
        expenseItem : {
          id:0,
          description : 'Test' ,
          expenseDate : new Date(),
          location : 'Test location',
          category : {id:2 , name:'Security'}
        }
      }

       this.handleSubmit      = this.handleSubmit.bind(this);
       this.handleChange      = this.handleChange.bind(this);
       this.deleteExpense     = this.deleteExpense.bind(this);
    } 

    toggle() {
      let {modal} = this.state;
      modal = !modal;
      this.setState({ modal });
    }



    // Hanble the clicking in the sav expense button
    async handleSubmit(event){
      // Prevent enter to submit the form as that is anoying
      event.preventDefault();

      const {expenseItem} = this.state;
      await fetch('/api/expense', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type' :  'application/json'
        },
        body: JSON.stringify(expenseItem)
      }).then(() => {
        this.fetchExpenses();
      });
    }
    
    // Handle the change of text fields in the form
    async handleChange(event){
      const target= event.target;
      const value= target.value;
      const name = target.name;
      let expenseItem={...this.state.expenseItem};

      if( name === "category") {
        let newCategory = { 
          id: event.target.childNodes[target.selectedIndex].getAttribute('id'),
          name: value
        };
        expenseItem.category = newCategory;
      } else {
        expenseItem[name] = value;
      }

      this.setState({expenseItem});
      console.log(expenseItem);
    }


    async deleteExpense(id) {
      await fetch(`/api/expense/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'applicatiojn/json',
          'Content-Type' : 'application/json'
        }
      }).then(() => {
          this.fetchExpenses();
      });
    }

    async fetchExpenses() {
      this.setState({isLoading: true});
      const expensesResponse = await fetch('/api/expenses');
      const expensesBody = await expensesResponse.json();

      this.setState({expenses: expensesBody, isLoading: false});

    }

    async fetchCategories() {
      this.setState({isLoading: true});
      fetch('/api/categories').then( resp => {
        if( resp.status === 200)
          this.setState({categories : resp.json() , isLoading: false});
        else
          this.setState({categories : [{name: 'None'}] , isLoading: false});
      });
    }
    
    async componentDidMount () {
        this.fetchCategories();
        this.fetchExpenses();
    }

    render () {
        const {categories, expenses, isLoading} = this.state;
        
        if( isLoading ) 
            return (<div>Loading ...</div>)

        return (
        <div className="row"> 
            <Container> 
            <h3>Add Expenses</h3>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup className="col-md-10 mb-2">
                    <Label for="description">Title </Label>
                    <Input type="description" name="description" id="description" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup className="col-md-4 mb-2">
                    <Label for="category">Category: </Label>
                    <select name="category" defaultValue={this.state.expenseItem.category.name} onChange={this.handleChange}>
                    {
                        categories.map( category => 
                            <option key={category.id} id={category.id}>{category.name}</option>
                        )

                    }
                    </select>
                </FormGroup>

                <FormGroup className="col-md-4 mb-2">
                    <Label for="expenseDate">Expense Date:</Label>
                    <DatePicker selected={this.state.expenseItem.expenseDate} onChange={this.handleDateChange} />
                </FormGroup>

                <FormGroup className="col-md-4 mb-2">
                    <Label for="location">Location</Label>
                    <Input type-="text" name="location" id="location" onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/">Cancel</Button>
                </FormGroup>
            </Form>
            </Container>
            <Container>
              <h3>Expense List</h3>
              <Table>
                <thead>
                  <tr>
                  <th >Description</th>
                  <th width='20%'>Location</th>
                  <th width='20%'>Category</th>
                  <th width='10%'>Action</th>
                  </tr>
                </thead>
                <tbody>
                {
                  expenses.map( expense => 
                      <tr key={expense.id} id={expense.id}>
                        <td>{expense.description}</td>
                        <td>{expense.location}</td>
                        <td>{expense.category.name}</td>
                        <td>
                          <Button size='sm' color='danger' onClick={() => {this.deleteExpense(expense.id)}}>Remove</Button>
                        </td>
                      </tr>
                  )
                }
                </tbody>
              </Table>
            </Container>
        </div>
        )
    }
}

export default withRouter(Expenses);

/*
class Expsenses extends Component {

  // {
  //   "id": 100,
  //   "expensedate": "2019-06-16T17:00:00Z",
  //   "description": "New York Business Trip",
  //   "location": "New York",
  //   "category": {
  //   "id": 1,
  //   "name": "Travel"
  //   }
  //   },
 
    emptyItem = {
        description : '' ,
        expensedate : new Date(),
        id:104,
        location : '',
        category : {id:1 , name:'Travel'}
    }

    
    constructor(props){
      super(props)

      this.state = { 
        isLoading :false,
        Categories:[],
        Expsenses : [],
        date :new Date(),
        item : this.emptyItem
       }

       this.handleSubmit= this.handleSubmit.bind(this);
       this.handleChange= this.handleChange.bind(this);
       this.handleDateChange= this.handleDateChange.bind(this);

    } 

    async handleSubmit(event){
     
      const item = this.state.item;
    

      await fetch(`/api/expenses`, {
        method : 'POST',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(item),
      });
      
      event.preventDefault();
      this.props.history.push("/expenses");
    }


    handleChange(event){
      const target= event.target;
      const value= target.value;
      const name = target.name;
      let item={...this.state.item};
      item[name] = value;
      this.setState({item});
      console.log(item);
    }


    handleDateChange(date){
      let item={...this.state.item};
      item.expensedate= date;
      this.setState({item});
    
    }






    async remove(id){
        await fetch(`/api/expenses/${id}` , {
          method: 'DELETE' ,
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }

        }).then(() => {
          let updatedExpenses = [...this.state.Expsenses].filter(i => i.id !== id);
          this.setState({Expsenses : updatedExpenses});
        });

    }


    async componentDidMount() {
 
     

        const response= await fetch('/api/categories');
        const body= await response.json();
        this.setState({Categories : body , isLoading :false});


        const responseExp= await fetch('/api/expenses');
        const bodyExp = await responseExp.json();
        this.setState({Expsenses : bodyExp , isLoading :false});
        console.log(bodyExp);

    }





    render() { 
        const title =<h3>Add Expense</h3>;
        const {Categories} =this.state;
        const {Expsenses,isLoading} = this.state;
        

        if (isLoading)
            return(<div>Loading....</div>)
        


        let optionList  =
                Categories.map( (category) =>
                    <option value={category.id} key={category.id}>
                                {category.name} 
                    </option>
                )
        
        let rows=
            Expsenses.map( expense =>
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.location}</td>
                <td><Moment date={expense.expensedate} format="YYYY/MM/DD"/></td>
                <td>{expense.category.name}</td>
                <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td>

              </tr>


            )
        

        return (
            <div>
                <AppNav/>
                <Container>
                    {title}
                    
                    <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="description">Title</Label>
                        <Input type="description" name="description" id="description" 
                            onChange={this.handleChange} autoComplete="name"/>
                    
                    </FormGroup>

                    <FormGroup>
                        <Label for="category" >Category</Label>
                        <select onChange={this.handleChange}>
                                {optionList}
                        </select>
                    
                    </FormGroup>

                    <FormGroup>
                        <Label for="city">Date</Label>
                        <DatePicker    selected={this.state.item.expensedate}  onChange={this.handleDateChange} />
                    </FormGroup>

                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                        <Label for="location">Location</Label>
                        <Input type="text" name="location" id="location" onChange={this.handleChange}/>
                        </FormGroup>
                      
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>
                    </Form>
                </Container>
              

          {''}
              <Container>
                <h3>Expense List</h3>
                <Table className="mt-4">
                <thead>
                  <tr>
                    <th width="30%">Description</th>
                    <th width="10%">Location</th>
                    <th> Date</th>
                    <th> Category</th>
                    <th width="10%">Action</th>
                  </tr>
                </thead>
                <tbody>
                   {rows}
                </tbody>

                </Table>
              </Container>

          }

        </div>

        );
    }
}
 */
