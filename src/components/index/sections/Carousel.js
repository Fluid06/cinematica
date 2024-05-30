import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faClock, faCircle } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const slides = document.getElementsByClassName('slide');
const dots = document.getElementsByClassName('dot');

let interupted = false;

export default function Carousel({handleInfo}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [movieData, setMovieData] = useState([]);
    const [control, setControl] = useState(0);
    const [loading, setLoading] = useState(true);

    let render = 0;

    useEffect(() => {
      const getMovies = async () => {
        try {
          const res = await fetch('https://cinematica.8u.cz/php/api/getCarouselMovies.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==', {
            method: 'GET',
          });
          const output = await res.json();

          setMovieData(output);
          setLoading(false);
        } catch (e) {
          console.error("Something went wrong while fetching 'Movies': " + e);
        }
      }

      getMovies();
    }, []);

    setTimeout(() => {
      if (!interupted) {
        if (control === 5) {
          setControl(1);
          handleClick(0);
        } else {
          setControl(control + 1);
          handleClick(control);
        }
      }
    }, 6000)

    const handleClick = (reqIndex) => {
        for (let i = 0; i < slides.length; i++) {
            if (i === reqIndex) {
                slides[i].className = slides[i].className.replace('hidden', 'block');
                dots[i].className = dots[i].className.replace('h-3 w-3 2xl:h-4 2xl:w-4 rounded-full bg-gray-200', 'h-3 w-5 2xl:h-4 2xl:w-6 rounded-lg bg-red-600');
            } else {
                slides[i].className = slides[i].className.replace('block', 'hidden');
                dots[i].className = dots[i].className.replace('h-3 w-5 2xl:h-4 2xl:w-6 rounded-lg bg-red-600', 'h-3 w-3 2xl:h-4 2xl:w-4 rounded-full bg-gray-200');
            }
        }
        
        setCurrentIndex(reqIndex);
    }
    
    const arrowClick = (index) => {
        if (currentIndex + index > slides.length-1) {
          handleClick(0);
        } else if (currentIndex + index < 0) {
          handleClick(slides.length-1);
        } else {
          handleClick(currentIndex + index);
        }

        interupted = true;
    }

    return (
        <section id="carousel" className='hidden sm:grid grid-cols-1 justify-items-center pt-[3.5rem] 2xl:pt-20 select-text'>
            <div className="w-full 2xl:w-[75%] bg-slate-900 2xl:rounded-xl">
                {loading 
                ?
                <div className='slide block'>
                    <div className={`h-[350px] 2xl:h-[700px] rounded-xl bg-slate-800`}> 
                      <div className='absolute h-[350px] 2xl:h-[700px] w-full 2xl:w-[75%] object-cover object-center 2xl:rounded-xl'/>
                      <div className='relative h-[350px] 2xl:h-[700px] flex justify-center items-center z-10'>
                        <Link to="#carousel" className="flex justify-center items-center w-64 2xl:w-96 h-full text-5xl text-gray-300 opacity-50 transition-all hover:ease-in hover:opacity-80" role="button">
                            <span aria-hidden="true">
                                <FontAwesomeIcon className="size-8 2xl:size-12" icon={ faChevronLeft }/>
                            </span>
                        </Link>
                        <div className="flex flex-col justify-center w-[96rem] text-gray-200 mx-10 animate-fadeIn">
                            <div className="flex justify-center gap-14 2xl:gap-20 mb-3">
                              <div className={`bg-slate-800 w-[12rem] min-w-[12rem] h-[18rem] rounded-tl-[1rem] rounded-br-[1rem] 2xl:w-[24rem] 2xl:min-w-[24rem] 2xl:h-[36rem] 2xl:rounded-tl-[2rem] 2xl:rounded-br-[2rem] shadow-2xl`}/>
                              <div className="flex flex-col justify-center 2xl:justify-start font-poppins 2xl:py-20">
                                  <h3 className="text-2xl 2xl:text-5xl font-bold overflow-hidden">&nbsp;</h3>
                                  <div className="text-sm 2xl:text-lg py-5 2xl:py-10">
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                  </div>
                              </div>
                            </div>
                        </div>
                        <Link to="#carousel" className="flex justify-center items-center w-64 2xl:w-96 h-full text-5xl text-gray-300 opacity-50 transition-all hover:ease-in hover:opacity-80" role="button">
                            <span aria-hidden="true">
                              <FontAwesomeIcon className="size-8 2xl:size-12" icon={ faChevronRight }/>
                            </span>
                        </Link>
                      </div>
                    </div>
                </div>
                : movieData.map(function(data) {
                    if (render++ === 0) {
                      return (
                        <div className='slide block' key={data['ID']}>
                            <div className={`h-[350px] 2xl:h-[700px] rounded-xl bg-slate-800`}> 
                              <img src={data["images"]["banner"]} alt={data["name"]} className='contrast-[30%] absolute h-[350px] 2xl:h-[700px] w-full 2xl:w-[75%] object-cover object-center 2xl:rounded-xl'/>
                              <div className='relative h-[350px] 2xl:h-[700px] flex justify-center items-center z-10'>
                                <Link to="#carousel" onClick={ () => arrowClick(-1) } className="flex justify-center items-center w-64 2xl:w-96 h-full text-5xl text-gray-300 opacity-50 transition-all hover:ease-in hover:opacity-80" role="button">
                                    <span aria-hidden="true">
                                        <FontAwesomeIcon className="size-8 2xl:size-12" icon={ faChevronLeft }/>
                                    </span>
                                </Link>
                                <div className="flex flex-col justify-center w-[96rem] text-gray-200 mx-10 animate-fadeIn">
                                    <div className="flex justify-center gap-14 2xl:gap-20 mb-3">
                                      <img src={data["images"]["poster"]} className={`w-[12rem] min-w-[12rem] h-[18rem] rounded-tl-[1rem] rounded-br-[1rem] 2xl:w-[24rem] 2xl:min-w-[24rem] 2xl:h-[36rem] 2xl:rounded-tl-[2rem] 2xl:rounded-br-[2rem] shadow-2xl`} alt={data["name"]}/>
                                      <div className="flex flex-col justify-center 2xl:justify-start font-poppins 2xl:py-20">
                                          <h3 className="text-2xl 2xl:text-5xl font-bold overflow-hidden">{data['name']}</h3>
                                          <div className="text-sm 2xl:text-lg py-5 2xl:py-10">
                                            <span aria-hidden="true"><FontAwesomeIcon icon={ faClock } className="text-[1rem]"/></span>  {data['length']} min 
                                            <span aria-hidden="true"><FontAwesomeIcon icon={ faCircle } className="text-[0.5rem] px-3 pb-1"/></span> {data['genres'].join(" / ")}
                                            <span aria-hidden="true"><FontAwesomeIcon icon={ faCircle } className="text-[0.5rem] px-3 pb-1"/></span> {data['release_date'].split("-")[0]}
                                          </div>
                                          <button onClick={() => handleInfo(data, 1)} type="button" className="w-36 py-2 px-4 2xl:py-2.5 2xl:px-5 mt-2 2xl:mt-4 text-sm 2xl:text-md font-bold text-gray-900 focus:outline-none bg-white rounded-full hover:bg-gray-100 hover:text-blue-700 focus:ring-2 focus:ring-blue-700">Zobrazit více</button>
                                      </div>
                                    </div>
                                </div>
                                <Link to="#carousel" onClick={ () => arrowClick(1) } className="flex justify-center items-center w-64 2xl:w-96 h-full text-5xl text-gray-300 opacity-50 transition-all hover:ease-in hover:opacity-80" role="button">
                                    <span aria-hidden="true">
                                      <FontAwesomeIcon className="size-8 2xl:size-12" icon={ faChevronRight }/>
                                    </span>
                                </Link>
                              </div>
                            </div>
                        </div>
                      )
                    } else {
                      return (
                        <div className='slide hidden' key={data['ID']}>
                            <div className={`h-[350px] 2xl:h-[700px] rounded-xl bg-slate-800`}> 
                              <img src={data["images"]["banner"]} alt={data["name"]} className='contrast-[30%] absolute h-[350px] 2xl:h-[700px] w-full 2xl:w-[75%] object-cover object-center 2xl:rounded-xl'/>
                              <div className='relative h-[350px] 2xl:h-[700px] flex justify-center items-center z-10'>
                                <Link to="#carousel" onClick={ () => arrowClick(-1) } className="flex justify-center items-center w-64 2xl:w-96 h-full text-5xl text-gray-300 opacity-50 transition-all hover:ease-in hover:opacity-80" role="button">
                                    <span aria-hidden="true">
                                        <FontAwesomeIcon className="size-8 2xl:size-12" icon={ faChevronLeft }/>
                                    </span>
                                </Link>
                                <div className="flex flex-col justify-center w-[96rem] text-gray-200 mx-10 animate-fadeIn">
                                    <div className="flex justify-center gap-14 2xl:gap-20 mb-3">
                                      <img src={data["images"]["poster"]} className={`w-[12rem] min-w-[12rem] h-[18rem] rounded-tl-[1rem] rounded-br-[1rem] 2xl:w-[24rem] 2xl:min-w-[24rem] 2xl:h-[36rem] 2xl:rounded-tl-[2rem] 2xl:rounded-br-[2rem] shadow-2xl`} alt={data["name"]}/>
                                      <div className="flex flex-col justify-center 2xl:justify-start font-poppins 2xl:py-20">
                                          <h3 className="max-w-96 2xl:max-w-[32rem] text-2xl 2xl:text-5xl font-bold">{data['name']}</h3>
                                          <div className="text-sm 2xl:text-lg py-5 2xl:py-10">
                                            <span aria-hidden="true"><FontAwesomeIcon icon={ faClock } className="text-[1rem]"/></span>  {data['length']} min 
                                            <span aria-hidden="true"><FontAwesomeIcon icon={ faCircle } className="text-[0.5rem] px-3 pb-1"/></span> {data['genres'].join(" / ")}
                                            <span aria-hidden="true"><FontAwesomeIcon icon={ faCircle } className="text-[0.5rem] px-3 pb-1"/></span> {data['release_date'].split("-")[0]}
                                          </div>
                                          <button onClick={() => handleInfo(data, 1)} type="button" className="w-36 py-2 px-4 2xl:py-2.5 2xl:px-5 mt-2 2xl:mt-4 text-sm 2xl:text-md font-bold text-gray-900 focus:outline-none bg-white rounded-full hover:bg-gray-100 hover:text-blue-700 focus:ring-2 focus:ring-blue-700">Zobrazit více</button>
                                      </div>
                                    </div>
                                </div>
                                <Link to="#carousel" onClick={ () => arrowClick(1) } className="flex justify-center items-center w-64 2xl:w-96 h-full text-5xl text-gray-300 opacity-50 transition-all hover:ease-in hover:opacity-80" role="button">
                                    <span aria-hidden="true">
                                      <FontAwesomeIcon className="size-8 2xl:size-12" icon={ faChevronRight }/>
                                    </span>
                                </Link>
                              </div>
                            </div>
                        </div>
                      )
                }})}
            </div>
            <ol className="relative z-10 bottom-6 2xl:bottom-8 flex justify-center gap-4 2xl:gap-5">
                <li onClick={ () => handleClick(0) } className="dot h-3 w-5 2xl:h-4 2xl:w-6 rounded-lg bg-red-600 transition-all ease-out duration-200 hover:cursor-pointer hover:ease-in hover:opacity-80"></li>
                <li onClick={ () => handleClick(1) } className="dot h-3 w-3 2xl:h-4 2xl:w-4 rounded-full bg-gray-200 transition-all ease-out duration-200 hover:cursor-pointer hover:ease-in hover:opacity-80"></li>
                <li onClick={ () => handleClick(2) } className="dot h-3 w-3 2xl:h-4 2xl:w-4 rounded-full bg-gray-200 transition-all ease-out duration-200 hover:cursor-pointer hover:ease-in hover:opacity-80"></li>
                <li onClick={ () => handleClick(3) } className="dot h-3 w-3 2xl:h-4 2xl:w-4 rounded-full bg-gray-200 transition-all ease-out duration-200 hover:cursor-pointer hover:ease-in hover:opacity-80"></li>
                <li onClick={ () => handleClick(4) } className="dot h-3 w-3 2xl:h-4 2xl:w-4 rounded-full bg-gray-200 transition-all ease-out duration-200 hover:cursor-pointer hover:ease-in hover:opacity-80"></li>
            </ol>
        </section>
    )
}