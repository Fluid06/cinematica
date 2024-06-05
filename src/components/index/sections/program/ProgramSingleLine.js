import { useEffect, useState } from "react";
import Reservation from "./Reservation";

export default function ProgramSingleLine({data, login, setLogin, day}) {
    
    var key = 0;
    
    const [projections, setProjections] = useState([]);
    const [reservation, setReservation] = useState(false);
    const [chosenProjection, setChosenProjection] = useState({});

    useEffect(() => {
        const times = [
            {data: {}, time: ""}, 
            {data: {}, time: ""}, 
            {data: {}, time: ""}, 
            {data: {}, time: ""}, 
            {data: {}, time: ""}, 
            {data: {}, time: ""}, 
            {data: {}, time: ""}, 
            {data: {}, time: ""}, 
            {data: {}, time: ""}, 
            {data: {}, time: ""}, 
            {data: {}, time: ""}];

        data["projections"].forEach(element => {
            var tmp = new Date(element["start_time"]);
            var projectionTime = tmp.getHours() + ":" + ((tmp.getMinutes() < 10) ? "0" + tmp.getMinutes() : tmp.getMinutes());
            var projectionHour = tmp.getHours();

            times[projectionHour - 10].time = projectionTime;
            times[projectionHour - 10].data = element;

            setProjections(times);
        });
    }, [data]);

    const handleClick = (id) => {
        if (localStorage.getItem("name") !== "null" && localStorage.getItem("name") !== null) {
            setReservation(!reservation);
            setChosenProjection(id);
        } else {
            setLogin(!login);
        }
    }

    const cmpTimes = (time) => {
        let now = new Date();
        
        if (day === 0) {
            if (time < (now.getHours() < 10 ? "0" + now.getHours() : now.getHours()) + ":" + (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes())) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    return (
        <>
            <div className="bg-gray-800 md:grid md:grid-cols-10 border border-slate-50/10 p-3 md:p-6 mt-2">
                <div className="col-span-3 flex flex-col gap-1 md:border-r md:border-r-slate-50/10 text-wrap break-words">
                    <p className="text-xl mr-4">{data["movie_info"]["name"]}</p>
                    <p className="text-sm mr-4">{data["movie_info"]["director_name"]}</p>
                </div>
                <div className="grid md:hidden gap-4 min-[940px]:gap-12 text-[0.8rem] min-[940px]:text-sm grid-cols-11 justify-items-center col-span-7 text-slate-50/30 border-b border-b-slate-50/10 mt-4">
                    <span>10</span>
                    <span>11</span>
                    <span>12</span>
                    <span>13</span>
                    <span>14</span>
                    <span>15</span>
                    <span>16</span>
                    <span>17</span>
                    <span>18</span>
                    <span>19</span>
                    <span>20</span>
                </div>
                <div className="md:mx-8 mt-2 md:mt-0 self-center grid gap-4 min-[940px]:gap-12 text-[0.8rem] min-[940px]:text-sm grid-cols-11 justify-items-center col-span-7">
                    {projections.map(function(data) {
                        key++;
                        if (cmpTimes(data["time"])) {
                            return (<span className="text-[0.6rem] min-[450px]:text-[0.8rem] min-[940px]:text-sm text-slate-50/50" key={key}>{data["time"]}</span>)
                        } else {
                            return (<span onClick={() => handleClick(data["data"])} className="text-[0.6rem] min-[450px]:text-[0.8rem] min-[940px]:text-sm text-slate-50/90 cursor-pointer hover:underline hover:text-slate-50/80 select-none" key={key}>{data["time"]}</span>)
                        }
                    })}
                </div>
            </div>
            {reservation && 
                <>
                    <div onClick={() => setReservation(!reservation)} className="fixed top-0 left-0 w-screen h-screen bg-slate-900/80 z-50"/>
                    <Reservation data={chosenProjection} setReservation={setReservation}/>
                </>
            }
        </>
    )
}