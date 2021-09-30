import Head from 'next/head'
import Header from "../components/Header";
import {ICategory} from "../lib/interfaces";
import CategoryPreview from "../components/CategoryPreview";
import CreateGallery from "../components/CreateGallery";
import React, {useState} from "react";
import {endpoints} from "../lib/constants";

interface Props {
    categories: ICategory[];
}

const Home = ({ categories }: Props) => {
    const [currentlyHovered, setCurrentlyHovered] = useState<number>(0);

    let debouncedNewCurrentlyHoveredTimer: ReturnType<typeof setTimeout>
    function setNewCurrentlyHovered(index: number) {
        clearTimeout(debouncedNewCurrentlyHoveredTimer)
        debouncedNewCurrentlyHoveredTimer = setTimeout(() => setCurrentlyHovered(index), 500)
    }

  return (
    <div>
      <Head>
        <title>Fotogaléria</title>
      </Head>

      <main>
          <Header title="fotogaléria" coverImage={categories[currentlyHovered].image?.fullpath} subtitle="kategórie" hasBack={false} />
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
              {categories.map((category, index) => {
                  return (
                      <div key={category.name} onMouseEnter={() => setNewCurrentlyHovered(index)}>
                          <CategoryPreview name={category.name} imgPath={category.image?.fullpath} />
                      </div>
                  )
              })}
              <CreateGallery />
          </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoints.gallery);
    const json = await res.json();
    return {
        props: { categories: json.galleries }
    }
}

export default Home

