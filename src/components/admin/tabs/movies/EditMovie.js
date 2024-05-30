import { useState } from "react";
import GreenPopUp from '../../../popUps/GreenPopUp.js'
import RedPopUp from '../../../popUps/RedPopUp.js'
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export default function EditMovie({prevMovie, forceReload}) {
    const [successPopUp, setSuccessPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false);
    const [edit, setEdit] = useState(false);
    const [movie, setMovie] = useState({
        name: prevMovie.name,
        release_date: prevMovie.release_date,
        length: prevMovie.length,
        minimum_age: prevMovie.minimum_age,
        main_actor_name: prevMovie.main_actor_name,
        director_name: prevMovie.director_name,
        description: prevMovie.description
    })

    const handleOnFocus = () => {
        document.getElementById('release_date').type = 'date';
    }

    const handleOnBlur = (e) => {
        if (!e.target.value) {
            document.getElementById('release_date').type = 'text';
        }
    }

    const handleChange = (e) => {
        setMovie((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        $.ajax({
            type: "POST",
            url: 'https://cinematica.8u.cz/php/handlers/movieEditHandler.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==',
            data: {ID: prevMovie["ID"], name: movie.name, release_date: movie.release_date, length: movie.length, minimum_age: movie.minimum_age, main_actor_name: movie.main_actor_name, director_name: movie.director_name, description: movie.description},
            success(data) {
                if (data === '"Success"') {
                    setSuccessPopUp(true);

                    setTimeout(() => {
                        setSuccessPopUp(false);
                        setEdit(false);
                    }, 3000);
                    setTimeout(() => {forceReload()}, 100);
                } else {    
                    setErrorPopUp(true);
                    console.error(data);
                    setTimeout(() => {
                        setErrorPopUp(false);
                        setEdit(false);
                    }, 3000);
                }
            },
        });
    };

    return (
        <>
            {successPopUp && <GreenPopUp msg="Film byl úspěšně aktualizován"/>}
            {errorPopUp && <RedPopUp msg="Při aktualizování filmu došlo k chybě"/>}
            <span onClick={() => setEdit(true)} className='flex justify-center items-center rounded-full border-gray-800 bg-blue-400 text-gray-200 py-2 hover:opacity-50 hover:cursor-pointer'><FontAwesomeIcon icon={faPen}/></span>
            {edit &&
                <>
                    <div onClick={() => setEdit(!edit)} className="fixed top-0 left-0 w-screen h-screen bg-slate-900/80 z-50"/> 
                    <div className="fixed top-0 left-0 sm:left-[50%] w-full sm:w-[600px] sm:ml-[-300px] h-fit sm:mt-80 mt-14 shadow-md shadow-gray-800 bg-slate-800 sm:rounded-md sm:border-[1px] border-b border-slate-50/[0.1] z-50">
                        <div className="w-full h-fit p-6 sm:shadow-md sm:shadow-gray-800 bg-slate-800 sm:rounded-sm text-center">
                            <h3 className="bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text tracking-wide text-center text-4xl font-bold p-5">Aktualizovat film</h3>
                            <form className="text-start text-slate-200"
                                autoComplete='off'
                                method="post"
                                onSubmit={(e) => handleSubmit(e)}
                                >
                                <input onChange={(e) => handleChange(e)} value={movie.name} type="text" name="name" id="name" placeholder="Název *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400   bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                                <input onChange={(e) => handleChange(e)} value={movie.release_date} type="text" name="release_date" id="release_date" onFocus={(e) => handleOnFocus(e)} onBlur={(e) => handleOnBlur(e)} placeholder="Datum vydání *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400   bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                                <input onChange={(e) => handleChange(e)} value={movie.length} type="number" name="length" id="length" min="0" placeholder="Délka *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400   bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                                <input onChange={(e) => handleChange(e)} value={movie.minimum_age} type="number" name="minimum_age" id="minimum_age" min="0" max="18" placeholder="Věková hranice *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400   bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                                <input onChange={(e) => handleChange(e)} value={movie.director_name} type="text" name="director_name" id="director_name" placeholder="Režisér" className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400   bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                                <input onChange={(e) => handleChange(e)} value={movie.main_actor_name} type="text" name="actor" id="actor" placeholder="Hlavní herec" className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                                <textarea onChange={(e) => handleChange(e)} value={movie.description} name="description" id="description" rows="1" placeholder="Popis" className='w-[90%] min-h-12 max-h-96 block p-2 pb-0 mt-8 border-2 border-gray-400  bg-transparent text-lg outline-none focus:border-gray-500'></textarea>
                                <button type="submit" className='ml-2 mt-6 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Aktualizovat</button>
                                <button onClick={() => setEdit(false)} type="button" className="ml-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Zavřít</button>
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}