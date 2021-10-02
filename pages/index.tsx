import Head from 'next/head'
import Header from "../components/Header";
import {ICategory} from "../lib/interfaces";
import CategoryPreview from "../components/CategoryPreview";
import CreateGallery from "../components/CreateGallery";
import React, {useState} from "react";
import {getAllCategories} from "../lib/api";

interface Props {
    initialCategories: ICategory[];
}

const Home = ({ initialCategories }: Props) => {
    const [currentlyHovered, setCurrentlyHovered] = useState<number>(0);
    const [categories, setCategories] = useState<ICategory[]>(initialCategories)

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
          <div className="container mt-8 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-16 gap-y-14 place-items-center md:place-items-stretch">
              {categories.map((category, index) => {
                  return (
                      <div key={category.name} onMouseEnter={() => setNewCurrentlyHovered(index)}>
                          <CategoryPreview name={category.name ?? ""} imgPath={category.image?.fullpath} categories={categories} setCategories={setCategories} />
                      </div>
                  )
              })}
              <CreateGallery setCategories={setCategories} />
          </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
    const initialCategories = await getAllCategories();
    return {
        props: { initialCategories }
    }
}

export default Home

