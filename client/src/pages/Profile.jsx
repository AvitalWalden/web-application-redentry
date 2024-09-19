import React, { useContext, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { UserContext } from './UserContext';
import axios from 'axios';

function Profile() {
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(true);  // ניהול מצב הפתיחה של המודל
    const { user } = useContext(UserContext);

    const [values, setValues] = useState({
        user_password: user.user_password,
        user_email: user.user_email,
        user_name: user.user_name
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/users/updateUser/${user._id}`, {
                name: values.user_name,
                email: values.user_email,
                password: values.user_password
            });
            console.log('User updated:', response.data);
        } catch (error) {
            console.log(error.response.data[0]?.message || "An error occurred");
            setError(error.response.data[0]?.message || "An error occurred");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/users/deleteUser/${user._id}`);
            console.log('User deleted:', response.data);
        } catch (error) {
            console.log(error.response.data[0]?.message || "An error occurred");
            setError(error.response.data[0]?.message || "An error occurred");
        }
    };

    return (
        <>
            {isModalOpen && (<div id="authentication-modal" tabindex="-1" aria-hidden="false" class=" overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Update profile
                            </h3>
                            <button type="button" onClick={() => setIsModalOpen(false)} class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close</span>
                            </button>
                        </div>
                        <div class="p-4 md:p-5">
                            <form class="space-y-4" action="#">
                                <div>
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                    <input name="user_name"
                                        value={values.user_name}
                                        onChange={handleChange}
                                        id="user_name" placeholder="john doe" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input name="user_email"
                                        value={values.user_email}
                                        onChange={handleChange}
                                        id="user_email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                    <input type="password"
                                    name="user_password"
                                        value={values.user_password}
                                        onChange={handleChange}
                                        id="user_password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>

                                <button type="button" onClick={handleUpdate} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                                <button type="button" onClick={handleDelete} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>)}
        </>
    )
}

export default Profile