import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const FullWeather = () => {
    const navigate = useNavigate()
    const linkToPage = () => {
        navigate("/")
    }
    return (
        <Container>
            <Row xs={10}>
                <p onClick={linkToPage}>Go to home</p>
            </Row>

        </Container>
    )
}

export default FullWeather