import { useState } from "react";
import GreenPopUp from '../../popUps/GreenPopUp.js'
import RedPopUp from '../../popUps/RedPopUp.js'
import $ from 'jquery'

export default function EditUser({forceReload, prevUser}) {
    const [successPopUp, setSuccessPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false);
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState({
        name: prevUser.name,
        surname: prevUser.surname,
        birthdate: prevUser.birthdate,
        phone_number: prevUser.phone_number,
        email: prevUser.email,
    })

    const handleChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleOnFocus = () => {
        document.getElementById('birthdate').type = 'date';
    }

    const handleOnBlur = (e) => {
        if (!e.target.value) {
            document.getElementById('birthdate').type = 'text';
        }
    }
    console.log(prevUser["ID"], user.name, user.surname, user.birthdate, user.phone_number, user.email);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = $(e.target);

        $.ajax({
            type: "POST",
            url: 'https://cinematica.8u.cz/php/handlers/dbUpdateCustomer.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==',
            data: {ID: prevUser["ID"], name: user.name, surname: user.surname, birthdate: user.birthdate, phone_number: user.phone_number, email: user.email},
            success(data) {
                if (data === 'success') {
                    setSuccessPopUp(true);
                    
                    localStorage.setItem("ID", prevUser["ID"]);
                    localStorage.setItem("name", user.name);
                    localStorage.setItem("surname", user.surname);
                    localStorage.setItem("birthdate", user.birthdate);
                    localStorage.setItem("email", user.email);
                    localStorage.setItem("phone_number", user.phone_number);

                    form[0].reset();
                    forceReload();

                    setTimeout(() => {
                        setSuccessPopUp(false);
                        setEdit(false);
                    }, 3000);
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
            {successPopUp && <GreenPopUp msg="Uživatel byl úspěšně aktualizován"/>}
            {errorPopUp && <RedPopUp msg="Při aktualizování uživatele došlo k chybě"/>}
            <button onClick={() => setEdit(true)} type="button" className='ml-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Aktualizovat</button>
            {edit &&
                <>
                    <div onClick={() => setEdit(!edit)} className="fixed top-0 left-0 w-screen h-screen bg-slate-900/80 z-50"/> 
                    <div className="fixed top-0 left-0 sm:left-[50%] w-full sm:w-[600px] sm:ml-[-300px] h-fit sm:mt-80 mt-16 shadow-md shadow-gray-800 bg-slate-800 sm:rounded-md sm:border-[1px] border-b border-slate-50/[0.1] z-50">
                        <div className="mx-auto w-fit h-fit p-6 sm:shadow-md sm:shadow-gray-800 bg-slate-800 sm:rounded-sm text-center">
                            <h3 className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text tracking-wide text-center text-4xl font-bold p-5">Aktualizovat údaje</h3>
                            <form className="text-start text-slate-200"
                                autoComplete='off'
                                method="post"
                                onSubmit={(e) => handleSubmit(e)}
                                >
                                <div className='flex gap-8'>
                                    <input type="text" name="name" id="name" onChange={(e) => handleChange(e)} value={user.name} placeholder="Jméno *" required className="w-[40%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  border-solid bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                                    <input type="text" name="surname" id="surname" onChange={(e) => handleChange(e)} value={user.surname} placeholder="Příjmení *" required className="w-[40%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  border-solid bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                                </div>
                                <input type="text" name="birthdate" id="birthdate" onChange={(e) => handleChange(e)} onFocus={(e) => handleOnFocus(e)} onBlur={(e) => handleOnBlur(e)} value={user.birthdate} placeholder="Datum narození *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  border-solid bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                                <input type="text" name="phone_number" id="phone_number" maxLength="11" onChange={(e) => handleChange(e)} value={user.phone_number} placeholder="Telefonní číslo *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  border-solid bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                                <input type="email" name="email" id="email" onChange={(e) => handleChange(e)} value={user.email} placeholder="E-mail *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  border-solid bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
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