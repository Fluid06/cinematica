import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery'

export default function DeleteButton(props) {
    const handleClick = (e) => {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "https://cinematica.8u.cz/php/handlers/dbDeleteMovie.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==",
            data: { id: props.id },

            error(data) {
                console.error(data);
            }
        });
    }

    return (
        <span onClick={handleClick} className='flex justify-center items-center rounded-full border-gray-800 bg-red-400 text-gray-200 py-2 hover:opacity-50 hover:cursor-pointer'><FontAwesomeIcon icon={faTrash}/></span>
    )
}