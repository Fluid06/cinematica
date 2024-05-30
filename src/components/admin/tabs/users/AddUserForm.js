import { useState } from 'react'
import GreenPopUp from '../../../popUps/GreenPopUp.js'
import RedPopUp from '../../../popUps/RedPopUp.js'
import $ from 'jquery'

export default function UserForm({forceReload}) {
    const [successPopUp, setSuccessPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false);

    const [user, setUser] = useState({
        name: "",
        surname: "",
        birthdate: "",
        phone_number: "",
        email: "",
        is_admin: 0,
        pass: "",
        passAgain: "",
    })

    const handleOnFocus = () => {
        document.getElementById('birthdate').type = 'date';
    }

    const handleOnBlur = (e) => {
        if (!e.target.value) {
            document.getElementById('birthdate').type = 'text';
        }
    }

    const handleChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        
        $.ajax({
            type: "POST",
            url: 'https://cinematica.8u.cz/php/handlers/userAddHandler.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==',
            data: {name: user.name, surname: user.surname, birthdate: user.birthdate, phoneNumber: user.phone_number, email: user.email, is_admin: user.is_admin, pass: user.pass, passAgain: user.passAgain},
            success(data) {
                if (data === '"Success"') {
                    setSuccessPopUp(true);
                    form[0].reset();
                    setTimeout(() => {
                        setSuccessPopUp(false);
                    }, 3000);
                    setTimeout(() => {forceReload()}, 100);
                } else {    
                    setErrorPopUp(true);
                    console.error(data);
                    setTimeout(() => {
                        setErrorPopUp(false);
                    }, 3000);
                }
            },
        });
    };

    return (
        <>
        {successPopUp && <GreenPopUp msg="Uživatel byl úspěšně přidán"/>}
        {errorPopUp && <RedPopUp msg="Při přidávání uživatele došlo k chybě"/>}
        <div className="w-full mx-auto sm:w-[600px] h-fit p-6 sm:mt-16 2xl:mt-8 sm:shadow-md sm:shadow-gray-800 bg-slate-800 sm:rounded-sm text-center lg:mx-6">
            <h3 className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text tracking-wide text-center text-4xl font-bold p-5">Přidat uživatele</h3>
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
                <input type="password" name="pass" id="pass" onChange={(e) => handleChange(e)} value={user.pass} placeholder="Heslo *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  border-solid bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                <input type="password" name="passAgain" id="passAgain" onChange={(e) => handleChange(e)} value={user.passAgain} placeholder="Heslo znovu *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  border-solid bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>  
                <input onChange={() => setUser((prev) => ({...prev, is_admin: document.getElementById('is_admin').checked ? 1 : 0}))} type="checkbox" name="is_admin" id="is_admin" className='mt-8 accent-indigo-600 size-4'/>
                <label htmlFor="is_admin" className='mx-2 text-md lg:text-lg text-slate-200'>Admin</label><br/>
                <button type="submit" className='w-32 h-[2.5rem] mx-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-gray-200 mt-8 rounded-md text-lg font-semibold tracking-wider cursor-pointer p-2 hover:opacity-70'>Přidat</button>
            </form>
        </div>
        </>
    )
}
