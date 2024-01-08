import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";


const SearchBar = () => {

const navigate = useNavigate();

    const [title, setTitle] = useState('');

        const handleSearch = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/v1/movies/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title, 
                }),

            });

            console.log(response.data);

            if (response.ok) {
                console.log("Search successful");
                // You need to handle the search result here
                navigate("/search", { state: { results: response.data } }); // Pass the results to the SearchResultPage
            } else {
                console.error("Search failed");
            }
        } catch (error) {
            console.error("Error during search:", error);
        }
    }

    return (
        <form className="search-bar-container" onSubmit={handleSearch}> {/* Use form to handle submit */}
            <input
                type="text"
                placeholder="Search..."
                value={title} // Set the value to title from state
                onChange={(e) => setTitle(e.target.value)} // Update the title on change
            />
            <Button variant="outline-info" className="me-2" type={"submit"}>
                Search
            </Button> {/* Add a button to submit the form */}
        </form>
    );
}

export default SearchBar;
