import React, { useState } from 'react';
import {fetchItems} from "./api/ItemService.ts";

const FetchItemsButton: React.FC = () => {
    const [items, setItems] = useState<any | null>(null); // State to hold fetched items
    const [error, setError] = useState<string | null>(null); // State for error messages

    const handleFetchItems = async () => {
        try {
            const data = await fetchItems(); // Call the fetch function
            setItems(data); // Update state with fetched data
            setError(null); // Clear any previous errors
        } catch (err) {
            setError('Failed to fetch items. Please try again.'); // Set error message
            setItems(null); // Clear previous data
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Fetch Items</h1>
            <button onClick={handleFetchItems} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Fetch Items
            </button>

            {/* Error Message */}
            {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

            {/* Display Raw JSON */}
            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f4f4f4', borderRadius: '5px' }}>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {items ? JSON.stringify(items, null, 2) : 'No data fetched yet.'}
        </pre>
            </div>
        </div>
    );
};

export default FetchItemsButton;
