import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, InputGroup, Dropdown } from 'react-bootstrap';
import Recipe from './Recipe'; // Import the Recipe component

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [newRecipe, setNewRecipe] = useState({ title: '', description: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterSort, setFilterSort] = useState('None');

    const API_URL = '/recipe/recipes'; // Adjust the URL as per your API setup

    // Fetch recipes
    const fetchRecipes = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setRecipes(data);
            setFilteredRecipes(data); // Initialize filtered recipes
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    // Search and filter recipes
    const filterRecipes = () => {
        let filtered = [...recipes];

        // Filter by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter((recipe) =>
                recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by category
        if (filterCategory !== 'All') {
            filtered = filtered.filter((recipe) => recipe.category === filterCategory);
        }

        // Sort recipes
        if (filterSort === 'Rating') {
            filtered.sort((a, b) => b.rating - a.rating); // Descending order
        } else if (filterSort === 'Alphabetical') {
            filtered.sort((a, b) => a.title.localeCompare(b.title)); // Alphabetical order
        }

        setFilteredRecipes(filtered);
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
        handleCloseModal();
    };

    // Re-run filtering when search or filter changes
    useEffect(() => {
        filterRecipes();
    }, [searchQuery, filterCategory, filterSort]);

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center my-4">
                <h1>Recipes</h1>
                <Button variant="success" onClick={() => handleOpenModal()}>Add Recipe</Button>
            </div>

            {/* Search and Filter Section */}
            <div className="search-and-filter mb-4">
                <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Search for recipes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </InputGroup>
                <div className="d-flex gap-3">
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-category">
                            Category: {filterCategory}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setFilterCategory('All')}>All</Dropdown.Item>
                            <Dropdown.Item onClick={() => setFilterCategory('Desserts')}>Desserts</Dropdown.Item>
                            <Dropdown.Item onClick={() => setFilterCategory('Main Course')}>Main Course</Dropdown.Item>
                            <Dropdown.Item onClick={() => setFilterCategory('Appetizers')}>Appetizers</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-sort">
                            Sort: {filterSort}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setFilterSort('None')}>None</Dropdown.Item>
                            <Dropdown.Item onClick={() => setFilterSort('Rating')}>Rating</Dropdown.Item>
                            <Dropdown.Item onClick={() => setFilterSort('Alphabetical')}>Alphabetical</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <Row>
                {filteredRecipes.map((recipe) => (
                    <Col key={recipe.id} md={4}>
                        <Recipe
                            title={recipe.title}
                            description={recipe.description}
                            onClick={() => handleOpenModal(recipe)}
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
