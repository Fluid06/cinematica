import { useEffect, useState } from "react"
import ProgramSingleLine from "./ProgramSingleLine";

const todayDate = new Date();
const nextDate = new Date(todayDate);
nextDate.setDate(todayDate.getDate() + 2);

const weekDays = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];
const months = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"];

export default function Program({handleLogin, login, setLogin}) {
    const [today, setToday] = useState({"2D" : [], "3D" : []});
    const [tmw, setTmw] = useState({"2D" : [], "3D" : []});
    const [next, setNext] = useState({"2D" : [], "3D" : []});
    const [tab, setTab] = useState(0);
    
    useEffect(() => {
        const getProgram = async () => {
            try {
              const res = await fetch('https://cinematica.8u.cz/php/api/getMovieProjections.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==', {
                method: 'GET',
              });
              const output = await res.json();
    
              setToday(output[0]);
              setTmw(output[1]);
              setNext(output[2]);
            } catch (e) {
              console.error("Something went wrong while fetching 'Program': " + e);
            }
        }
        
        getProgram();
    }, []);

    return (
        <section id="program" className='grid grid-cols-1 pt-[4.5rem] sm:pt-10 pb-4 select-text'>
            <h3 className="h-16 content-center text-4xl text-center font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text my-8">Program</h3>
            <div className="w-full grid grid-cols-1 justify-items-center">
                <div className="w-fit flex justify-center text-center border-y border-slate-50/10 space-x-12 py-2 px-5 select-none">
                    <div className="w-fit">
                        <div onClick={() => setTab(0)} className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text cursor-pointer hover:from-indigo-500/50 hover:to-blue-600/50">
                            Dnes
                        </div>
                    </div>
                    <div className="w-fit">
                        <div onClick={() => setTab(1)} className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text cursor-pointer hover:from-indigo-500/50 hover:to-blue-600/50">
                            Zítra
                        </div>
                    </div>
                    <div onClick={() => setTab(2)} className="w-fit">
                        <div className="text-lg font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text cursor-pointer hover:from-indigo-500/50 hover:to-blue-600/50">
                            {weekDays[nextDate.getDay()]} {nextDate.getDate()}. {months[nextDate.getMonth()]}
                        </div>
                    </div>
                </div>
                {tab === 0 && 
                    (today["2D"].length !== 0 || today["3D"].length !== 0) &&
                    <div className="md:w-[720px] min-[940px]:w-[904px] md:mt-8 md:border-x border-slate-50/10 p-5">
                        <div>
                            {today["2D"].length !== 0 &&
                                <>
                                    <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text px-2">2D</h3>
                                    <div className="p-2 text-slate-50 grid grid-cols-1 justify-items-center">
                                        <div className="grid grid-cols-10 px-8">
                                            <p className="text-xl col-span-3 break-words"></p>
                                            <div className="hidden mx-8 md:grid gap-4 min-[940px]:gap-12 text-[0.8rem] min-[940px]:text-sm grid-cols-11 justify-items-center col-span-7 text-slate-50/30">
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
                                        </div>
                                        {today["2D"].map(function(data) {
                                            return (
                                                <ProgramSingleLine data={data} login={login} setLogin={setLogin} day={0} key={data["movie_info"]["ID"]}/>
                                            )
                                        })}
                                    </div>
                                </>
                            }
                            {today["3D"].length !== 0 &&
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text px-2">3D</h3>
                                    <div className="p-2 text-slate-50">
                                        <div className="grid grid-cols-10 px-8">
                                            <p className="text-xl col-span-3 break-words"></p>
                                            <div className="hidden mx-8 md:grid gap-4 min-[940px]:gap-12 text-[0.8rem] min-[940px]:text-sm  grid-cols-11 justify-items-center col-span-7 text-slate-50/30">
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
                                        </div>
                                        {today["3D"].map(function(data) {
                                            return (
                                                <ProgramSingleLine data={data} login={login} setLogin={setLogin} day={0} key={data["movie_info"]["ID"]}/>
                                            )
                                        })}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
                {tab === 1 && 
                    (tmw["2D"].length !== 0 || tmw["3D"].length !== 0) &&
                    <div className="md:w-[720px] min-[940px]:w-[904px] md:mt-8 md:border-x border-slate-50/10 p-5">
                        <div>
                            {tmw["2D"].length !== 0 &&
                                <>
                                    <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text px-2">2D</h3>
                                    <div className="p-2 text-slate-50">
                                        <div className="grid grid-cols-10 px-8">
                                            <p className="text-xl col-span-3 break-words"></p>
                                            <div className="hidden mx-8 md:grid gap-4 min-[940px]:gap-12 text-[0.8rem] min-[940px]:text-sm grid-cols-11 justify-items-center col-span-7 text-slate-50/30">
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
                                        </div>
                                        {tmw["2D"].map(function(data) {
                                            return (
                                                <ProgramSingleLine data={data} login={login} setLogin={setLogin} day={1} key={data["movie_info"]["ID"]}/>
                                            )
                                        })}
                                    </div>
                                </>
                            }
                            {tmw["3D"].length !== 0 &&
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text px-2">3D</h3>
                                    <div className="p-2 text-slate-50">
                                        <div className="grid grid-cols-10 px-8">
                                            <p className="text-xl col-span-3 break-words"></p>
                                            <div className="hidden mx-8 md:grid gap-4 min-[940px]:gap-12 text-[0.8rem] min-[940px]:text-sm  grid-cols-11 justify-items-center col-span-7 text-slate-50/30">
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
                                        </div>
                                        {tmw["3D"].map(function(data) {
                                            return (
                                                <ProgramSingleLine data={data} login={login} setLogin={setLogin} day={1} key={data["movie_info"]["ID"]}/>
                                            )
                                        })}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
                {tab === 2 && 
                    (next["2D"].length !== 0 || next["3D"].length !== 0) &&
                    <div className="md:w-[720px] min-[940px]:w-[904px] md:mt-8 md:border-x border-slate-50/10 p-5">
                        <div>
                            {next["2D"].length !== 0 &&
                                <>
                                    <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text px-2">2D</h3>
                                    <div className="p-2 text-slate-50">
                                        <div className="grid grid-cols-10 px-8">
                                            <p className="text-xl col-span-3 break-words"></p>
                                            <div className="hidden mx-8 md:grid gap-4 min-[940px]:gap-12 text-[0.8rem] min-[940px]:text-sm grid-cols-11 justify-items-center col-span-7 text-slate-50/30">
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
                                        </div>
                                        {next["2D"].map(function(data) {
                                            return (
                                                <ProgramSingleLine data={data} login={login} setLogin={setLogin} day={2} key={data["movie_info"]["ID"]}/>
                                            )
                                        })}
                                    </div>
                                </>
                            }
                            {next["3D"].length !== 0 &&
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text px-2">3D</h3>
                                    <div className="p-2 text-slate-50">
                                        <div className="grid grid-cols-10 px-8">
                                            <p className="text-xl col-span-3 break-words"></p>
                                            <div className="hidden mx-8 md:grid gap-4 min-[940px]:gap-12 text-[0.8rem] min-[940px]:text-sm  grid-cols-11 justify-items-center col-span-7 text-slate-50/30">
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
                                        </div>
                                        {next["3D"].map(function(data) {
                                            return (
                                                <ProgramSingleLine data={data} login={login} setLogin={setLogin} day={2} key={data["movie_info"]["ID"]}/>
                                            )
                                        })}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}