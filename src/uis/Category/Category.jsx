import React,{ useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../services/Api";
import {Container, Row, Col, Card, Button} from "react-bootstrap";
import Sidebar from "../Sidebar";
import './style.css'
export default function Category() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Category";
        if (window.localStorage["token"] === undefined) navigate("/login");
        let token = JSON.parse(window.localStorage["token"]);
        if (token["access-token"] === undefined
            || token["refresh-token"] === undefined
            || token["expired-at"] === undefined) navigate("/login");
    }, [navigate]);

    const handleLogout = async () => {
        await new Api().logout();
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (      
            <Container fluid>
                <Row>
                    <div className="container-fluid bg-dark text-white p-2 d-flex justify-content-between">
                        <h2>Logo</h2>
                        <button className="btn btn-info mx-5 px-4" style={{ fontWeight: "bolder", fontSize: "1.2rem" }} onClick={handleLogout}>Log out</button>
                    </div>
                </Row>
                <Row>   
                   
                    <Col  id="page-content-wrapper" style={{margin: "0.5rem 0 0.5rem 0"}}>
                        <h2 style={{ margin: "2rem" }}>Explore new languges!</h2>  
                        <div className="options">
                        <Card style={{ width: "25rem", height:"28rem" }}>
                            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/assets/image/England.jpg'} alt="English" />
                            <Card.Body>
                                <Card.Title>English</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit..
                                </Card.Text>
                                <Button variant="primary">Try it!</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: "25rem" , height:"28rem"}}>
                            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/assets/image/England.jpg'} alt="English" />
                            <Card.Body>
                                <Card.Title>English</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit..
                                </Card.Text>
                                <Button variant="primary">Try it!</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: "25rem", height:"30rem" }}>
                            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/assets/image/England.jpg'} alt="English" />
                            <Card.Body>
                                <Card.Title>English</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit..
                                </Card.Text>
                                <Button variant="primary">Try it!</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: "25rem" }}>
                            <Card.Img variant="top" src={process.env.PUBLIC_URL + '/assets/image/England.jpg'} alt="English" />
                            <Card.Body>
                                <Card.Title>English</Card.Title>
                                <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit..
                                </Card.Text>
                                <Button variant="primary">Try it!</Button>
                            </Card.Body>
                        </Card>
                        </div>
                        
                    </Col> 
                    
                </Row>
                <Row>
                    <footer className="container-fluid bg-dark text-white mt-auto p-2">
                        <p>"It's never too late to start a new adventure!" - Unknown</p>
                    </footer>
                </Row>
            </Container>
    );
}
