import React, { useEffect, useState } from 'react';
import { Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import BrowserLocation from './BrowserLocation';


const CurrentLocation = () => {
    const [weather, setWeather] = useState(null)
    const [location, setLocation] = useState('')

    //const location = "london"
    const searchUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=8d45afb7921fd74c51f9b550de32fce8`

    const handleChange = (e) => {
        setLocation(e.target.value)
    }
    // Fetch data ---------------------------------
    const fetchData = async (searchUrl) => {
        try {
            const response = await fetch(searchUrl)
            if (!response.ok) {
                alert('Error fetching results')
                return
            }
            const data = await response.json()
            setWeather(data)
        } catch (error) {
            console.log(error);
        }
        return searchUrl
    }
    // Search forcast by location-------------------
    const handleSubmit = async (e) => {
        e.preventDefault()
        fetchData(searchUrl)
    }
    useEffect(() => {
        // console.log("data : " + data.city.name)
        // console.log("location : " + location)
    }, [weather, location])

    return (
        <Container>
            <Row xs={10} className="mt-5">

                <Form style={{ flexGrow: '1', display: "flex", alignItems: "center" }} onSubmit={handleSubmit}>
                    <Form.Label style={{ fontSize: "35px", fontWeight: "bold", marginRight: "10px" }}>WEATHER</Form.Label>
                    <Form.Control
                        type="search"
                        value={location}
                        onChange={handleChange}
                        placeholder="type and press Enter"
                    />
                </Form>
            </Row>
            <Row xs={10} className="mt-2">
                <Col xs={5} className="bg-info">
                    <BrowserLocation />
                </Col>
                <Col xs={7} className="bg-info">
                    {weather !== null &&
                        <ListGroup>

                            <ListGroup.Item>{weather.city.name}</ListGroup.Item>
                            <ListGroup.Item>{weather.city.country}</ListGroup.Item>
                            <ListGroup.Item>{weather.city.timezone}</ListGroup.Item>
                            <ListGroup.Item>{weather.cnt}°F</ListGroup.Item>

                        </ListGroup>}

                    <ListGroup>
                        {weather !== null && weather.list.map((item, i) => (
                            <ListGroup.Item key={i}>
                                <span>Item dt : {item.dt}--</span>
                                <span>Wind Speed : {item.wind.speed}</span>
                                <span>{item.dt}</span>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>


        </Container>
    );

}



export default CurrentLocation