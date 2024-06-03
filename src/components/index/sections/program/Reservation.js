import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch } from "@fortawesome/free-solid-svg-icons";
import GreenPopUp from "../../../popUps/GreenPopUp.js";
import RedPopUp from "../../../popUps/RedPopUp.js";
import $ from 'jquery';

export default function Reservation({data, setReservation}) {
    const [allSeats, setAllSeats] = useState([]);
    const [occupiedSeats, setOccupiedSeats] = useState([]);
    const [userSeats, setUserSeats] = useState([]);

    const [isReserved, setIsRerserved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [successPopUp, setSuccessPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false);

    const [seatForRes, setSeatsForRes] = useState({data: []});

    useEffect(() => {
        const getSeats = async () => {
            try {
                let res = await fetch(`https://cinematica.8u.cz/php/api/getReservedSeats.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==&id=${data["ID"]}`, {
                    method: 'GET',
                });
                let output = await res.json();
                setOccupiedSeats(output);

                res = await fetch(`https://cinematica.8u.cz/php/api/getSeats.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==&id=${data["hall"]["ID"]}`, {
                    method: 'GET',
                });
                output = await res.json();
                setAllSeats(output);

                res = await fetch(`https://cinematica.8u.cz/php/api/getUsersProjectionSeats.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==&customer=${localStorage.getItem("ID")}&projection=${data["ID"]}`, {
                    method: 'GET',
                });
                output = await res.json();
                
                if (output["data"].length !== 0) {
                    setUserSeats(output["data"][0]["seats"]);
                }

                setLoading(false);
            } catch (e) {
                console.error("Something went wrong while fetching 'Seats': " + e);
            }
        }

        getSeats();
    }, [data]);

    useEffect(() => {
        if (typeof(occupiedSeats["data"]) !== "undefined") {
            if (occupiedSeats["data"].length !== 0) {
                occupiedSeats["data"].forEach(element => {
                    let id = element["row"] + element["number"];
        
                    document.getElementById(id).className += "text-red-400";
                });
            }
        }

        if (typeof(userSeats) !== "undefined") {
            if (userSeats.length !== 0) {
                var tmp;
                userSeats.forEach(element => {
                    let id = element["row"] + element["number"];
                    
                    tmp = seatForRes;
                    tmp["data"].push(id);
                            
                    document.getElementById(id).className = document.getElementById(id).className.replace("text-red-400", "text-green-500");
                });
                setIsRerserved(true);
                setSeatsForRes({data: tmp["data"]});
            }
        }
    }, [loading]);

    const handleClick = (e) => {
        var tmp;
        if (seatForRes["data"].indexOf(e) === -1) {
            if (document.getElementById(e).className.indexOf("text-red-400") === -1) {
                if (seatForRes["data"].length < 6) {
                    tmp = seatForRes;
                    tmp["data"].push(e);
                    setSeatsForRes({data: tmp["data"]});
                    
                    document.getElementById(e).className += "text-blue-400";
                } else {
                    alert("Nelze zvolit více než 6 sedadel.");
                }
            }
        } else {
            document.getElementById(e).className = document.getElementById(e).className.replace("text-blue-400", "");
            tmp = seatForRes;
            tmp["data"].splice(seatForRes["data"].indexOf(e), 1);
            setSeatsForRes({data: tmp["data"]});
        }
    } 

    const handleSubmit = () => {
        const seats = seatForRes["data"];
        if (seats.length === 0) {
            alert("Vyber alespoň jedno sedadlo.");
        } else {
            $.ajax({
                type: "POST",
                url: 'https://cinematica.8u.cz/php/handlers/reservationAddHandler.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==',
                data: { customer: localStorage.getItem("ID"), projection: data["ID"], hall: data["hall"]["ID"], seats: seatForRes["data"] },
                success(data) {
                    if (data === '"success"') {
                        setSuccessPopUp(true);
                        setTimeout(() => {
                            setSuccessPopUp(false);
                            setReservation(false);
                        }, 3000);
                    } else {
                        setErrorPopUp(true);
                        console.error(data);
                        setTimeout(() => {
                            setErrorPopUp(false);
                        }, 3000);
        
                    }
                },
            });
        }
    }

    return (
        <>
            {successPopUp && <GreenPopUp msg="Rezervace byla úspěšná"/>}
            {errorPopUp && <RedPopUp msg="Při vytváření rezervace došlo k chybě"/>}
            <div className="fixed left-0 md:left-[50%] md:ml-[-300px] lg:ml-[-450px] w-full md:w-[600px] lg:w-[900px] h-fit overflow-y-auto max-h-[90vh] top-14 p-6 md:top-16 md:shadow-md md:shadow-gray-800 bg-slate-800 md:rounded-md md:border-[1px] border-b border-slate-50/[0.1] z-50">
                <h3 className="text-xl font-semibold">{data["movie"]["name"]}, {data["is_3D"] === 0 ? "2D" : "3D"}</h3>
                <div className="space-y-2 text-md sm:text-lg p-4 pb-0">
                    <div className="flex">
                        <p className="font-bold w-20 sm:w-28">Datum: </p>
                        <p className="break-all">{data["start_time"].split(" ")[0]}</p>
                    </div>  
                    <div className="flex">
                        <p className="font-bold w-20 sm:w-28">Čas: </p>
                        <p className="break-all">{data["start_time"].split(" ")[1].split(":")[0]}:{data["start_time"].split(" ")[1].split(":")[1]}</p>
                    </div> 
                    <div className="flex">
                        <p className="font-bold w-20 sm:w-28">Sál: </p>
                        <p className="break-all">č. {data["hall"]["ID"]}</p>
                    </div>
                    {isReserved && 
                        <p className="sm:pl-8 pt-3 text-red-500 italic">Tohle promítání jste si již rezervovali.</p>
                    }
                </div>
                <div className="border-b border-slate-50/10 pb-3">
                    <div className="w-full grid grid-cols-1 justify-items-center mt-6 pb-8">
                        <span className="max-w-96 w-full h-1 bg-slate-300 mt-8 rounded-t-full mb-1"></span>
                        <p>Plátno</p>
                        <div className="text-slate-300 size-fit mt-12 mr-4">
                            <div className="text-sm text-slate-50/50 grid justify-items-center grid-cols-12 gap-x-1 gap-y-2 md:gap-y-4 mb-2 ml-4"> 
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                                <span>6</span>
                                <span>7</span>
                                <span>8</span>
                                <span>9</span>
                                <span>10</span>
                                <span>11</span>
                                <span>12</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="text-sm text-slate-50/50 grid grid-cols-1 justify-center gap-y-2 md:gap-y-4">
                                    <span>A</span>
                                    <span>B</span>
                                    <span>C</span>
                                    <span>D</span>
                                    <span>E</span>
                                    <span>F</span>
                                    <span>G</span>
                                    <span>H</span>
                                    <span>I</span>
                                    <span>J</span>
                                    <span>K</span>
                                    <span>L</span>
                                </div>
                                <div className="grid justify-items-center grid-cols-12 gap-x-1 gap-y-2 md:gap-y-4">
                                    {allSeats.map(function(data) {
                                    if (isReserved) {
                                        return (
                                            <div id={data["row"] + data["number"]} key={data["row"] + data["number"]} >
                                                <FontAwesomeIcon icon={faCouch}/>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div onClick={() => handleClick(data["row"] + data["number"])} id={data["row"] + data["number"]} key={data["row"] + data["number"]} >
                                                <FontAwesomeIcon icon={faCouch}/>
                                            </div>
                                        )
                                    }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-sm px-6">
                        <div className="flex gap-2">
                            <span className="text-red-400"><FontAwesomeIcon icon={faCouch}/></span>
                            <p> -&nbsp;&nbsp;Obsazená sedadla</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-green-500"><FontAwesomeIcon icon={faCouch}/></span>
                            <p> -&nbsp;&nbsp;Moje sedadla</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-blue-400"><FontAwesomeIcon icon={faCouch}/></span>
                            <p> -&nbsp;&nbsp;Zvolená sedadla</p>
                        </div>
                        <div className="flex gap-2">
                            <span><FontAwesomeIcon icon={faCouch}/></span>
                            <p> -&nbsp;&nbsp;Volná sedadla</p>
                        </div>
                    </div>
                </div>
                {seatForRes["data"].length !== 0 &&
                    <div className="flex gap-2 pt-4">
                        <p className="font-bold">Zvolená sedadla: </p>
                        <p className="block">{seatForRes["data"].join(", ")}</p>
                    </div> 
                }
                <div className="flex gap-3 size-fit relative left-[100%] ml-[-13rem] mt-12 text-slate-50">
                    {isReserved &&
                        <button onClick={() => setReservation(false)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Potvrdit</button>
                    }
                    {!isReserved &&
                        <button onClick={() => handleSubmit()} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Potvrdit</button>
                    }
                    <button onClick={() => setReservation(false)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Zavřít</button>
                </div>
            </div>
        </>
    )
}