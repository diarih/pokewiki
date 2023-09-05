import Image from 'next/image'
import React from 'react'

export default function PokemonCard({ data }: { data: Pokemon }) {

    const image = data.sprites.other["official-artwork"].front_default
    const imageAlt = data.sprites.other.dream_world.front_default

    const cardBody = (
        <a href={`/${data.id}`}>
            <div style={{ height: 200 }} className='bg-base-300 rounded w-full p-4 flex justify-center items-center'>
                <div className='relative' style={{ height: 150, width: 150 }}>
                    <Image sizes='150' alt="pokemon" fill src={image || imageAlt || '/images/pokeball.png'} />
                </div>
            </div>
            <div className='p-4'>
                <div className='text-xs font-semibold mb-3'>
                    #{data.id}
                </div>
                <div>
                    <div className='text-xl font-semibold mb-2 capitalize'>{data.name}</div>
                    <div className='flex items-center gap-2'>
                        {
                            data.types.map((type, c: number) => {
                                return (
                                    <div key={c} className="badge badge-info font-semibold text-xs capitalize">{type.type.name}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </a>
    )

    return (
        <article className='md:col-span-3 col-span-6 flex flex-col gap-3 rounded bg-base-200'>
            {cardBody}
        </article>
    )
}