"use client";
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
        <div className='flex justify-center py-7 px-7 bg-[#fff]'>
            <form onSubmit={handleSubmit} className='w-1/2 pt-[150px] pb-5 '>
                <div className="relative">
                    <input type="text" value={searchTerm} onChange={handleSearch} placeholder='What do you want to learn?' 
                    className='w-full px-5 py-2 font-1px placeholder-black text-black rounded-lg border-none ring-1 ring-[#072569] focus:ring-[#072569] focus:ring-1' />
                    <button type="submit" className='text-white text-lg bg-[#072569] hover:bg-[#1146ce] px-3 py-0.25 rounded-lg absolute end-1.5 bottom-1.5'>Search</button>
                </div>
            </form>
        </div>
    );
};

export default Search;