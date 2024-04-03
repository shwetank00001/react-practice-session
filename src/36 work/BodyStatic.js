import React from "react";
import { Container, Row, Col, Card } from "reactstrap";

const BodyStatic = () => {
    return (
        <div className="main-content">
            <Container fluid>
                <div className="breadcrumbs">{/* Breadcrumbs component */}</div>
                <div className="page-title">
                    <h2>Dashboard</h2>
                </div>
                <div className="body-content">
                    {/* Main body content */}
                    <Row>
                        <Card>
                            <Col lg="4">Body Details</Col>
                        </Card>
                        <Card>
                            <Col lg="8">Body Details2</Col>
                        </Card>
                    </Row>
                    <Row>
                        <Col lg="12">{/* Additional content */}</Col>
                    </Row>
                    {/* Repeat the structure for other sections */}
                </div>
            </Container>
        </div>
    );
};

export default BodyStatic;
