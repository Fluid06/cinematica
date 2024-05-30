import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import $ from 'jquery'
import { useState} from "react";

export default function DeleteButton({id, forceReload}) {
    const [confirm, setConfirm] = useState(false);
    
    const handleClick = (e) => {
        e.preventDefault();
        setConfirm(false);
        $.ajax({
            type: "POST",
            url: "https://cinematica.8u.cz/php/handlers/dbDeleteReservation.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==",
            data: { reservation: id },
            success(data) {
                if (data === 'success') {
                    setTimeout(() => {forceReload()}, 100);
                }
            },
            error(data) {
                console.error(data);
            }
        });
    }

    return (
        <>
            <span onClick={() => setConfirm(true)} className="flex items-center w-fit h-10 p-2 text-slate-50 bg-gray-900 rounded-md hover:cursor-pointer hover:opacity-50">
                <FontAwesomeIcon className="size-6" icon={faXmark}/>
            </span>
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