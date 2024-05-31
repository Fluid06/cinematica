import { useEffect, useReducer, useState } from "react"
import DeleteButton from "./DeleteMovieButton.js";
import MovieForm from "./AddMovieForm";
import EditMovie from "./EditMovie.js";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [reload, forceReload] = useReducer(x => x + 1, 0);
    
    useEffect(() => {
        const getMovies = async () => {
            try {
              const res = await fetch('https://cinematica.8u.cz/php/api/getMovies.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==', {
                method: 'GET',
              });
              const output = await res.json();
              
              setMovies(output);

            } catch (e) {
              console.error("Something went wrong while fetching 'Movies': " + e);
            }
        }
    
        getMovies();
    }, [reload]);

    return (
        <div className='h-fit w-full text-slate-200'>
            <div className='lg:flex lg:justify-center lg:gap-[5%]'>
                <MovieForm/>
            </div>
            <div className='flex justify-center pb-5'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:sm:grid-cols-3 2xl:grid-cols-4 min-[2000px]:grid-cols-5 min-[2500px]:grid-cols-6 justify-items-center w-[90%] xl:w-[80%] h-fit text-gray-50 mt-32 gap-5'>
                    {movies.map(function(data) {
                        return (
                            <div className="w-64 h-fit bg-slate-800 border-[1px] border-slate-50/10 p-2 space-y-2 text-wrap break-words" key={data['ID']}>
                                <p className="text-lg font-bold overflow-hidden text-wrap">{data['name']}</p>
                                <p>Režisér: {data['director_name']}</p>
                                <p>Dat. vydání: {data['release_date']}</p>
                                <p>Délka: {data['length']}min</p>
                                <p>Věk: {data['minimum_age']}+</p>
                                <div className="flex gap-3 pt-2">
                                    <span className="flex-grow">
                                        <EditMovie prevMovie={data} forceReload={forceReload}/>
                                    </span>
                                    <span onClick={ () => setTimeout(() => {forceReload()}, 100) } className="flex-grow">
                                        <DeleteButton id={data['ID'].toString()}/>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}