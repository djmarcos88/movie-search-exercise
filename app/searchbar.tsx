'use client';
import { eventNames } from 'process';
import React, { ChangeEvent, KeyboardEventHandler, useState } from 'react';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
    placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder }: SearchBarProps) => {
    const [searchInput, setSearchInput] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(searchInput);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSearch(searchInput);
    };

    return (
        <div className="flex justify-center m-6">
            <div className="join">
                <input
                    className="input input-bordered join-item rounded-l-md w-96"
                    type="search"
                    value={searchInput}
                    onChange={handleChange}
                    onKeyUp={handleKeyPress}
                    placeholder="Search Movies"
                ></input>

                <button className="btn join-item rounded-r-full" onClick={handleClick}>
                    Search
                </button>
            </div>
        </div>
    );
};
