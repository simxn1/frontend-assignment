export interface ICategory {
    path: string,
    image: IImage,
    name: string;
}

export interface IImage {
    path: string;
    fullpath: string;
    name: string;
    modified: string;
}
