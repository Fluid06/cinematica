import { useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

export default function Login({setCollapsed, setLogin}) {
    const [error, setError] = useState("");
    const [user, setUser] = useState({
        email: "",
        pwd: ""
    }); 
    
    const handleOnChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleCollapseAll = () => {
        setCollapsed(false);
        setLogin(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.pwd !== "" && user.email !== "") {
            setError("");

            $.ajax({
                type: "POST",
                url: "https://cinematica.8u.cz/php/handlers/loginHandler.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==",
                data: { email: user.email, pwd: user.pwd },
                
                success(data) {
                    if (data.indexOf("account_error_occured") !== -1) {
                        setError("Účet s tímto emailem neexistuje.");
                    } else if (data.indexOf("password_error_occured") !== -1) {
                        setError("Nesprávné heslo.");
                    } else {
                        data = JSON.parse(data);
                        localStorage.setItem("ID", data[0]["ID"]);
                        localStorage.setItem("name", data[0]["name"]);
                        localStorage.setItem("surname", data[0]["surname"]);
                        localStorage.setItem("birthdate", data[0]["birthdate"]);
                        localStorage.setItem("email", data[0]["email"]);
                        localStorage.setItem("phone_number", data[0]["phone_number"]);
                        localStorage.setItem("is_admin", data[0]["is_admin"]);
                        
                        if (localStorage.getItem("is_admin") === "1") {
                            window.location.replace("/admin");
                        } else {
                            window.location.replace("/");
                        }    
                    }
                },
            });
        } else {
            if (user.email === "" && user.pwd === "") {
                setError("Zadejte prosím email a heslo.");
            } else if (user.pwd === "") {
                setError("Zadejte prosím heslo.");
            } else if (user.email === "") {
                setError("Zadejte prosím email.");
            } 
        }
    }

    return (
        <div className="absolute w-full sm:w-96 sm:translate-x-[65%] md:translate-x-[50%] lg:translate-x-[65%] top-14 sm:top-16 h-fit sm:rounded-md bg-slate-800 border-[1px] border-slate-50/[0.1]">
            <h3 className="text-center px-4 pt-4 text-xl font-semibold">Přihlásit</h3>
            <p className="px-8 py-3 text-red-500 italic">{error || ""}</p>
            <form 
                autoComplete="on"
                method="post"
                onSubmit={(e) => handleSubmit(e)}
            >   
                <div className="px-5">
                    <label htmlFor="email" className="text-md">E-mail: </label>
                    <input type="email" name="email" id="email" onChange={(e) => handleOnChange(e)} value={user.email} className="block w-full h-[38px] p-3 border-2 border-slate-50/[0.1] border-solid bg-transparent text-lg outline-none select-none focus:border-gray-500 focus:rounded-md transition-all ease-out duration-100"/>
                </div>
                <div className="px-5 mt-5">
                    <label htmlFor="pwd" className="text-md">Heslo: </label>
                    <input type="password" name="pwd" id="pwd" onChange={(e) => handleOnChange(e)} value={user.pwd} className="block w-full h-[38px] p-3 border-2 border-slate-50/[0.1] border-solid bg-transparent text-lg outline-none select-none focus:border-gray-500 focus:rounded-md transition-all ease-out duration-100"/>
                </div>
                <p className="ml-9 mt-2 text-sm"><Link to="/registration" onClick={() => handleCollapseAll()} className="text-blue-500 hover:underline">Nemáte účet? Zaregistrujte se.</Link></p>
                <button type="submit" className='w-24 h-[2.5rem] mx-8 my-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-gray-200 mt-5 rounded-md text-sm font-semibold tracking-wider cursor-pointer hover:opacity-70'>Přihlásit</button>
            </form>
        </div>
    )
}