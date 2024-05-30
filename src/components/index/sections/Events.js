export default function Events() {
    return (
        <section id="akce" className='grid grid-cols-1 justify-items-center pt-[4.5rem] sm:pt-10 pb-4 select-text'>
            <h3 className="text-4xl text-center font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text">Nadcházející akce</h3>
            <div className="md:w-[720px] min-[940px]:w-[904px]"> 
                <div className="min-[1100px]:flex justify-center min-[1100px]:mt-16">
                    <div className="flex justify-center mt-16 min-[1100px]:mt-0">
                        <div className="min-[1100px]:border-r border-slate-50/10 min-[1100px]:pr-8">
                            <img src="https://cinematica.8u.cz/img/events/harry_potter-event.jpg" alt="Kouzelný svět Harry Pottera" className={`mx-auto w-[300px] min-[550px]:w-[500px] h-48 object-cover rounded-lg`}/>
                            <div className="w-[300px] min-[550px]:w-[500px]">
                                <p className="mt-4 text-xl text-center text-slate-50/90">Kouzelný svět Harry Pottera</p>
                                <p className="mt-2 text-lg text-center text-slate-50/90">22. červen 2024, 10:00</p>
                                <article className="block text-pretty text-slate-50/90 mt-4 mx-4">
                                    Ponořte se do kouzelnického světa J.K. Rowlingové během našeho speciálního Harry Potter maratonu. Během jednoho dne prožijte dobrodružství Harryho, Hermiony a Rona od začátku až do konce. Přijďte v kostýmech, užijte si tematické občerstvení a nezapomeňte na kouzelnické rekvizity!
                                </article>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="min-[1100px]:pl-8 mt-16 min-[1100px]:mt-0">
                            <img src="https://cinematica.8u.cz/img/events/interstellar-event.jpg" alt="Večer ve vesmíru" className={`mx-auto w-[300px] min-[550px]:w-[500px] h-48 object-cover rounded-lg`}/>
                            <div className="w-[300px] min-[550px]:w-[500px]">
                                <p className="mt-4 text-xl text-center text-slate-50/90">Večer ve vesmíru</p>
                                <p className="mt-2 text-lg text-center text-slate-50/90">28. červen 2024, 18:00</p>
                                <article className="block text-pretty text-slate-50/90 mt-4 mx-4">
                                    Zažijte nezapomenutelný sci-fi večer s promítáním kultovního filmu a bohatým doprovodným programem. Čeká vás přednáška od renomovaného astrofyzika, vystavení filmových rekvizit a vesmírné občerstvení. Připravte se na cestu do nekonečna a dál!
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-16">
                    <div>
                        <img src="https://cinematica.8u.cz/img/events/retro_80s-event.jpg" alt="Návrat do 80. let" className={`mx-auto w-[300px] min-[550px]:w-[500px] h-48 object-cover rounded-lg`}/>
                        <div className="w-[300px] min-[550px]:w-[500px]">
                            <p className="mt-4 text-xl text-center text-slate-50/90">Návrat do 80. let</p>
                            <p className="mt-2 text-lg text-center text-slate-50/90">6. červenec 2024, 18:00</p>
                            <article className="block text-pretty text-slate-50/90 mt-4 mx-4">
                            Přijďte si užít večer plný nostalgie s promítáním oblíbených filmových klasik z 80. let. Oblékněte se do dobových kostýmů, zatancujte si na hity té doby a vychutnejte si popcorn jako za starých časů. Těšit se můžete také na soutěže a kvízy s tématikou 80. let.
                            </article>
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </section>
    )
}