import { ResponseData } from "../app/app";
import {Handler} from "./controller";


class Loader {
    private baseLink: string;
    private options: { apiKey: string };

    constructor(baseLink:string, options:{apiKey: string}) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }:{endpoint: string, options?: {apiKey?: string,sources?: string}},
        callback:Handler<T> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res:Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options:{apiKey?: string, sources?: string}, endpoint: string) {
        const urlOptions:{[k:string]: string} = {...{apiKey: '',source:''},...this.options, ...options };

        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: string, endpoint:string, callback:Handler<T>, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
