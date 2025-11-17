import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MdSearch } from 'react-icons/md';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionsRef = useRef(null);
    const debounceTimer = useRef(null);

    const performSearch = (searchQuery) => {
        if (searchQuery.trim()) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    const fetchSuggestions = async (searchQuery) => {
        if (searchQuery.length < 1) {
            setShowSuggestions(false);
            return;
        }

        try {
            const response = await fetch(
                `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(searchQuery)}`
            );

            if (!response.ok) {
                setShowSuggestions(false);
                return;
            }

            const data = await response.json();
            if (data && data[1] && data[1].length > 0) {
                setSuggestions(data[1].slice(0, 6));
                setShowSuggestions(true);
            } else {
                setShowSuggestions(false);
            }
        } catch (error) {
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        if (showSuggestions && suggestionsRef.current) {
            gsap.fromTo(
                suggestionsRef.current,
                { scaleY: 0.95, opacity: 0 },
                { scaleY: 1, opacity: 1, duration: 0.2, ease: 'power2.out' }
            );

            gsap.fromTo(
                suggestionsRef.current.querySelectorAll('li'),
                { opacity: 0, y: -10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                    stagger: 0.05
                },
                "<0.05"
            );
        }
    }, [showSuggestions]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            fetchSuggestions(value);
        }, 250);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        performSearch(query);
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggestion) => {
        performSearch(suggestion);
        setShowSuggestions(false);
    };

    return (
        <div className="search-widget">
            <form id="search-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="search-input"
                    placeholder="Search Google..."
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => query.length > 0 && fetchSuggestions(query)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    autoFocus
                />
                <button type="submit" title="Search">
                    <MdSearch />
                </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    id="suggestions-container"
                    className="suggestions-active"
                >
                    <ul>
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    handleSuggestionClick(suggestion);
                                }}
                            >
                                <MdSearch className="suggestion-icon" />
                                <span>{suggestion}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchBar;