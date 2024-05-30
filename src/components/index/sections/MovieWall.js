import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MovieWall({handleClick}) {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
              const res = await fetch('https://cinematica.8u.cz/php/api/getMovieWall.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==', {
                method: 'GET',
              });
              const output = await res.json();
    
              setMovies(output);
              setLoading(false);
            } catch (e) {
              console.error("Something went wrong while fetching 'Movies': " + e);
            }
        }
        
          getMovies();
    }, []);

    const handleRedirect = (target) => {
        const element = document.getElementById(target);

        window.scroll({
            top: element.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
        });
    }

    const closeTab = () => {
        const posters = document.getElementsByClassName("poster");
        
        for (var i = 0; i < posters.length; i++) {
            posters[i].className = posters[i].className.replace(" grayscale", "");
        }

        document.getElementById("movieTab").className = document.getElementById("movieTab").className.replace("block", "hidden");

        const element = document.getElementById("filmy");
        window.scroll({
            top: element.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
        });
    }

    return (
        <section id="filmy" className='grid grid-cols-1 justify-items-center pt-4 sm:pt-10 pb-4 select-text'>
            <div className="w-fit grid grid-cols-1 justify-items-center lg:border-y lg:border-slate-50/10 p-5">
                {loading 
                ? 
                    <div className="w-fit h-fit grid grid-cols-2 md:grid-cols-4 min-[570px]:grid-cols-3 min-[940px]:grid-cols-5 gap-4 justify-items-center">
                        <div className="w-[7rem] h-[10.5rem] min-[390px]:w-[10.5rem] min-[390px]:h-[15.75rem] bg-slate-800/50">
                            <div className={`size-full`}/>
                        </div>
                        <div className="w-[7rem] h-[10.5rem] min-[390px]:w-[10.5rem] min-[390px]:h-[15.75rem] bg-slate-800/50">
                            <div className={`size-full`}/>
                        </div>
                        <div className="w-[7rem] h-[10.5rem] min-[390px]:w-[10.5rem] min-[390px]:h-[15.75rem] bg-slate-800/50">
                            <div className={`size-full`}/>
                        </div>
                        <div className="w-[7rem] h-[10.5rem] min-[390px]:w-[10.5rem] min-[390px]:h-[15.75rem] bg-slate-800/50">
                            <div className={`size-full`}/>
                        </div>
                        <div className="w-[7rem] h-[10.5rem] min-[390px]:w-[10.5rem] min-[390px]:h-[15.75rem] bg-slate-800/50">
                            <div className={`size-full`}/>
                        </div>
                        <div className="w-[7rem] h-[10.5rem] min-[390px]:w-[10.5rem] min-[390px]:h-[15.75rem] bg-slate-800/50">
                            <div className={`size-full`}/>
                        </div>
                        <div className="w-[7rem] h-[10.5rem] min-[390px]:w-[10.5rem] min-[390px]:h-[15.75rem] bg-slate-800/50">
                            <div className={`size-full`}/>
                        </div>
                        <div className="w-[7rem] h-[10.5rem] min-[390px]:w-[10.5rem] min-[390px]:h-[15.75rem] bg-slate-800/50">
                            <div className={`size-full`}/>
                        </div>
                        <div className="w-[7rem] h-[10.5rem] min-[390px]:w-[10.5rem] min-[390px]:h-[15.75rem] bg-slate-800/50">
                            <div className={`size-full`}/>
                        </div>
                        <div className="w-[7rem] h-[10.5rem] min-[390px]:w-[10.5rem] min-[390px]:h-[15.75rem] bg-slate-800/50">
                            <div className={`size-full`}/>
                        </div>
                    </div>
                :
                    <>
                        <div className="w-fit h-fit grid grid-cols-2 md:grid-cols-4 min-[570px]:grid-cols-3 min-[940px]:grid-cols-5 gap-4 justify-items-center">
                            {movies.map(function(data) {
                                return (
                                    <div className="w-[7rem] h-[10.5rem] min-[390px]:w-[10.5rem] min-[390px]:h-[15.75rem]" key={data["ID"]}>
                                        <img id={data["ID"]} src={data["images"][1]["path"]} className={`poster size-full transition-all duration-200 ease-in-out`} alt={data["name"]}/>
                                        <div onClick={() => handleClick(data, 0)} className="relative bottom-full size-full bg-gradient-to-b from-transparent to-slate-900/70 cursor-pointer transition-all duration-300 ease-in-out hover:opacity-0">
                                            <div className="relative top-[80%] w-full h-fit flex justify-center items-center text-slate-50 font-semibold">
                                                <span className="text-center w-[80%] text-ellipsis text-nowrap overflow-clip">{data["name"]}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div id="movieTab" className="hidden md:w-[720px] min-[940px]:w-[904px] bg-gray-800 text-slate-50 shadow-md shadow-gray-800 mt-16 p-6 md:p-10">
                            <div className="min-[500px]:flex min-[500px]:justify-center gap-12">
                                <div className="w-full text-sm md:text-lg min-[500px]:py-5 pl-5">
                                    <h3 id="movieName" className="text-xl md:text-2xl font-semibold">DunaCast Druha</h3>
                                    <div className="pl-2 pt-4 space-y-[2px]">
                                        <div className="flex">
                                            <span className="w-24 md:w-32 font-semibold">Režisér: </span><span id="movieDirector" className="break-words"></span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-24 md:w-32 font-semibold">Dat. vydání: </span><span id="movieRelease" className="break-words"></span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-24 md:w-32 font-semibold">Hlavní role: </span><span id="movieRole" className="break-words"></span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-24 md:w-32 font-semibold">Délka: </span><span id="movieLength" className="break-words"></span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-24 md:w-32 font-semibold">Věk: </span><span id="movieAge" className="break-words"></span>
                                        </div>
                                        <p id="movieGenres" className="p-6 pb-0"></p>
                                    </div>
                                </div>
                                <img id="moviePoster" alt="img" className={`hidden sm:block w-[5rem] h-[7.5rem] min-[390px]:w-[10.5rem] min-[390px]:h-[15.75rem] rounded-md`}/>
                            </div>
                            <span className="block pt-5 text-lg md:text-xl underline underline-offset-2">
                                Popis: 
                            </span>
                            <article id="movieDescription" className="text-md md:text-lg pt-4"></article>
                            <div className="flex gap-3 size-fit relative left-[100%] ml-[-13rem] mt-12 text-slate-50">
                                <Link to="/#program" onClick={() => handleRedirect("program")}><button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Program</button></Link>
                                <button onClick={() => closeTab()} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Zavřít</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </section>
    );
}