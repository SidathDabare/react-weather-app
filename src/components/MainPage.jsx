import React, { useEffect, useState } from 'react';
import { Card, Container, Form, Image, Row } from 'react-bootstrap';
import { parseISO, format } from 'date-fns'
import "./MainPage.css"
import CurrentLocation from './CurrentLocation';


const MainPage = () => {
    const [weather, setWeather] = useState(null)
    const [location, setLocation] = useState('')

    //const location = "london"
    const searchUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=8d45afb7921fd74c51f9b550de32fce8&units=imperial`

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
    const fahrenheitToCelsius = fahrenheit => parseInt((fahrenheit - 32) * 5 / 9);
    useEffect(() => {
        // console.log("data : " + data.city.name)
        // console.log("location : " + location)
    }, [weather, location])

    return (
        <Container className='p-0'>
            <Row className="mt-5">
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
            <Container xs={7} className="mt-2 mx-0 p-0 ">
                <CurrentLocation />
            </Container>

            <Container className='mt-3  mx-0 p-0 '>
                {weather !== null &&
                    <Card className='card'>
                        <div className='card-container'>
                            <Card.Img
                                src="https://cdn.pixabay.com/photo/2017/01/16/19/40/mountains-1985027_960_720.jpg"
                                alt="Card image"
                                className='card-image'
                            />
                        </div>
                        <Card.ImgOverlay className="text-white p-0">
                            <div className='card-content'>
                                <div className='card-text-content'>
                                    <h1>{weather.city.name} {weather.city.country}</h1>
                                    <h2>{fahrenheitToCelsius(weather.list[0].main.temp)}°C</h2>
                                    <div className='card-icon-content'>
                                        <h3 style={{ marginRight: "55px" }}>{weather.list[0].weather[0].main}</h3>
                                        <Image className='main-weather-icon'
                                            src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`} />
                                    </div>
                                </div>

                                {/* <Card.Text>Last updated 3 mins ago</Card.Text> */}
                                <Container className='sub-container'>
                                    {weather !== null && weather.list.map((item, i) => (
                                        <Card key={i} className="single-card">
                                            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                            <Card.Body className='card-body'>
                                                <small>{format(parseISO(item.dt_txt), 'do MMMM yyyy')}</small><br></br>
                                                <small>Time : {format(parseISO(item.dt_txt), 'HH:mm')}</small>

                                                <div className='card-weather-container '>
                                                    <Card.Text>{item.weather[0].main}</Card.Text>
                                                    <Image className='card-weather-icon'
                                                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
                                                </div>
                                                <p>{fahrenheitToCelsius(item.main.temp)}°C</p>
                                                <small>Wind Speed : {item.wind.speed}</small>

                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Container>
                            </div>

                        </Card.ImgOverlay>

                    </Card>
                }

            </Container >


        </Container>
    );

}



export default MainPage