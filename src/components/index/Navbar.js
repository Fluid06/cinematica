import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./account/Login.js";

export default function Navbar({handleLogin, login, setLogin}) {
    const [collapsed, setCollapsed] = useState(false);

    const handleRedirect = (target) => {
        setCollapsed(false);

        window.scroll({
            top: (target === "top") ? 0 : document.getElementById(target).getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
        });
    }

    return (
        <nav className="fixed flex justify-between md:justify-center sm:gap-12 lg:gap-36 items-center text-gray-200 font-poppins w-full backdrop-blur-lg border-b border-slate-50/[0.1] bg-slate-900/75 z-40">
            <Link onClick={() => handleRedirect("carousel")} to="/" className="select-none h-14 font-afacad text-4xl flex items-center font-bold ml-4 transition-all duration-100 ease-in-out">
                <div className="flex gap-2 pr-3">
                    <span className="w-2 h-5 rotate-[40deg] bg-indigo-700"></span>
                    <span className="w-2 h-5 rotate-[40deg] bg-blue-700"></span>
                    <span className="w-2 h-5 rotate-[40deg] bg-blue-900"></span>
                </div>
                <span className="font-bold">Cinematica</span>
            </Link>
            <div className="hidden md:flex gap-20 lg:gap-36 items-center">
                <div className="flex gap-5 text-lg font-semibold tracking-wider">
                    <span>
                        <Link onClick={() => handleRedirect("carousel")} to="/#carousel" className="group relative bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-transparent bg-clip-text tranistion-[background-image] duration-100 ease-in-out">Domů
                            <span className="absolute inset-x-0 -bottom-1 h-[3px] bg-gradient-to-r from-blue-500/0 via-blue-700/70 to-indigo-700/0 opacity-0 transition group-hover:opacity-100"></span>
                        </Link>
                    </span>
                    <span>
                        <Link onClick={() => handleRedirect("program")} to="/#program" className="group relative bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 hover:text-transparent bg-clip-text tranistion-[background-image] duration-100 ease-in-out">Program
                            <span className="absolute inset-x-0 -bottom-1 h-[3px] bg-gradient-to-r from-blue-500/0 via-blue-700/70 to-indigo-700/0 opacity-0 transition group-hover:opacity-100"></span>
                        </Link>
                    </span>
                    <span>
                        <Link onClick={() => handleRedirect("filmy")} to="/#filmy" className="group relative bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-transparent bg-clip-text tranistion-[background-image] duration-100 ease-in-out">Filmy
                            <span className="absolute inset-x-0 -bottom-1 h-[3px] bg-gradient-to-r from-blue-500/0 via-blue-700/70 to-indigo-700/0 opacity-0 transition group-hover:opacity-100"></span>
                        </Link>
                    </span>
                    <span>
                        <Link onClick={() => handleRedirect("akce")} to="/#akce" className="group relative bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 hover:text-transparent bg-clip-text tranistion-[background-image] duration-100 ease-in-out">Akce
                            <span className="absolute inset-x-0 -bottom-1 h-[3px] bg-gradient-to-r from-blue-500/0 via-blue-700/70 to-indigo-700/0 opacity-0 transition group-hover:opacity-100"></span>
                        </Link>
                    </span>
                    {(localStorage.getItem("is_admin") !== "0" && localStorage.getItem("is_admin") !== "null" && localStorage.getItem("is_admin") !== null) &&
                        <span>
                            <Link to="/admin" className="group relative bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 hover:text-transparent bg-clip-text tranistion-[background-image] duration-100 ease-in-out">Admin
                                <span className="absolute inset-x-0 -bottom-1 h-[3px] bg-gradient-to-r from-blue-500/0 via-blue-700/70 to-indigo-700/0 opacity-0 transition group-hover:opacity-100"></span>
                            </Link>
                        </span>
                    } 
                </div>
            </div>
            <div className="flex w-fit mr-1">
                <span onClick={() => handleLogin()} className="flex justify-center items-center px-1 cursor-pointer"><FontAwesomeIcon className="size-7 hover:text-indigo-500" icon={faCircleUser}/></span>
                <button onClick={() => setCollapsed(!collapsed)} type="button" className="inline-flex md:hidden items-center px-[12px] size-12 justify-center text-sm text-slate-200 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-slate-400" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Otevřít menu</span>
                    <svg className="size-6" aria-hidden="true" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
            
            {collapsed && 
                <div className="md:hidden flex fixed translate-y-[50%] mt-14 h-screen w-screen backdrop-blur-lg bg-slate-900/90 animate-navFade">
                   <div className="w-full text-center space-y-20 pt-14">
                       <div>
                           <Link to="/#carousel" onClick={() => handleRedirect("top")} className="w-full inline-block group relative text-3xl bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-transparent bg-clip-text tranistion-[background-image] duration-100 ease-in-out">Domů
                               <span className="absolute inset-x-32 -bottom-1 h-[3px] bg-gradient-to-r from-blue-500/0 via-blue-700/70 to-indigo-700/0 opacity-0 transition group-hover:opacity-100"></span>
                           </Link>  
                       </div>
                       <div>
                           <Link to="/#program" onClick={() => handleRedirect("program")} className="w-full inline-block group relative text-3xl bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 hover:text-transparent bg-clip-text tranistion-[background-image] duration-100 ease-in-out">Program
                               <span className="absolute inset-x-32 -bottom-1 h-[3px] bg-gradient-to-r from-blue-500/0 via-blue-700/70 to-indigo-700/0 opacity-0 transition group-hover:opacity-100"></span>
                           </Link>  
                       </div>
                       <div>
                           <Link to="/#filmy" onClick={() => handleRedirect("filmy")} className="w-full inline-block group relative text-3xl bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-transparent bg-clip-text tranistion-[background-image] duration-100 ease-in-out">Filmy
                               <span className="absolute inset-x-32 -bottom-1 h-[3px] bg-gradient-to-r from-blue-500/0 via-blue-700/70 to-indigo-700/0 opacity-0 transition group-hover:opacity-100"></span>
                           </Link>  
                       </div>
                       <div>
                           <Link to="/#akce" onClick={() => handleRedirect("akce")} className="w-full inline-block group relative text-3xl bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 hover:text-transparent bg-clip-text tranistion-[background-image] duration-100 ease-in-out">Akce
                               <span className="absolute inset-x-32 -bottom-1 h-[3px] bg-gradient-to-r from-blue-500/0 via-blue-700/70 to-indigo-700/0 opacity-0 transition group-hover:opacity-100"></span>
                           </Link>
                       </div>
                       {(localStorage.getItem("is_admin") !== "0" && localStorage.getItem("is_admin") !== "null" && localStorage.getItem("is_admin") !== null) &&
                            <div>
                                <Link to="/admin" onClick={() => setCollapsed(!collapsed)} className="w-full inline-block group relative text-3xl bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 hover:text-transparent bg-clip-text tranistion-[background-image] duration-100 ease-in-out">Admin
                                    <span className="absolute inset-x-32 -bottom-1 h-[3px] bg-gradient-to-r from-blue-500/0 via-blue-700/70 to-indigo-700/0 opacity-0 transition group-hover:opacity-100"></span>
                                </Link>
                            </div>
                       }
                   </div>
                </div>
            }
            {login && 
                <>
                    <div onClick={() => handleLogin()} className="absolute top-0 left-0 w-screen h-screen"/>
                    <Login setLogin={setLogin} setCollapsed={setCollapsed}/>
                </>
            }
        </nav>
    )
}