import { useEffect, useReducer, useState } from "react"
import DeleteButton from "./DeleteUserButton";
import UserForm from "./AddUserForm";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [reload, forceReload] = useReducer(x => x + 1, 0);
    
    useEffect(() => {
        const getUsers = async () => {
            try {
              const res = await fetch('https://cinematica.8u.cz/php/api/getUsers.php?key=SG91c2thc2VzYWxhbWVtamVkb2JyYTEyMw==', {
                method: 'GET',
              });
              const output = await res.json();
              
              setUsers(output);

            } catch (e) {
              console.error("Something went wrong while fetching 'Users': " + e);
            }
        }
    
        getUsers();
    }, [reload]);

    return (
        <div className='h-fit w-full text-slate-200'>
            <div className='lg:flex lg:justify-center 2xl:gap-[5%]'>
                <UserForm forceReload={forceReload}/>
            </div>
            <div className='flex justify-center pb-5'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:sm:grid-cols-3 2xl:grid-cols-4 min-[2000px]:grid-cols-5 min-[2500px]:grid-cols-6 justify-items-center w-[90%] xl:w-[80%] h-fit text-gray-50 mt-32 gap-5'>
                    {users.map(function(data) {
                        return (
                            <div className="w-64 h-fit bg-slate-800 border-[1px] border-slate-50/10 p-2 space-y-2 text-wrap break-words" key={data['ID']}>
                                <p className="text-lg font-bold overflow-hidden text-wrap">{data['name'] + " " + data['surname']}</p>
                                <p>Dat. nar.: {data['birthdate']}</p>
                                <p>E-mail: {data['email']}</p>
                                <p>Tel.: {data['phone_number']}</p>
                                <div className="flex gap-3 pt-2">
                                    <span onClick={ () => setTimeout(() => {forceReload()}, 100) } className="flex-grow">
                                        <DeleteButton id={data['ID'].toString()}/>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}