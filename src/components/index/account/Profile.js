import { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "./deleteReservationButton";
import EditUser from "./EditUser";

export default function Profile() {
    const [pastReservation, setPastReservation] = useState([]);
    const [futureReservation, setFutureReservation] = useState([]);
    const [tab, setTab] = useState(0);
    const [reload, forceReload] = useReducer(x => x + 1, 0);

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getReservations = async () => {
            try {
                let res = await fetch(`https://cinematica.8u.cz/php/api/getUsersReservations.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==&customer=${localStorage.getItem("ID")}`, {
                    method: 'GET',
                });
                let output = await res.json();
        
                let future = {data: []};
                let past = {data: []};

                output["data"].forEach(element => {
                    if (new Date(element["projection"]["start_time"]) > new Date()) {
                        future["data"].push(element);
                    } else {
                        past["data"].push(element);
                    }
                });

                setFutureReservation(future);
                setPastReservation(past);
                setLoading(false);
            } catch (e) {
                console.error("Something went wrong while fetching 'Reservations': " + e);
            }
        }

        getReservations();
    }, [reload]);

    const handleClick = (prop) => {
        if (prop === 0) {
            setTab(0);
            if (tab === 1) {
                document.getElementById("indicator").className = document.getElementById("indicator").className.replace("bg-gradient-to-r from-blue-600 to-indigo-500 ml-[8.5rem]", "bg-gradient-to-r from-indigo-500 to-blue-600 ml-0 ");

                document.getElementById("acc").className = document.getElementById("acc").className.replace("bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text", "text-slate-50");
                document.getElementById("res").className = document.getElementById("res").className.replace("text-slate-50", "bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text");
            }
        } else if ((prop === 1)) {
            setTab(1);
            if (tab === 0) {
                document.getElementById("indicator").className = document.getElementById("indicator").className.replace("bg-gradient-to-r from-indigo-500 to-blue-600 ml-0", "bg-gradient-to-r from-blue-600 to-indigo-500 ml-[8.5rem]");
                
                document.getElementById("res").className = document.getElementById("res").className.replace("bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text", "text-slate-50");
                document.getElementById("acc").className = document.getElementById("acc").className.replace("text-slate-50", "bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text");
            }
        }
    }

    const handleLogout = () => {
        localStorage.setItem("ID", null);
        localStorage.setItem("name", null);
        localStorage.setItem("surname", null);
        localStorage.setItem("birthdate", null);
        localStorage.setItem("email", null);
        localStorage.setItem("phone_number", null);
        localStorage.setItem("is_admin", null);
    }

    if (localStorage.getItem("ID") !== "null" && localStorage.getItem("ID") !== null) {
        return (
            <div className='flex justify-center mb-64'>
                <div className="sm:w-[600px] w-full h-fit p-6 pt-1 mt-14 sm:mt-28 sm:shadow-md sm:shadow-gray-800 bg-slate-800 sm:rounded-md border border-slate-50/[0.1] lg:mx-6">
                    <div className="block text-end mt-2">
                        <Link to="/" onClick={() => handleLogout()} className="relative text-blue-600 text-md sm:text-lg hover:text-blue-500/50 text-nowrap">
                            Odhlásit&nbsp;&nbsp;<FontAwesomeIcon alt="Odhlásit" icon={ faRightFromBracket }/>
                        </Link>
                    </div>
                    <h3 className="block bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text tracking-wide text-center text-4xl pt-3 font-semibold break-words">{localStorage.getItem("name") + " " + localStorage.getItem("surname")}</h3>
                    <div className="w-full h-fit bg-slate-800 text-slate-50 mt-11">
                        <div className="flex gap-2 tracking-wider mt-5 ml-2">
                            <div onClick={() => handleClick(0)} className="w-32 block bg-gray-800 font-bold border border-b-0 border-slate-50/[0.1] rounded-t-md px-3 py-2 pb-4 cursor-pointer hover:bg-gray-900/20 transition-all duration-100 ease-in-out"><span onClick={() => handleClick(0)} id="res" className="relative bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text select-none transition-all duration-100 ease-in-out">REZERVACE</span></div>
                            <div onClick={() => handleClick(1)} className="w-32 block bg-gray-800 font-bold border border-b-0 border-slate-50/[0.1] rounded-t-md px-3 py-2 pb-4 cursor-pointer hover:bg-gray-900/20 transition-all duration-100 ease-in-out"><span onClick={() => handleClick(1)} id="acc" className="relative text-slate-50 select-none transition-all duration-100 ease-in-out">ÚČET</span></div>
                            <span id="indicator" className="absolute w-32 h-2 bg-gradient-to-r from-indigo-500 to-blue-600 ml-0 mt-[41px] rounded-t-md transition-all duration-200 ease-in-out"></span>
                        </div>
                        <div className="bg-gray-800 w-full h-fit rounded-b-md border-[1px] border-slate-50/[0.1]">
                            <div className="p-2">
                                {!loading && 
                                    <>
                                        {tab === 0 &&
                                            <>
                                                {pastReservation["data"].length === 0 && futureReservation["data"].length === 0
                                                ?
                                                    <p className="p-3">Dosud nebyla provedena žádná rezervace.</p>
                                                : 
                                                    <>
                                                        {futureReservation["data"].length !== 0 && 
                                                            <>
                                                                <p className="text-xl p-3">Budoucí:</p>
                                                                {futureReservation["data"].map(function(data) {
                                                                    return (
                                                                        <div className="flex justify-between px-4 py-1 rounded-sm border border-slate-50/10 space-y-2" key={data["ID"]}>
                                                                            <div>
                                                                                <p>{data["projection"]["movie"]["name"]}, {data["projection"]["is_3D"] === 0 ? "2D" : "3D"}</p>
                                                                                <div className="pl-1 space-y-1">
                                                                                    <p>Datum: {data["projection"]["start_time"].split(" ")[0]}</p>
                                                                                    <p>Čas: {data["projection"]["start_time"].split(" ")[1].split(":")[0] + ":" + data["projection"]["start_time"].split(" ")[1].split(":")[1]}</p>
                                                                                    <p>Sál: č. {data["projection"]["hall"]}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex items-center">
                                                                                <DeleteButton id={data['ID'].toString()} forceReload={forceReload}/>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </>
                                                        }
                                                        {pastReservation["data"].length !== 0 && 
                                                            <>
                                                                <p className="text-xl p-3">Uplynulé:</p>
                                                                {pastReservation["data"].map(function(data) {
                                                                    return (
                                                                        <div className="text-slate-50/50 px-4 py-1 rounded-sm border border-slate-50/10 space-y-2" key={data["ID"]}>
                                                                            <p>{data["projection"]["movie"]["name"]}, {data["projection"]["is_3D"] === 0 ? "2D" : "3D"}</p>
                                                                            <div className="pl-1 space-y-1">
                                                                                <p>Datum: {data["projection"]["start_time"].split(" ")[0]}</p>
                                                                                <p>Čas: {data["projection"]["start_time"].split(" ")[1].split(":")[0] + ":" + data["projection"]["start_time"].split(" ")[1].split(":")[1]}</p>
                                                                                <p>Sál: č. {data["projection"]["hall"]}</p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </>
                                                        }
                                                    </>
                                                }
                                            </>
                                        }
                                        {tab === 1 &&
                                            <>
                                                <h4 className="block text-center text-2xl bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text font-bold mt-5">Detaily účtu: </h4>
                                                <div className="grid grid-cols-1 justify-items-center p-3">
                                                    <div className="space-y-2 mt-8 text-md sm:text-lg">
                                                        <div className="flex">
                                                            <p className="font-bold w-32 sm:w-48">Identifikační číslo: </p>
                                                            <p className="break-all">{localStorage.getItem("ID")}</p>
                                                        </div>
                                                        <div className="flex">
                                                            <p className="font-bold w-32 sm:w-48">Jméno: </p>
                                                            <p className="break-all">{localStorage.getItem("name") + " " + localStorage.getItem("surname")}</p>
                                                        </div>  
                                                        <div className="flex">
                                                            <p className="font-bold w-32 sm:w-48">Datum narození: </p>
                                                            <p className="break-all">{localStorage.getItem("birthdate")}</p>
                                                        </div> 
                                                        <div className="flex">
                                                            <p className="font-bold w-32 sm:w-48">E-mail: </p>
                                                            <p className="break-all">{localStorage.getItem("email")}</p>
                                                        </div> 
                                                        <div className="flex">
                                                            <p className="font-bold w-32 sm:w-48">Telefonní číslo: </p>
                                                            <p className="break-all">{localStorage.getItem("phone_number")}</p>
                                                        </div>
                                                    </div>
                                                    <div className="w-full flex justify-end mt-8">
                                                        <EditUser forceReload={forceReload} prevUser={{ID: localStorage.getItem("ID"), name: localStorage.getItem("name"), surname: localStorage.getItem("surname"), birthdate: localStorage.getItem("birthdate"), phone_number: localStorage.getItem("phone_number"), email: localStorage.getItem("email")}}/>
                                                    </div>
                                                </div>
                                            </>
                                        }   
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        window.location.replace("/");
    }
}