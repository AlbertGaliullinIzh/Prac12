'use client'

import { Button } from 'antd';
import { useState } from 'react';
import { create } from 'zustand'
import './page.css'

type Item = {
    id: number
    name: string
    date: string
    rating: string
}

type Store = {
    listsAnime: Item[];
    addItem: (id: number, name: string, date: string, rating: string) => void;
}
const loadItemsFromStorage = () => {
    const storedItems = localStorage.getItem('items')
    return storedItems ? JSON.parse(storedItems) : []
}
const useStore = create<Store>()((set) => ({
    listsAnime: loadItemsFromStorage(),
    addItem: (id: number, name: string, date: string, rating: string) => set((state) => {
        const newItem: Item = {
            id,
            date,
            name,
            rating,
        }
        return { listsAnime: [...state.listsAnime, newItem] }
    })
}))
const handleClick = () => {
    window.open(`/`);
}



export default function anime() {
    const { listsAnime } = useStore()
    const [items, setItems] = useState<Item[]>(listsAnime);

    const sortByDate = () => {
        const sortedItems = [...items].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setItems(sortedItems);
    };
    
    const sortByRating = () => {
        const sortedItems = [...items].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        setItems(sortedItems);
    };
    
    const sortByRatingAndDate = () => {
        const sortedItems = [...items].sort((a, b) => {
            const ratingComparison = parseFloat(b.rating) - parseFloat(a.rating);
            if (ratingComparison !== 0) {
                return ratingComparison;
            }
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        setItems(sortedItems);
    };

    loadItemsFromStorage();
    
    return (
        <div className='cardsAnime'>
            <Button onClick={handleClick}>Назад</Button>
            <Button onClick={sortByDate}>Сортировать по дате</Button>
            <Button onClick={sortByRating} >Сортировать по рейтингу</Button>
            <Button onClick={sortByRatingAndDate} >Сортировать по рейтингу и дате</Button>

            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        Name: {item.name}, Date: {item.date}, Rating: {item.rating}
                    </li>
                ))}
            </ul>

        </div>
    );
};