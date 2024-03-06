export interface SourceItem {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ResponseData {
    status: string;
    sources: SourceItem[];
}

export enum EndpointValues {
    sources = 'sources',
    everything = 'everything',
}

export interface ArticleData {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface NewsData {
    status: string;
    totalResults: number;
    articles: ArticleData[];
}
