import { useState } from 'react'
import GreenPopUp from '../../popUps/GreenPopUp';
import RedPopUp from '../../popUps/RedPopUp';
import $ from 'jquery'

export default function Registration() {
    const [successPopUp, setSuccessPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState({
        name: "", 
        surname: "", 
        birthdate: "", 
        phoneNumber: "", 
        email: "",
        pass: "",
        passAgain: ""
    });

    const handleOnFocus = () => {
        document.getElementById('birthdate').type = 'date';
    }

    const handleOnBlur = (e) => {
        if (!e.target.value) {
            document.getElementById('birthdate').type = 'text';
        }
    }

    const inputCheck = (val) => {
        switch (val) {
            case "birthdate": {
                let d = new Date();
                let parts = user.birthdate.split("-");
                let birth = new Date(parts[0], parts[1]-1, parts[2]);

                return (d.setDate(d.getDate() - 365) > birth);
            }
            case "email": {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(user.email);
            }
            case "number": {
                return user.phoneNumber.length >= 6 && user.phoneNumber.length <= 15 ? true : false;
            }
            case "pwd": {
                const lowerCaseLetters = /[a-z]/g;
                var upperCaseLetters = /[A-Z]/g;
                var numbers = /[0-9]/g;
                
                const pwd = user.pass;

                return pwd.match(lowerCaseLetters) && pwd.match(upperCaseLetters) && pwd.match(numbers) && pwd.length >= 6 ? true : false;
            }
            default: return false;
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
        
        if (user.pass === user.passAgain && inputCheck("birthdate") && inputCheck("email") && inputCheck("number") && inputCheck("pwd")) {
            setError("");
            $.ajax({
                type: "POST",
                url: 'https://cinematica.8u.cz/php/handlers/userAddHandler.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==',
                data: {name: user.name, surname: user.surname, birthdate: user.birthdate, phoneNumber: user.phoneNumber, email: user.email, is_admin: 0, pass: user.pass, passAgain: user.passAgain},
                success(data) {
                    if (data === '"Success"') {
                        setSuccessPopUp(true);

                        setUser({
                            name: "", 
                            surname: "", 
                            birthdate: "", 
                            phoneNumber: "", 
                            email: "",
                            pass: "",
                            passAgain: ""
                        });

                        document.getElementById('birthdate').type = 'text';
                        
                        setTimeout(() => {
                            setSuccessPopUp(false);
                            window.location.replace("/");
                        }, 3000);
                    } else {
                        if (data.indexOf("phone_number_UNIQUE") !== -1) {
                            setError("Zadané číslo je již obsazené.");
                        } else if (data.indexOf("email_UNIQUE") !== -1) {
                            setError("Zadaný email je již obsazený.");
                        }
                    }
                },
                error(data) {
                    setErrorPopUp(true);
                        
                    setTimeout(() => {
                        setErrorPopUp(false);
                    }, 3000);
                }
            });
        } else {
            if (user.pass !== user.passAgain) {
                setError("Hesla se neshodují.");
            } else if (!inputCheck("birthdate")) {
                setError("Zadejte platné datum narození.");
            } else if (!inputCheck("email")) {
                setError("Zadejte platný email.");
            } else if (!inputCheck("number")) {
                setError("Zadejte platné telefonní číslo.");
            } else if (!inputCheck("pwd")) {
                setError("Heslo musí mít minimálně 6 znaků a musí obsahovat kombinaci malých, velkých písmen a čísel.");
            }
        }
    };

    return (
        <>
            {successPopUp && <GreenPopUp msg="Účet byl úspešně vytvořen."/>}
            {errorPopUp && <RedPopUp msg="Při vytváření účtu došlo k chybě."/>}
            <div className='flex justify-center mb-64'>
                <div className="sm:w-[600px] w-full h-fit p-6 mt-14 sm:mt-28 sm:shadow-md sm:shadow-gray-800 bg-slate-800 sm:rounded-md sm:border-[1px] border-b border-slate-50/[0.1] lg:mx-6">
                    <h3 className="block bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text tracking-wide text-center text-4xl font-bold p-5">Registrace</h3>
                    <p className="px-5 py-3 text-red-500 italic">{error || ""}</p>
                    <form className="text-start text-slate-200"
                        autoComplete='off'
                        method="post"
                        onSubmit={(e) => handleSubmit(e)}
                        >
                        <div className='flex gap-8'>
                            <input onChange={(e) => handleChange(e)} type="text" name="name" id="name" value={user.name} maxLength="45" placeholder="Jméno *" required className="w-[40%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  border-solid bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                            <input onChange={(e) => handleChange(e)} type="text" name="surname" id="surname" value={user.surname} maxLength="45" placeholder="Příjmení *" required className="w-[40%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  border-solid bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                        </div>
                        <input onChange={(e) => handleChange(e)} type="text" name="birthdate" id="birthdate" onFocus={(e) => handleOnFocus(e)} onBlur={(e) => handleOnBlur(e)} value={user.birthdate} placeholder="Datum narození *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  border-solid bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                        <div className='mt-12'>
                            <input onChange={(e) => handleChange(e)} type="email" name="email" id="email" value={user.email} maxLength="60" placeholder="E-mail *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  border-solid bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                            <div className='flex gap-1'>
                                <span className='w-[66px] mt-7 px-3 text-lg border-r-[1px] border-slate-50/[0.1]'>+420</span>
                                <input onChange={(e) => handleChange(e)} type="number" name="phoneNumber" id="phoneNumber" value={user.phoneNumber} placeholder="Telefonní číslo *" required className="max-w-[76%] w-[76%] sm:w-[36%] sm:max-w-none h-[38px] block p-2 pb-0 mt-5 ml-2 border-b-2 border-gray-400  border-solid bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                            </div>
                        </div>
                        <div className='mt-12'>
                            <input onChange={(e) => handleChange(e)} type="password" name="pass" id="pass" value={user.pass} maxLength="90" placeholder="Heslo *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  border-solid bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>
                            <input onChange={(e) => handleChange(e)} type="password" name="passAgain" id="passAgain" value={user.passAgain} maxLength="90" placeholder="Heslo znovu *" required className="w-[90%] sm:w-[50%] h-[38px] block p-2 pb-0 mt-5 border-b-2 border-gray-400  border-solid bg-transparent text-lg rounded-t-lg outline-none select-none focus:border-b-gray-500 focus:pb-2 transition-all ease-out duration-100"/>        
                        </div>
                        <button type="submit" className='w-32 h-[2.5rem] mx-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-gray-200 mt-12 rounded-md text-lg font-semibold tracking-wider cursor-pointer p-2 hover:opacity-70'>Registrovat</button>
                    </form>
                </div>
            </div>
        </>
    )
}