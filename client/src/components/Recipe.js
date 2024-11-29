import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Recipe = ({ title, description, imageUrl, rating, onClick, onDelete }) => {
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Img variant="top" src={"./default_photo.png"} alt={title} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                
                <div className="d-flex justify-content-between">
                    <p>Author: </p>
                    <p>Rating: ⭐⭐⭐⭐☆</p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Recipe;
