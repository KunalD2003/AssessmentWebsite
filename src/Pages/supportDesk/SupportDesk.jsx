import { Col, Container, Row } from "react-bootstrap";
import "./SupportDesk.css";
import { useEffect, useState } from "react";
import axios from "axios";

export function SupportDesk() {
  const [supportData, setSupportData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/contacts");
        console.log(response)
        setSupportData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="mainContainer">
        <Container>
          <Row>
            <Col lg={3} className="boxDesign">
              <h6 className="containerTextHead">Name</h6>
            </Col>
            <Col lg={4} className="boxDesign">
              <h6 className="containerTextHead">Email</h6>
            </Col>
            <Col lg={2} className="boxDesign">
              <h6 className="containerTextHead">Mobile</h6>
            </Col>
            <Col lg={3} className="boxDesign">
              <h6 className="containerTextHead">Message</h6>
            </Col>
          </Row>
        </Container>

        {supportData.map((item, index) => (
          <Container>
            <Row>
              <Col lg={3} className="boxDesign">
                <h5 className="containerText">{item.name}</h5>
              </Col>
              <Col lg={4} className="boxDesign">
                <h5 className="containerText">{item.email}</h5>
              </Col>
              <Col lg={2} className="boxDesign">
                <h5 className="containerText">{item.mobile}</h5>
              </Col>
              <Col lg={3} className="boxDesign">
                <h5 className="containerText">{item.message}</h5>
              </Col>
            </Row>
          </Container>
        ))}
      </div>
    </>
  );
}
// http://localhost:3001/contacts
