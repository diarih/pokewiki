'use client'

import React from 'react'
import { useInfiniteQuery } from 'react-query'
import Loading from '@/app/loading'
import { useInView } from 'react-intersection-observer'
import PokemonCard from '../cards/PokemonCard'

async function getPokemons(pageparam: number) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${pageparam}`)
    const pokemons: Pokemons = await res.json();
    const data = await getPokemon(pokemons.results)
    return data;
}

async function getPokemon(res: Array<PokemonsResult>): Promise<Array<Pokemon>> {
    const detail = await Promise.all(res.map(async (item) => {
        const res = await fetch(item.url)
        const pokemons = await res.json();
        return pokemons
    }))
    return detail

}

export default function List() {

    const { ref, inView } = useInView()

    const {
        status,
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        'projects',
        ({ pageParam = 0 }) => getPokemons(pageParam),
        {
            getNextPageParam: (lastPage) => {

                if (lastPage && lastPage.length > 0) {
                    const lastPokemonId = lastPage[lastPage.length - 1].id;
                    const nextOffset = lastPokemonId;

                    return nextOffset;
                }
                return undefined;
            },
        }
    )

    React.useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])


    return (
        <section className='flex md:px-8 justify-center flex-col items-center gap-4'>
            <div className='w-full flex items-center justify-between'>
                <button className="btn btn-accent">My Favorite</button>
                <div className='flex items-center gap-3'>
                    <div className='whitespace-nowrap hidden md:block'>Monster Type</div>
                    <select className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Select Type</option>
                        <option>Water</option>
                        <option>Fire</option>
                        <option>Grass</option>
                    </select>
                </div>
            </div>

            {
                status === 'loading' ?
                    <Loading /> : (
                        <div className='grid grid-cols-12 gap-5 w-full'>
                            {data?.pages.map((page, i: number) => (
                                <React.Fragment key={i}>
                                    {page?.map((project) => (
                                        <PokemonCard data={project} key={project.id} />
                                    ))}
                                </React.Fragment>
                            ))}
                            <div>
                                <button
                                    ref={ref}
                                    onClick={() => fetchNextPage()}
                                    disabled={!hasNextPage || isFetchingNextPage}
                                >
                                    {isFetchingNextPage
                                        ? 'Loading more...'
                                        : hasNextPage
                                            ? 'Load Newer'
                                            : 'Nothing more to load'}
                                </button>
                            </div>
                        </div>
                    )

            }
        </section>
    )
}
