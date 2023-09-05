import Image from "next/image";

async function getAbout(url: string) {
    const res = await fetch(url)
    const data = await res.json();
    return data;
}

async function getPokemon(slug: string | number) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`)
    const pokemon = await res.json();
    const species = await getAbout(pokemon.species.url)

    const about = species.flavor_text_entries[0].flavor_text

    return {
        ...pokemon,
        about
    };
}


export default async function asyPage({ params }: { params: { slug: string } }) {

    const data = await getPokemon(params.slug)

    const image = data.sprites.other["official-artwork"].front_default
    const imageAlt = data.sprites.other.dream_world.front_default

    return (
        <main className="max-w-screen-md bg-neutral py-12 mx-auto flex flex-col gap-8 min-h-screen">
            <section className="flex flex-col gap-2 justify-center items-center">
                <div>#{data.id}</div>
                <div className="capitalize font-semibold text-4xl">{data.name}</div>
            </section>
            <section className="mt-12">
                <div style={{ height: 200 }} className='rounded w-full flex justify-center items-center'>
                    <div className='relative' style={{ height: 250, width: 250 }}>
                        <Image priority sizes='250' alt="pokemon" fill src={image || imageAlt || '/images/pokeball.png'} />
                    </div>
                </div>
            </section>
            <section className="p-4 flex flex-col gap-8">
                <p className="rounded-xl bg-neutral-focus py-3 px-6">
                    {data.about}
                </p>
                <div className="flex w-full">
                    <div className="flex justify-center h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                        <div className="text-xl font-black capitalize">
                            {
                                data.types.map((e: any, i: number) => {
                                    return <span>{e.type.name} </span>
                                })
                            }
                        </div>
                        <div className="text-xs">
                            Types
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex justify-center h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                        <div className="text-xl font-black">{Number(data.weight)/10}kg</div>
                        <div className="text-xs">
                            Weight
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>
                    <div className="flex justify-center h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                        <div className="text-xl font-black">{Number(data.height)/10}m</div>
                        <div className="text-xs font-semibold">
                            Height
                        </div>
                    </div>
                </div>
                <div className="stats shadow">

                    {data.stats.map((e: any, i: number) => {
                        return (
                            <div className="stat place-items-center">
                                <div className="stat-title capitalize">{e.stat.name}</div>
                                <div className="stat-value">{e.base_stat}</div>
                                <div className="stat-desc">Pokemon</div>
                            </div>
                        )
                    })}

                </div>
            </section>
        </main>
    )
}