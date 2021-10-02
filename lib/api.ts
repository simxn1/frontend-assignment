import {ICategory} from "./interfaces";
import {endpoints} from "./constants";

export async function getAllCategories(): Promise<ICategory[]> {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoints.gallery);
    const json = await res.json();

    return json.galleries;
}

export async function getCategory(name: string): Promise<ICategory> {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoints.gallery + "/" + name);
    const json = await res.json();

    return json;
}

export async function createCategory(name: string) {
    if (name.length >= 1) {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoints.gallery, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        })
        const json = await res.json();

        return json;
    }
    else {
        return { message: "Názov musí obsahovať min. 1 znak" }
    }
}

export async function uploadImagesToGallery(galleryName: string, imageFiles: FileList): Promise<void> {
    let imagesUploaded = [];
    for (const file of Object.entries(imageFiles)) {
        const formData = new FormData();
        formData.append("image", file[1]);
        const res = fetch(process.env.NEXT_PUBLIC_API_URL + endpoints.gallery + "/" + galleryName, {
            method: "POST",
            body: formData
        });
        imagesUploaded.push(res);
    }

    Promise.all(imagesUploaded)
        .then(() => window.location.reload())
        .catch(err => console.log(err));
}

export async function deleteCategory(name: string): Promise<{ status: string }> {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoints.gallery + "/" + name, {
        method: "DELETE"
    })
    const json = await res.json()
    return json;
}

export async function deleteImage(path: string): Promise<{ status: string }> {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoints.gallery + "/" + path, {
        method: "DELETE"
    })
    const json = await res.json()
    console.log(json)
    return json;
}
