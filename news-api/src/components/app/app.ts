import AppController from '../controller/controller';
import {AppView, NewsData} from '../view/appView';

export type SourceItem = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export type ResponseData = {
    status: string;
    sources: SourceItem [];
}

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document
            .querySelector('.sources') as HTMLElement)
            .addEventListener('click', (e) => this.controller.getNews(e, (data: NewsData) => this.view.drawNews(data!)));
        this.controller.getSources((data: ResponseData) => this.view.drawSources(data!));
    }
}

export default App;
