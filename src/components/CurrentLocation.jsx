import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Image } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./MainPage.css"
//import forcastImages from "./forcastImages.json"
import { parseISO, format } from 'date-fns'

const CurrentLocation = () => {
    const [currentLocation, setSetCurrentLocation] = useState(null)
    const navigate = useNavigate()
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
    // const linkToPage = (cityName) => {
    //     navigate(`/fullWeather/:${cityName}`.toLowerCase())
    //     return cityName
    // }
    useEffect(() => {
        fetchData(url)
    }, [])
    return (
        <Container className='main-container'>
            {currentLocation !== null &&
                <Card className='card'>
                    <div className='card-container'>
                        <Card.Img
                            src="https://cdn.pixabay.com/photo/2017/05/20/20/22/clouds-2329680_960_720.jpg"
                            alt="Card image"
                            className='card-image'
                        />
                    </div>
                    <Card.ImgOverlay className="text-white p-0">
                        <div className='card-content'>
                            <div className='card-text-content'>
                                <h1>{currentLocation.city.name} {currentLocation.city.country}</h1>
                                <h2>{fahrenheitToCelsius(currentLocation.list[0].main.temp)}°C</h2>
                                <div className='card-icon-content'>
                                    <h3 style={{ marginRight: "55px" }}>{currentLocation.list[0].weather[0].main}</h3>
                                    <Image className='main-weather-icon'
                                        src={`http://openweathermap.org/img/wn/${currentLocation.list[0].weather[0].icon}@2x.png`} />
                                </div>
                                {/* <Button onClick={linkToPage(currentLocation.city.name)}> More Details</Button> */}
                            </div>

                            {/* <Card.Text>Last updated 3 mins ago</Card.Text> */}
                            <Container className='sub-container'>
                                {currentLocation !== null && currentLocation.list.map((item, i) => (
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
                                            <small>Wind S : {item.wind.speed}</small>


                                        </Card.Body>
                                    </Card>
                                ))}
                            </Container>
                        </div>

                    </Card.ImgOverlay>

                </Card>
            }

        </Container >

    )
}

export default CurrentLocation