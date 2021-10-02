export interface ICategory {
    path?: string,
    name?: string;
    image?: IImage,
    images?: IImage[];
    gallery?: {
        path: string
        name: string;
    }
}

export interface IImage {
    path: string;
    fullpath: string;
    name: string;
    modified: string;
}
