import React, { Component } from 'react';
import { Card, CardHeader, CardText, Col, Container, Row, CardBody } from 'reactstrap';


class Category extends Component {

    state = {  
        isLoading : true,
        Categories : []
    }
 
    async componentDidMount(){
        fetch('/api/categories').then ( resp => {
            if( resp.status === 200)
                this.setState({Categories : resp , isLoading: false});
            else
                this.setState({Categories : [{name: "No categories found"}] , isLoading: false});
        });
        /*const response=await fetch('/api/categories');
        const body = await response.json();
        this.setState({Categories : body , isLoading: false});
        */
    }

    render() { 
        const {Categories , isLoading} = this.state;
        if(isLoading) 
            return (<div>Loading...</div>);
        
        return ( 
            
                <div>
                    <Container className="themed-container">
                    <h2>Categories</h2>
                    <Row>
                    {
                        Categories.map( category => 
                            
                            <Col key={category.id} sm={{ size: '4', offset: 0 }}>
                                <div id={category.id}>
                                <Card>
                                    <CardHeader>{category.name}</CardHeader>
                                    <CardBody>    
                                        <CardText>{category.description}</CardText>
                                        {/* <Button>Edit</Button> */}
                                    </CardBody>
                                </Card>
                                </div>
                            </Col>
                        )
                    }
                    </Row>
                    </Container>
                </div>
         );
    }
}
 
export default Category;