import React, { Component } from 'react'
import Users from "./tabs/users/Users.js"
import Movies from "./tabs/movies/Movies.js"
import Projections from "./tabs/projections/Projections.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersGear, faFilm, faTicket } from '@fortawesome/free-solid-svg-icons'

class Main extends Component {
    constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);

      this.state = {
        reload: 0,
      }
    }

    handleClick(index) {
      localStorage.setItem("adminTab", index)
      this.setState({
        reload: index
      });
    }
    
    render() {
      if (localStorage.getItem("is_admin") === "1") {
        if (parseInt(localStorage.getItem("adminTab")) === 1 || localStorage.getItem("adminTab") === "null" || localStorage.getItem("adminTab") === null) {
          return (
            <div className="font-poppins text-gray-200 pt-14">
              <div className='fixed left-[50%] ml-[12rem] rotate-90 z-1 2xl:left-0 2xl:ml-0 2xl:rotate-0'>
                <div className="flex justify-center items-center rounded-r-lg bg-slate-800 absolute left-[-6.4rem] top-24 duration-300 w-36 h-12 text-lg shadow-lg shadow-slate-900 cursor-pointer 2xl:hover:left-0"
                  onClick={ () => this.handleClick(1) }
                >
                  <span className="select-none w-[70%] text-center">Users</span>
                  <FontAwesomeIcon className="text-gray-200 w-[30%] rotate-[270deg] 2xl:rotate-0" icon={ faUsersGear }/>
                </div>
                <div className="flex justify-center items-center rounded-r-lg bg-slate-800 absolute left-[-6.4rem] top-40 duration-300 w-36 h-12 text-lg shadow-lg shadow-slate-900 cursor-pointer 2xl:hover:left-0"
                  onClick={ () => this.handleClick(2) }
                >
                  <span className="select-none w-[70%] text-center">Movies</span>
                  <FontAwesomeIcon className="text-gray-200 w-[30%] rotate-[270deg] 2xl:rotate-0" icon={ faFilm }/>
                </div>
                <div className="flex justify-center items-center rounded-r-lg bg-slate-800 absolute left-[-8.4rem] top-56 duration-300 w-44 h-12 text-lg shadow-lg shadow-slate-900 cursor-pointer 2xl:hover:left-0"
                  onClick={ () => this.handleClick(3) }
                >
                  <span className="select-none w-[70%] text-center">Projections</span>
                  <FontAwesomeIcon className="relative left-1 text-gray-200 w-[30%] rotate-[270deg] 2xl:rotate-0" icon={ faTicket }/>
                </div>
              </div>
              <Users/>
            </div>
          )
        } else if (parseInt(localStorage.getItem("adminTab")) === 2) {
          return (
            <div className="w-full font-poppins text-gray-200 pt-14">
              <div className='fixed left-[50%] ml-[12rem] rotate-90 z-1 2xl:left-0 2xl:ml-0 2xl:rotate-0'>
                <div className="flex justify-center items-center rounded-r-lg bg-slate-800 absolute left-[-6.4rem] top-24 duration-300 w-36 h-12 text-lg shadow-lg shadow-slate-900 cursor-pointer 2xl:hover:left-0"
                  onClick={ () => this.handleClick(1) }
                >
                  <span className="select-none w-[70%] text-center">Users</span>
                  <FontAwesomeIcon className="text-gray-200 w-[30%] rotate-[270deg] 2xl:rotate-0" icon={ faUsersGear }/>
                </div>
                <div className="flex justify-center items-center rounded-r-lg bg-slate-800 absolute left-[-6.4rem] top-40 duration-300 w-36 h-12 text-lg shadow-lg shadow-slate-900 cursor-pointer 2xl:hover:left-0"
                  onClick={ () => this.handleClick(2) }
                >
                  <span className="select-none w-[70%] text-center">Movies</span>
                  <FontAwesomeIcon className="text-gray-200 w-[30%] rotate-[270deg] 2xl:rotate-0" icon={ faFilm }/>
                </div>
                <div className="flex justify-center items-center rounded-r-lg bg-slate-800 absolute left-[-8.4rem] top-56 duration-300 w-44 h-12 text-lg shadow-lg shadow-slate-900 cursor-pointer 2xl:hover:left-0"
                  onClick={ () => this.handleClick(3) }
                >
                  <span className="select-none w-[70%] text-center">Projections</span>
                  <FontAwesomeIcon className="relative left-1 text-gray-200 w-[30%] rotate-[270deg] 2xl:rotate-0" icon={ faTicket }/>
                </div>
              </div>
              <Movies/>
            </div>
          )
        } else if (parseInt(localStorage.getItem("adminTab")) === 3) {
          return (
            <div className="font-poppins text-gray-200 pt-14">
              <div className='fixed left-[50%] ml-[12rem] rotate-90 z-1 2xl:left-0 2xl:ml-0 2xl:rotate-0'>
                <div className="flex justify-center items-center rounded-r-lg bg-slate-800 absolute left-[-6.4rem] top-24 duration-300 w-36 h-12 text-lg shadow-lg shadow-slate-900 cursor-pointer 2xl:hover:left-0"
                  onClick={ () => this.handleClick(1) }
                >
                  <span className="select-none w-[70%] text-center">Users</span>
                  <FontAwesomeIcon className="text-gray-200 w-[30%] rotate-[270deg] 2xl:rotate-0" icon={ faUsersGear }/>
                </div>
                <div className="flex justify-center items-center rounded-r-lg bg-slate-800 absolute left-[-6.4rem] top-40 duration-300 w-36 h-12 text-lg shadow-lg shadow-slate-900 cursor-pointer 2xl:hover:left-0"
                  onClick={ () => this.handleClick(2) }
                >
                  <span className="select-none w-[70%] text-center">Movies</span>
                  <FontAwesomeIcon className="text-gray-200 w-[30%] rotate-[270deg] 2xl:rotate-0" icon={ faFilm }/>
                </div>
                <div className="flex justify-center items-center rounded-r-lg bg-slate-800 absolute left-[-8.4rem] top-56 duration-300 w-44 h-12 text-lg shadow-lg shadow-slate-900 cursor-pointer 2xl:hover:left-0"
                  onClick={ () => this.handleClick(3) }
                >
                  <span className="select-none w-[70%] text-center">Projections</span>
                  <FontAwesomeIcon className="relative left-1 text-gray-200 w-[30%] rotate-[270deg] 2xl:rotate-0" icon={ faTicket }/>
                </div>
              </div>
              <Projections/>
            </div>
          )
        }
      } else {
        window.location.replace("/");
      }
  }
}

export default Main;