import { useEffect, useReducer, useState } from "react"
import DeleteButton from "./DeleteProjectionButton";
import ProjectionForm from "./AddProjectionForm";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export default function Users() {
    const [projections, setProjections] = useState([]);
    const [reload, forceReload] = useReducer(x => x + 1, 0);
    
    useEffect(() => {
        const getProjections = async () => {
            try {
              const res = await fetch('https://cinematica.8u.cz/php/api/getProjections.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==', {
                method: 'GET',
              });
              const output = await res.json();
              
              setProjections(output);
            } catch (e) {
              console.error("Something went wrong while fetching 'Projections': " + e);
            }
        }
    
        getProjections();
    }, [reload]);

    return (
        <div className='h-fit w-full'>
            <div className='lg:flex lg:justify-center lg:gap-[5%]'>
                <ProjectionForm/>
            </div>
            <div className='flex justify-center pb-5'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:sm:grid-cols-3 2xl:grid-cols-4 min-[2000px]:grid-cols-5 min-[2500px]:grid-cols-6 justify-items-center w-[90%] xl:w-[80%] h-fit text-gray-50 mt-32 gap-5'>
                    {projections.map(function(data) {
                        return (
                            <div className="w-64 h-fit bg-slate-800 border-[1px] border-slate-50/10 p-2 space-y-2 text-wrap break-words" key={data['ID']}>
                                <p className="text-lg">ID: {data['ID']}</p>
                                <p>Film: {data['movie']['name']}</p>
                                <p>Sál: {data['hall']}</p>
                                <p>Cena: {data['price']}Kč</p>
                                <p>Čas: {data['start_time']}</p>
                                <p>Typ: {data['is_3D'] === 1 ? "3D" : "2D"}</p>
                                <p>Jazyk: {data['language']}</p>
                                <div className="flex gap-3 pt-2">
                                    <span className="flex-grow">
                                        <span className='flex justify-center items-center rounded-full border-gray-800 bg-blue-400 text-gray-200 py-2 hover:opacity-50 hover:cursor-pointer'><FontAwesomeIcon icon={faPen}/></span>
                                    </span>
                                    <span onClick={ () => setTimeout(() => {forceReload()}, 100) }  className="flex-grow">
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