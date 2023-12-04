import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Container, Row, Col, Card, Button} from "react-bootstrap";
import Header from "../Header";
import Footer from "../Footer";
import Api from '../../services/Api'
import './style.css'
export default function Category({ setCategoryid}) {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
     
    useEffect(() => {
        document.title = "Category";
        if (window.localStorage["token"] === undefined) navigate("/login");
        let token = JSON.parse(window.localStorage["token"]);
        if (token["access-token"] === undefined
            || token["refresh-token"] === undefined
            || token["expired-at"] === undefined) navigate("/login");
    }, [navigate]);
    useEffect(() => {
        Api.getAllCategory().then( res => { console.log(res?.data.data); setCategories(res?.data.data);}).catch(err => window.alert(err.message))
    },[]);
   const onChooseLanguage = (id) => {
        setCategoryid(id);
        sessionStorage['categoryId'] = id;
        navigate('/dashboard')
   }
    return (      
            <Container fluid>
                <Header/>
                <Row>   
                    <Col  id="page-content-wrapper" style={{margin: "0.5rem 0 0.5rem 0"}}>
                        <h2 style={{ margin: "2rem" }}>Explore new languges!</h2>  
                        <div className="options">
                            { categories.map(category => (
                            <Card style={{ width: "25rem", height:"24rem" }} key ={category.id}>
                                <Card.Img style={{width:"400px", height:"266px"}} variant="top" src={process.env.PUBLIC_URL + category.imageUrl} alt="English" />
                                <Card.Body>
                                    <Card.Title>{category.name}</Card.Title>
                                    <Button variant="primary" disabled = {category.isActive === 'active' ? false: true} onClick={() => onChooseLanguage(category.id)}>{category.isActive === 'active' ? 'Learn':'Coming soon'}</Button>
                                </Card.Body>
                            </Card>
                            ))}
                        
                        </div>
                        
                    </Col> 
                </Row>
                <Row>
                <Footer/>
                </Row>
                
            </Container>
    );
}
