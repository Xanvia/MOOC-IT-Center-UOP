import React, { useState } from 'react';

const Search: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Perform search logic here
        console.log('Searching for:', searchTerm);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchTerm} onChange={handleSearch} />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default Search;