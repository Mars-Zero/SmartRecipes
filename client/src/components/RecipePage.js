import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Recipe from './Recipe'; // Import the Recipe component

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [newRecipe, setNewRecipe] = useState({ title: '', description: '' });

    const API_URL = '/recipe/recipes'; // Adjust the URL as per your API setup

    // Fetch recipes
    const fetchRecipes = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    // Add a recipe
    const addRecipe = async () => {
        try {
            const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
                body: JSON.stringify(newRecipe),
            });

            if (response.ok) {
                const createdRecipe = await response.json();
                setRecipes((prev) => [...prev, createdRecipe]);
                setNewRecipe({ title: '', description: '' });
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    // Update a recipe
    const updateRecipe = async (id, updatedData) => {
        try {
            const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
            const response = await fetch(`/recipe/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const updatedRecipe = await response.json();
                setRecipes((prev) =>
                    prev.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
                );
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    // Delete a recipe
    const deleteRecipe = async (id) => {
        try {
            const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
            await fetch(`/recipe/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            });
            setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    // Handle modal close
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRecipe(null);
    };

    // Open modal for adding or updating
    const handleOpenModal = (recipe = null) => {
        setSelectedRecipe(recipe);
        setNewRecipe(recipe || { title: '', description: '' });
        setShowModal(true);
    };

    // Submit recipe (either add or update)
    const handleSubmit = () => {
        if (selectedRecipe) {
            updateRecipe(selectedRecipe.id, newRecipe);
        } else {
            addRecipe();
        }
        handleCloseModal();
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center my-4">
                <h1>Recipes</h1>
                <Button variant="success" onClick={() => handleOpenModal()}>Add Recipe</Button>
            </div>
            <Row>
                {recipes.map((recipe) => (
                    <Col key={recipe.id} md={4}>
                        <Recipe
                            title={recipe.title}
                            description={recipe.description}
                            onClick={() => handleOpenModal(recipe)}
                            onDelete={() => deleteRecipe(recipe.id)}
                        />
                    </Col>
                ))}
            </Row>

            {/* Modal for Add/Edit */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedRecipe ? 'Update Recipe' : 'Add Recipe'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={newRecipe.title}
                                onChange={(e) =>
                                    setNewRecipe((prev) => ({ ...prev, title: e.target.value }))
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={newRecipe.description}
                                onChange={(e) =>
                                    setNewRecipe((prev) => ({ ...prev, description: e.target.value }))
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {selectedRecipe ? 'Update Recipe' : 'Add Recipe'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default RecipesPage;
