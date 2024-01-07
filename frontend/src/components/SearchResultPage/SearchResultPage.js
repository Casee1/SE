import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResultsPage = () => {
    const location = useLocation();
    const { results } = location.state || {};

    return (
        <div>
            <h1>Search Results</h1>
            <ul>
                {results && results.map((item, index) => (
                    <li key={index}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResultsPage;