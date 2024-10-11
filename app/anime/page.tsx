'use client'

import { useSearchParams } from "next/navigation";
import { getAnimeById } from "../service/requests";
import { useEffect, useState } from "react";
import { create } from 'zustand'
import './page.css'
type Item = {
    id: number
    date: string
    name: string
    rating: number
}

type Store = {
    items: Item[];
    addItem: (id: number, name: string, date: string, rating: number) => void;
}
const loadItemsFromStorage = () => {
    const storedItems = localStorage.getItem('items')
    return storedItems ? JSON.parse(storedItems) : []
}
const useStore = create<Store>()((set) => ({
    items: loadItemsFromStorage(),
    addItem: (id: number, name: string, date: string, rating: number) => set((state) => {
        const newItem: Item = {
            id,
            name,
            date,
            rating,
        }
        return { items: [...state.items, newItem] }
    })
}))
const saveItemsToStorage = (items: Item[]) => {
    localStorage.setItem('items', JSON.stringify(items))
}

export default function anime() {
    const params = useSearchParams()
    const [rating, setRating] = useState<number>(1);
    const param = params.get('number')
    const [selectedAnime, SetSelectedAnime] = useState<IAnimeData>()
    const { items, addItem } = useStore()

    function F1() {
        if (selectedAnime?.data.mal_id != undefined) {
            if (items.some(obj => obj.id === selectedAnime?.data.mal_id))
                return
            let a: Item =
            {
                id: selectedAnime?.data.mal_id,
                name: selectedAnime?.data.title_english?.toString(),
                date: new Date().toISOString().split('T')[0],
                rating: rating
            }
            addItem(selectedAnime?.data.mal_id, selectedAnime?.data.title_english, new Date().toISOString().split('T')[0], rating)
            let m = items
            m.push(a)
            saveItemsToStorage(m)
        }

    }

    useEffect(() => {
        const fetchAnimes = async () => {
            if (param == undefined) {
                return
            }
            const data = await getAnimeById(param);
            SetSelectedAnime(data);
        };
        fetchAnimes();
        loadItemsFromStorage();
    }, [param])
    return (
        <div className="cardsAnime">{selectedAnime !== undefined ?
            <div>
                <h2>{selectedAnime.data.title}</h2>
                <p>Title English: {selectedAnime.data.title_english}</p>
                <p>Title Japanese: {selectedAnime.data.title_japanese}</p>
                <p>Score: {selectedAnime.data.score}</p>
                <p>Rating: {selectedAnime.data.rating}</p>
                <p>Scored by: {selectedAnime.data.scored_by}</p>

                {selectedAnime.data.trailer.embed_url != undefined && (
                    <div>
                        <iframe
                            width="330"
                            height="200"
                            src={selectedAnime.data.trailer.embed_url}
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        />
                        <div>
                            Рейтинг ожидаемости<select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                                {[...Array(10)].map((_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                    </option>
                                ))}
                            </select>
                            <button onClick={F1}>
                                Добавить в посмотреть позже
                            </button>
                        </div>
                    </div>
                )}
                <p>
                    Prodecers: {selectedAnime.data.producers ?
                        selectedAnime.data.producers.map(producers => producers.name).join(', ') :
                        'N/A'}
                </p>
                <p>
                    Genres: {selectedAnime.data.genres ?
                        selectedAnime.data.genres.map(genres => genres.name).join(', ') :
                        'N/A'}
                </p>
                <p>
                    Themes: {selectedAnime.data.themes ?
                        selectedAnime.data.themes.map(genre => genre.name).join(', ') :
                        'N/A'} </p>
                <p>Duration: {selectedAnime.data.duration}</p>
                <p>Favorites: {selectedAnime.data.favorites}</p>
                <p>Members: {selectedAnime.data.members}</p>
                <p>
                    Aired: {selectedAnime.data.aired ?
                        selectedAnime.data.aired.string :
                        'N/A'}
                </p>
                <img
                    alt={selectedAnime.data.title}
                    onClick={() => { }}
                    src={selectedAnime.data.images.jpg.image_url}
                />

            </div>
            : <></>}
        </div>
    )

};