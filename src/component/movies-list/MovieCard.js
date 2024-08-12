import { useRouter } from 'next/navigation';
import React from 'react';
import { Card, CardBody, Col } from 'react-bootstrap';

const PLACEHOLDER_IMAGE = "https://craftsnippets.com/articles_images/placeholder/placeholder.jpg"

const MovieCard = ({ data }) => {
    const router = useRouter()
    const handleNavigate = (id) => {
        router.push(`movie/${id}`)
    }
    return (
        <Col xs={6} sm={6} lg={3} onClick={() => handleNavigate(data._id)}>
            <Card className="movie-card mb-3">
                <div className='movie-thumb-box'>
                    <img
                        src={data?.image || PLACEHOLDER_IMAGE}
                        alt="movie"
                        className="img-fluid movie-thumb"
                    />
                </div>
                <CardBody>
                    <h4 className="movie-title">{data.title}</h4>
                    <p>{data.year}</p>
                </CardBody>
            </Card>
        </Col>
    )
}
export default MovieCard;