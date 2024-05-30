import { useState, useEffect } from 'react'
import GreenPopUp from '../../../popUps/GreenPopUp.js'
import RedPopUp from '../../../popUps/RedPopUp.js'
import $ from 'jquery'

export default function ProjectionForm() {
    const [movies, setMovies] = useState([]);
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [halls, setHalls] = useState([]);

    const [successPopUp, setSuccessPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false);
    const [selectMovie, setSelectMovie] = useState(false);
    const [selectHall, setSelectHall] = useState(false);
    const [selectLang, setSelectLang] = useState(false);

    const [movieID, setMovieID] = useState('');
    const [hallID, setHallID] = useState('');
    const [price, setPrice] = useState(0);
    const [TD, setTD] = useState('off');
    const [startTime, setStartTime] = useState('');
    const [lang, setLang] = useState('');

    useEffect(() => {
        const getMovies = async () => {
            try {
              const res = await fetch('https://cinematica.8u.cz/php/api/getMovies.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==', {
                method: 'GET',
              });
              const output = await res.json();
              
              setMovies(output);
              setSearchedMovies(output);
            } catch (e) {
              console.error("Something went wrong while fetching 'Movies': " + e);
            }
        }

        const getHalls = async () => {
            try {
              const res = await fetch('https://cinematica.8u.cz/php/api/getHalls.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==', {
                method: 'GET',
              });
              const output = await res.json();
              
              setHalls(output);
            } catch (e) {
              console.error("Something went wrong while fetching 'Halls': " + e);
            }
        }
    
        getMovies();
        getHalls();
    }, []);

    const handleOnFocus = () => {
        document.getElementById('startTime').type = 'datetime-local';
    }

    const handleOnBlur = (e) => {
        if (!e.target.value) {
            document.getElementById('startTime').type = 'text';
        }
    }

    const timeCheck = (time) => {
        const date = new Date(time);
        
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        const startTime = { hours: 10, minutes: 0 };
        const endTime = { hours: 20, minutes: 0 };
        
        const isAfterStartTime = (hours >= startTime.hours) || (hours === startTime.hours && minutes >= startTime.minutes);
        const isBeforeEndTime = (hours <= endTime.hours) || (hours === endTime.hours && minutes <= endTime.minutes);
        
        return isAfterStartTime && isBeforeEndTime;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (movieID === '') {
            alert("Klikni na vybraný film, prosím.");
        } else if (!timeCheck(startTime)) {
            alert("Promítání může začínat nejdřív v 10 hodin ráno a nejpozději v 20:59 večer.");
        } else {
            const form = $(e.target);
        
            $.ajax({
                type: "POST",
                url: 'https://cinematica.8u.cz/php/handlers/projectionAddHandler.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==',
                data: { id: movieID, hall: hallID, price: price, TD: TD, start_time: startTime, lang: lang },
                success(data) {
                    if (data === '"success"') {
                        setTD('off');
                        setStartTime('');
                        document.getElementById('startTime').type = 'text';
                        
                        setSuccessPopUp(true);
                        form[0].reset();
                        setTimeout(() => {
                            setSuccessPopUp(false);
                        }, 3000);
                    } else {
                        setErrorPopUp(true);
                        console.error(data);
                        setTimeout(() => {
                            setErrorPopUp(false);
                        }, 3000);
        
                    }
                },
            });
        }
    };

    const handleClickMovie = (e) => {
        const id = e.target.id.split(",")[0];
        const movieName = [];

        for (var i = 1; i < e.target.id.split(",").length; i++) {
            movieName.push(e.target.id.split(",")[i]);
        }
        
        setMovieID(id);

        document.getElementById('movieName').value = movieName.join(",");

        setSelectMovie(false);
    } 

    const handleClickHall = (e) => {
        const id = e.target.id;
        
        setHallID(id);

        document.getElementById('hall').value = "Sál " + id;

        setSelectHall(false);
    } 

    const handleClickLang = (lang) => {
        setLang(lang);

        document.getElementById('lang').value = lang;

        setSelectLang(false);
    }

    const handleClick = (e) => {
        const input = e.target.value.toLowerCase();
        const newMovies = [];
        
        if (input.length !== 0) {
            for (var i = 0; i < movies.length; i++) {
                if (movies[i]["name"].toLowerCase().indexOf(input) !== -1) {
                    newMovies.push(movies[i]);
                }
            }

            setSearchedMovies(newMovies);
        } else {
            setSearchedMovies(movies);
        }
    }

    return (
        <>
        {successPopUp && <GreenPopUp msg="Promítání bylo úspěšně vloženo"/>}
        {errorPopUp && <RedPopUp msg="Při vytváření promítání došlo k chybě"/>}
        <div className="w-full mx-auto sm:w-[600px] h-fit p-6 sm:mt-16 2xl:mt-8 sm:shadow-md sm:shadow-gray-800 bg-slate-800 sm:rounded-sm text-center lg:mx-3">
            <h3 className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text tracking-wide text-center text-4xl font-bold p-5">Přidat promítání</h3>
            <form className="text-start text-slate-200"
                autoComplete='off'
                method="post"
                onSubmit={(e) => handleSubmit(e)}
                >
                <div className='sm:flex sm:gap-8'>
                    <input onClick={() => setSelectMovie(true)} onChange={(e) => handleClick(e)} type="text" name="movieName" id="movieName" placeholder="Film *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400   bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                    <div className="p-2 pb-0 mt-5  text-lg outline-none select-none">
                        <input onChange={() => setTD(document.getElementById('3D').checked ? 1 : 0)} type="checkbox" name="3D" id="3D" className='accent-indigo-600 size-4'/>
                        <label htmlFor="3D" className='mx-2 text-md lg:text-lg text-slate-200'>3D promítání</label>
                    </div>
                </div>
                {selectMovie &&
                    <>
                        <div onClick={() => setSelectMovie(false)} className='absolute top-0 left-0 w-full h-full'></div>
                        <div className='absolute max-w-[90%] w-fit h-48 text-gray-900 border-2 border-gray-400 rounded-md bg-gray-100 mt-2 overflow-y-scroll'>
                            <div className='p-2'>
                                <div className='grid grid-cols-7 justify-between w-full overflow-hidden whitespace-nowrap font-bold underline underline-offset-4 select-none mb-3'>
                                    <div className='col-span-1 px-2'>ID</div>
                                    <div className='col-span-3 px-2'>NAME</div>
                                    <div className='sm:block hidden col-span-3 px-2'>DIRECTOR</div>
                                </div>
                                {searchedMovies.map(function(data) {
                                    return (
                                        <div onClick={(e) => handleClickMovie(e)} id={[data['ID'], data['name']]} key={data['ID']} className='grid grid-cols-7 justify-between w-full break-words select-none mt-1 hover:bg-blue-500 hover:text-gray-200'>
                                            <div id={[data['ID'], data['name']]} className='col-span-1 px-2'>{data['ID']}</div>
                                            <div id={[data['ID'], data['name']]} className='col-span-6 sm:col-span-3 px-2'>{data['name']}</div>
                                            <div id={[data['ID'], data['name']]} className='sm:block hidden col-span-3 px-2'>{data['director_name']}</div>
                                        </div>
                                    )
                                })}    
                            </div>  
                        </div>
                    </>  
                }
                <input onClick={() => setSelectHall(true)} type="text" name="hall" id="hall" placeholder="Sál *" required readOnly className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400   bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                {selectHall &&
                    <>
                        <div onClick={() => setSelectHall(false)} className='absolute top-0 left-0 w-full h-full'></div>
                        <div className='absolute w-fit h-fit text-gray-900 border-2 border-gray-400 rounded-md bg-gray-100  mt-2 overflow-y-scroll'>
                            <div className='p-2'>
                                <div className='grid justify-between w-20 overflow-hidden whitespace-nowrap font-bold underline underline-offset-4 select-none mb-3'>
                                    <div className='col-span-1 px-2'>SÁL</div>
                                </div>
                                {halls.map(function(data) {
                                    return (
                                        <div onClick={(e) => handleClickHall(e)} id={data['ID']} key={data['ID']} className='grid justify-between overflow-hidden whitespace-nowrap select-none mt-1 hover:bg-blue-500 hover:text-gray-200'>
                                            <div id={data['ID']} className='col-span-1 px-2'>Sál {data['ID']}</div>
                                        </div>
                                    )
                                })}    
                            </div>  
                        </div>
                    </>  
                }
                <input onChange={(e) => setPrice(e.target.value)} type="number" name="price" id="price" min="0" max="9999" placeholder='Cena *' required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400   bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                <input type="text" name="startTime" id="startTime" onChange={(e) => setStartTime(e.target.value)} onFocus={(e) => handleOnFocus(e)} onBlur={(e) => handleOnBlur(e)} value={startTime} placeholder="Zahájení *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  border-solid bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                <input onClick={() => setSelectLang(true)} type="text" name="lang" id="lang" placeholder="Jazyk *" required readOnly className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400   bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                {selectLang &&
                    <>
                        <div onClick={() => setSelectLang(false)} className='absolute top-0 left-0 w-full h-full'></div>
                        <div className='absolute w-fit h-fit text-gray-900 border-2 border-gray-400 rounded-md bg-gray-100  mt-2 overflow-y-scroll'>
                            <div className='p-2'>
                                <div className='grid justify-between w-20 overflow-hidden whitespace-nowrap font-bold underline underline-offset-4 select-none mb-3'>
                                    <div className='col-span-1 px-2'>JAZYK</div>
                                </div>
                                <div onClick={() => handleClickLang("Čeština")} className='grid justify-between overflow-hidden whitespace-nowrap select-none mt-1 hover:bg-blue-500 hover:text-gray-200'>
                                    <div className='col-span-1 px-2'>Čeština</div>
                                </div>
                                <div onClick={() => handleClickLang("Angličtina")} className='grid justify-between overflow-hidden whitespace-nowrap select-none mt-1 hover:bg-blue-500 hover:text-gray-200'>
                                    <div className='col-span-1 px-2'>Angličtina</div>
                                </div>
                            </div>  
                        </div>
                    </>  
                }

                <button type="submit" className='w-32 h-[2.5rem] mx-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-gray-200 mt-8 rounded-md text-lg font-semibold tracking-wider cursor-pointer p-2 hover:opacity-70'>Přidat</button>
            </form>
        </div>
        </>
    )
}
