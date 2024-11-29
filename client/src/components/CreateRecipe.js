import React from 'react';
import { useForm } from 'react-hook-form';
import '../styles/CreateRecipes.css'; // Keep the path to your CSS file consistent

const CreateRecipePage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const createRecipe = (data) => {
        console.log(data);

        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        console.log(token);

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)
        };

        fetch('/recipe/recipes', requestOptions)
            .then(res => res.json())
            .then(() => {
                reset();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="create-recipe-page">
            <div className="create-recipe-card">
                <h2>Create a Recipe</h2>
                <form onSubmit={handleSubmit(createRecipe)}>
                    {/* Recipe Name */}
                    <div className="form-group">
                        <label>Recipe name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter recipe name"
                            {...register('title', { required: true, maxLength: 25 })}
                        />
                        {errors.title && <small className="error-text">Recipe name is required (max 25 characters)</small>}
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Enter description"
                            {...register('description', { required: true, maxLength: 255 })}
                        ></textarea>
                        {errors.description && <small className="error-text">Description is required (max 255 characters)</small>}
                    </div>

                    {/* Upload Photo */}
                    <div className="form-group">
                        <button type="button" className="upload-btn">📎 Upload photo</button>
                    </div>

                    {/* Submit Button */}
                    <div className="form-group">
                        <button type="submit" className="submit-btn">Add recipe</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRecipePage;
