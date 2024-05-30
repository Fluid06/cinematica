import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery'

export default function DeleteButton(props) {
    const [confirm, setConfirm] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setConfirm(false);

        $.ajax({
            type: "POST",
            url: "https://cinematica.8u.cz/php/handlers/dbDeleteUser.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==",
            data: { id: props.id },

            error(data) {
                console.error(data);
            }
        });
    }

    return (
        <>
            <span onClick={() => setConfirm(true)} className='flex justify-center items-center rounded-full border-gray-800 bg-red-400 text-gray-200 py-2 hover:opacity-50 hover:cursor-pointer'><FontAwesomeIcon icon={faTrash}/></span>
            {confirm && 
                <>
                    <div onClick={() => setConfirm(!confirm)} className="fixed top-0 left-0 w-screen h-screen bg-slate-900/80 z-50"/>
                    <div className="fixed top-0 left-[50%] ml-[-175px] lg:ml-[-225px] w-[350px] lg:w-[450px] h-fit 2xl:h-fit p-6 mt-80 shadow-md shadow-gray-800 bg-slate-800 rounded-md border-[1px] border-b border-slate-50/[0.1] z-50">
                        <p className="text-lg">Opravdu chcete zrušit tuto rezervaci?</p>
                        <div className="flex gap-5 relative ml-[9rem] lg:ml-[16rem] pt-8 select-none">
                            <span onClick={handleClick} className="px-5 py-1 rounded-md border border-slate-50/10 hover:opacity-50 hover:cursor-pointer">
                                Ano
                            </span>
                            <span onClick={() => setConfirm(false)} className="px-5 py-1 rounded-md border border-slate-50/10 hover:opacity-50 hover:cursor-pointer">
                                Ne
                            </span>
                        </div>
                    </div>
                </>
            }
        </>
    )
}