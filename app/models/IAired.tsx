interface Aired {
    from: string; // ISO 8601 date format
    to: string | null; // ISO 8601 date format or null
    prop: {
        from: { day: number; month: number; year: number };
        to?: { day?: number; month?: number; year?: number }; // optional for to
    };
    string: string; // human-readable date range
}