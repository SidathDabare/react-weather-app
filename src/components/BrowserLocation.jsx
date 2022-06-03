import React, { useEffect, useState } from 'react'
import { Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap'
import forcastImages from "./forcastImages.json"

const BrowserLocation = () => {
    const [currentLocation, setSetCurrentLocation] = useState(null)
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=padova&appid=8d45afb7921fd74c51f9b550de32fce8&units=imperial`
    const fetchData = async (url) => {
        try {
            const response = await fetch(url)
            if (!response.ok) {
                alert('Error fetching results')
                return
            }
            const data = await response.json()
            setSetCurrentLocation(data)
        } catch (error) {
            console.log(error);
        }
        return url
    }
    const fahrenheitToCelsius = fahrenheit => parseInt((fahrenheit - 32) * 5 / 9);
    useEffect(() => {
        fetchData(url)
    }, [])
    return (
        <Container>
            {currentLocation !== null &&
                <Card>

                    <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2017/05/20/20/22/clouds-2329680_960_720.jpg" />
                    <Card.Body className='d-flex justify-content-between bg-secondary'>
                        <div>
                            <Card.Title>
                                {currentLocation.city.name} {currentLocation.city.country}
                                <span>{fahrenheitToCelsius(currentLocation.list[0].main.temp)}°C</span>
                            </Card.Title>
                        </div>
                        <div>
                            <Card.Text>
                                <span className='mr-5'>{currentLocation.list[0].weather[0].main}</span>
                                <span>
                                    <img style={{ height: "55px", position: "absolute", top: "-10px", right: "20px" }} src={`http://openweathermap.org/img/wn/${currentLocation.list[0].weather[0].icon}@2x.png`} />
                                </span>
                            </Card.Text>
                        </div>


                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Temp : </ListGroupItem>
                        <ListGroupItem>Max : {currentLocation.list[0].main.temp}</ListGroupItem>
                        <ListGroupItem>Vestibulum at eros</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
                // <ListGroup>
                //     <ListGroup.Item>{currentLocation.city.name}</ListGroup.Item>
                //     <ListGroup.Item>{currentLocation.city.country}</ListGroup.Item>
                //     <ListGroup.Item>{currentLocation.city.timezone}</ListGroup.Item>
                //     <ListGroup.Item>{currentLocation.cnt}°F</ListGroup.Item>
                // </ListGroup>
            }

            {/* <ListGroup>
                {currentLocation !== null && currentLocation.list.map((item, i) => (
                    <ListGroup.Item key={i}>
                        <span>Item dt : {item.dt}--</span>
                        <span>Wind Speed : {item.wind.speed}</span>
                        <span>{item.dt}</span>
                    </ListGroup.Item>
                ))}
            </ListGroup> */}
        </Container >

    )
}

export default BrowserLocation