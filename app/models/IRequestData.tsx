interface IRequestData{
    sort: string,
    filters: {
        type: string;
        rating: string;
        status: string;
        search_query_sort: string;
    },
    numberPage : number,
    setNumberPage: (num: number) => void;
}