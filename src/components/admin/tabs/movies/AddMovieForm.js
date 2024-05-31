import { useState, useEffect } from 'react'

export default function MovieForm() {
    const [select, setSelect] = useState(0);
    const [genres, setGenres] = useState([]);
    let selectedGenres = [];

    const handleOnFocus = () => {
        document.getElementById('release').type = 'date';
    }

    const handleOnBlur = (e) => {
        if (!e.target.value) {
            document.getElementById('release').type = 'text';
        }
    }

    useEffect(() => {
        const getGenres = async () => {
            try {
              const res = await fetch('https://cinematica.8u.cz/php/api/getGenres.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==', {
                method: 'GET',
              });
              const output = await res.json();
              
              setGenres(output);
            } catch (e) {
              console.error("Something went wrong while fetching 'Genres': " + e);
            }
        }
    
        getGenres();
      }, []);

    const handleClick = (e) => {
        const id = e.target.id;

        if (document.getElementById(id).className.indexOf('bg-blue-400') === -1) {
            document.getElementById(id).className = document.getElementById(id).className.replace('bg-gray-100', 'bg-blue-400');

            selectedGenres.push(e.target.innerText);
        } else {
            document.getElementById(id).className = document.getElementById(id).className.replace('bg-blue-400', 'bg-gray-100');

            selectedGenres.splice(selectedGenres.indexOf(e.target.innerText), 1);
        }

        document.getElementById('genre').value = selectedGenres.join(', ');
    } 

    return (
        <>
        {select === 1 && 
            <>  
                <div onClick={() => setSelect(0)} className='fixed w-screen h-full bottom-0'></div>
                <div className='fixed top-[50%] mt-[-12rem] sm:mt-0 sm:top-[8%] w-36 text-md left-[50%] ml-[-4.5rem] sm:w-96 sm:text-lg sm:ml-[-12rem] h-96 opacity-100 text-gray-800 rounded-sm overflow-y-scroll sm:overflow-y-auto sm:h-fit'>
                {genres.map(function(data) {
                    return (
                        <div onClick={(e) => handleClick(e)} id={data['ID']} key={data['ID']} className='flex justify-center items-center h-12 bg-gray-100 hover:cursor-pointer hover:bg-gray-300'>{ data['name'] }</div>
                    )
                })}
                </div>
            </> 
        }
        <div className="w-full mx-auto sm:w-[600px] h-fit p-6 sm:mt-16 2xl:mt-8 sm:shadow-md sm:shadow-gray-800 bg-slate-800 sm:rounded-sm text-center lg:mx-3">
            <h3 className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text tracking-wide text-center text-4xl font-bold p-5">Přidat film</h3>
            <form className="text-start text-slate-200"
                encType='multipart/form-data'
                autoComplete='off'
                method="post"
                action='https://cinematica.8u.cz/php/handlers/movieAddHandler.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw=='
                >
                <input type="text" name="name" id="name" placeholder="Název *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400   bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                <input type="text" name="release" id="release" onFocus={(e) => handleOnFocus(e)} onBlur={(e) => handleOnBlur(e)} placeholder="Datum vydání *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400   bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                <input type="number" name="length" id="length" min="0" placeholder="Délka *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400   bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                <input type="number" name="minimumAge" id="minimumAge" min="0" max="18" placeholder="Věková hranice *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400   bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                <input type="text" name="director" id="director" placeholder="Režisér" className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400   bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                <input type="text" name="actor" id="actor" placeholder="Hlavní herec" className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                <input onClick={() => setSelect(1)} type="text" name="genre" id="genre" placeholder='Zvol žánry *' value={selectedGenres[0]} readOnly className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                <textarea name="description" id="description" rows="1" placeholder="Popis" className='w-[90%] min-h-12 max-h-96 block p-2 pb-0 mt-8 border-2 border-gray-400  bg-transparent text-lg outline-none focus:border-gray-500'></textarea>
                <div className='mt-8 text-slate-200'>
                    <label className="text-lg border-b-2 border-gray-400" htmlFor="banner[]">Zvol banner filmu</label><br/>
                    <input 
                        type="file" 
                        id="banner[]"
                        name="banner[]"
                        accept='image/*'
                        className='w-full mt-3 text-sm text-wrap sm:text-md'
                        multiple
                        required
                    />
                </div>
                <div className='mt-8 text-slate-200'>
                    <label className="text-lg border-b-2 border-gray-400" htmlFor="poster[]">Zvol poster filmu</label><br/>
                    <input 
                        type="file" 
                        id="poster[]"
                        name="poster[]"
                        accept='image/*'
                        className='w-full mt-3 text-sm text-wrap sm:text-md'
                        multiple
                        required
                    />
                </div>
                <button type="submit" className='w-32 h-[2.5rem] mx-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-gray-200 mt-8 rounded-md text-lg font-semibold tracking-wider cursor-pointer p-2 hover:opacity-70'>Přidat</button>
            </form>
        </div>
        </>
    )
}
