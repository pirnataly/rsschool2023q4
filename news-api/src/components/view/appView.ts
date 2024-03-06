import News from './news/news';
import Sources from './sources/sources';
import { ResponseData, NewsData } from '../../interfaces/types';

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
