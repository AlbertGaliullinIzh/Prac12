interface ITrailer {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
    images: {
        image_url: string | null;
        small_image_url: string | null;
        medium_image_url: string | null;
        large_image_url: string | null;
        maximum_image_url: string | null;
    };
}