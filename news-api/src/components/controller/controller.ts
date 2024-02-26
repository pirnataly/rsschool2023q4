import AppLoader from './appLoader';

export type Handler<T> = (data: T) => void;
export enum EndpointValues {
    sources = "sources",
    everything = "everything"
}

class AppController extends AppLoader {
    getSources<T>(callback:Handler<T>) {
        super.getResp(
            {
                endpoint: EndpointValues.sources,
            },
            callback
        );
    }

    getNews<T>(e: MouseEvent, callback:Handler<T>) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                                    {
                            endpoint: EndpointValues.everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
