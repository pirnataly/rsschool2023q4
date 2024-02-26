import News from './news/news';
import Sources from './sources/sources';
import { ResponseData } from '../app/app';

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

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsData) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values!);
    }

    drawSources(data: ResponseData) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values!);
    }
}
