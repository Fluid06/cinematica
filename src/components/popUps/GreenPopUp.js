export default function GreenPopUp(props) {
    return (
        <div className="fixed h-22 w-80 top-4 left-[50%] ml-[-10rem] z-[60] bg-green-600 font-poppins rounded-sm">
            <div className="p-3">
                <h3 className="text-2xl text-gray-200">Úspěch!</h3>
                <p className='text-sm text-gray-200 pt-2'>{ props.msg }</p>       
            </div>
            <div id="bar" className="relative h-2 bg-green-400 animate-timeBar"></div>
        </div>
    )
}
