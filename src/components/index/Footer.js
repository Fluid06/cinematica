import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    const handleRedirect = (target) => {
        window.scroll({
            top: (target === "top") ? 0 : document.getElementById(target).getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
        });
    }

    return (
        <footer className="flex justify-center bg-slate-800/30 mt-8 pb-2">
            <div className="mt-8 w-[80%] md:w-[540px] min-[940px]:w-[678px] space-y-8">
                <div className="w-full border-x-4 border-slate-500/50 text-blue-300">
                    <div className="py-4 px-14">
                        <p className="text-slate-50 font-semibold tracking-wider block pb-5">Navigace</p>
                        <Link to="/" onClick={() => handleRedirect("top")} className="block hover:underline">Domů</Link>
                        <Link to="/#program" onClick={() => handleRedirect("program")} className="block hover:underline">Program</Link>
                        <Link to="/#filmy" onClick={() => handleRedirect("filmy")} className="block hover:underline">Filmy</Link>
                        <Link to="/#akce" onClick={() => handleRedirect("akce")} className="block hover:underline">Akce</Link>
                    </div>
                </div>
                <div className="w-full border-x-4 border-slate-500/50 text-slate-50">
                    <div className="py-4 px-14">
                        <p className="font-semibold tracking-wider block pb-5">Kontakt</p>
                        <div>
                            <span>E-mail: </span><a href="mailto:cinematica@cinematica.cz" className="w-fit">cinematica@cinematica.cz</a>
                        </div>
                        <div>
                            <span>Telefon: </span><a href="tel:666217420" className="w-fit">+420 666 217 420</a>
                        </div>
                    </div>
                </div>
                <div className="w-full border-x-4 border-slate-500/50 text-slate-50">
                    <div className="py-4 px-14">
                        <p className="font-semibold tracking-wider block pb-5">Adresa</p>
                        <p>Kratochvílova 1490/7, 70200 Ostrava - Moravská Ostrava, Česko</p>
                        <div className="w-full pt-3">
                            <iframe title="googlemap" className="w-[180px] h-[150px] md:w-[360px] md:h-[300px]" width="360" height="300" src="https://maps.google.com/maps?width=360&amp;height=300&amp;hl=en&amp;q=Kratochv%C3%ADlova%201490/,%2070200%20Ostrava%20-%20Moravsk%C3%A1%20Ostrava,%20%C4%8Cesko+(Cinematica)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center text-slate-50/90">
                    <span className="w-fit pr-5 text-center border-r border-slate-50/50">Cinematica © 2024</span>
                    <span className="space-x-6 w-fit pl-5 text-center">
                        <a href="https://www.spseiostrava.cz/cs/"><FontAwesomeIcon icon={faFacebookF}/></a>
                        <a href="https://www.spseiostrava.cz/cs/"><FontAwesomeIcon icon={faInstagram}/></a>
                        <a href="https://www.spseiostrava.cz/cs/"><FontAwesomeIcon icon={faXTwitter}/></a>
                    </span>
                </div>
            </div>
        </footer>
    )
}