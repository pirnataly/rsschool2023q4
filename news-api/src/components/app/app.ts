import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ResponseData, NewsData } from '../../interfaces/types';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data: NewsData) => this.view.drawNews(data!))
        );
        this.controller.getSources((data: ResponseData) => this.view.drawSources(data!));
    }
}

export default App;
