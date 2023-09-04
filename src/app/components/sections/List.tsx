import React from 'react'
import Image from 'next/image'

export default function List() {
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
            <div className='grid grid-cols-12 gap-5 w-full'>
                {
                    [...Array(12)].map((e, i: number) => {
                        return (
                            <a href='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg' className='md:col-span-3 col-span-6 flex flex-col gap-3 rounded bg-base-200'>
                                <div className='bg-base-300 rounded w-full p-4 flex justify-center items-center'>
                                    <Image alt="pokemon" width={200} height={200} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"} />
                                </div>
                                <div className='p-4'>
                                    <div className='text-xs font-semibold mb-3'>
                                        #0001
                                    </div>
                                    <div>
                                        <div className='text-xl font-semibold mb-2'>Ditto</div>
                                        <div className='flex items-center gap-2'>
                                            <div className="badge badge-info font-semibold text-xs">Water</div>
                                            <div className="badge badge-error font-semibold text-xs">Fire</div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        )
                    })
                }
            </div>
        </section>
    )
}
