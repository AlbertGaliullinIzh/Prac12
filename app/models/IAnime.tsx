interface IAnimeData 
{ 
    data: IAnime
}

interface IAnime 
{   
    mal_id: number;
    url: string;
    images: {
        jpg: IImageUrls;
        webp: IImageUrls;
    };
    trailer: ITrailer;
    approved: boolean;
    titles: ITitle[];
    title: string;
    title_english: string; // optional
    title_japanese?: string; // optional
    title_synonyms?: string[]; // optional
    type: string; // e.g., "TV", "Movie"
    source?: string; // optional
    episodes?: number; // optional
    status?: string; // optional
    airing?: boolean; // optional
    aired?: Aired; // optional
    duration?: string; // optional
    rating?: string; // optional
    score?: number; // optional
    scored_by?: number; // optional
    rank?: number; // optional
    popularity?: number; // optional
    members?: number; // optional
    favorites?: number; // optional
    synopsis?: string; // optional
    background?: string; // optional
    season?: string | null; // optional, can be null
    year?: number | null; // optional, can be null
    broadcast?: {
        day?: string | null; 
        time?: string | null; 
        timezone?: string | null; 
        string?: string | null; 
    }; // optional, can be null
    producers?: IProducer[]; // optional
    licensors?: IProducer[]; // optional, same structure as producers
    studios?: IProducer[]; // optional, same structure as producers
    genres?: IGenre[]; // optional, same structure as genres
    explicit_genres?: IGenre[];
    themes?: IGenre[];
    demografics?: IProducer[];
}