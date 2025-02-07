/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../helper';
import { RootState } from '../../../redux/store';

const AddNewRepo = () => {
    //STATES FOR FORM DATA
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        visibility: 'public',
        autoInit: false,
        allowForking: true,
    });

    //STATE FOR ERROR HANDLING
    const [errors, setErrors] = useState({
        name: '',
        description: '',
    });

    //STATE FOR NOTIFICATION
    const [notification, setNotification] = useState({
        message: '',
        type: '',
    });

    const isDarkMode = useSelector((state: RootState) => state.isDarkModeOn);

    //HANDLING FORM INPUT CHANGES
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (checked as boolean) : value,
        });
    };

    //VALIDATING FORM DATA
    const validateForm = () => {
        const formErrors = { name: '', description: '' };
        let isValid = true;

        if (!formData.name) {
            formErrors.name = 'Repository name is required';
            isValid = false;
        }

        if (!formData.description) {
            formErrors.description = 'Description is required';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    //HANDLING FORM SUBMISSION
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post(`${BASE_URL}/create-repo`, formData, {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                });
                setNotification({
                    message: 'Repository created successfully!',
                    type: 'success',
                });
                setFormData({
                    name: '',
                    description: '',
                    visibility: 'public',
                    autoInit: false,
                    allowForking: true,
                });
            } catch (error: any) {
                setNotification({
                    message: 'Error creating repository!',
                    type: 'error',
                });
            }
            setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
        }
    };

    return (
        <div className={`${isDarkMode ? 'dark' : ''}`}>
            <div
                className={`min-h-screen p-4 ${
                    isDarkMode
                        ? 'bg-[#171717] text-[#ECECEC]'
                        : 'bg-gray-100 text-black'
                }`}
            >
                <div className='mx-auto bg-white dark:bg-[#212121] p-8 rounded-2xl shadow-2xl max-w-3xl'>
                    <h2 className='text-3xl font-semibold mb-8'>
                        Create a New Repository
                    </h2>

                    {/* PROVIDES FEEDBACK TO THE USER  */}
                    {notification.message && (
                        <div
                            className={`${
                                notification.type === 'success'
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                            } text-white p-4 rounded-lg mb-6 shadow-md transition-all duration-300`}
                        >
                            {notification.type === 'success' ? (
                                <i className='fa fa-check-circle mr-2'></i>
                            ) : (
                                <i className='fa fa-exclamation-circle mr-2'></i>
                            )}
                            {notification.message}
                        </div>
                    )}

                    {/* FORM FOR CREATING A NEW REPOSITORY  */}
                    <form onSubmit={handleSubmit}>
                        <div className='mb-6'>
                            <label
                                htmlFor='name'
                                className='block text-lg font-medium mb-2'
                            >
                                Repository Name
                            </label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                className='w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-[#2F2F2F] dark:border-[#444444] dark:text-[#ECECEC] focus:outline-none'
                                placeholder='Enter repository name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            {errors.name && (
                                <p className='text-red-500 text-sm mt-2'>
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className='mb-6'>
                            <label
                                htmlFor='description'
                                className='block text-lg font-medium mb-2'
                            >
                                Description
                            </label>
                            <textarea
                                id='description'
                                name='description'
                                className='w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-[#2F2F2F] dark:border-[#444444] dark:text-[#ECECEC] focus:outline-none'
                                placeholder='Enter description'
                                value={formData.description}
                                onChange={handleChange}
                            />
                            {errors.description && (
                                <p className='text-red-500 text-sm mt-2'>
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className='mb-6'>
                            <label
                                htmlFor='visibility'
                                className='block text-lg font-medium mb-2'
                            >
                                Visibility
                            </label>
                            <select
                                id='visibility'
                                name='visibility'
                                className='w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-[#2F2F2F] dark:border-[#444444] dark:text-[#ECECEC] focus:outline-none'
                                value={formData.visibility}
                                onChange={handleChange}
                            >
                                <option value='public'>Public</option>
                                <option value='private'>Private</option>
                            </select>
                        </div>

                        <div className='mb-6 flex items-center'>
                            <input
                                type='checkbox'
                                id='autoInit'
                                name='autoInit'
                                className='mr-2 h-5 w-5 dark:bg-[#444444] dark:border-[#444444] dark:text-[#ECECEC] focus:ring-2 focus:ring-gray-500 dark:focus:ring-[#555555] checked:bg-[#4F4F4F] checked:border-[#ECECEC] checked:ring-[#ECECEC]'
                                checked={formData.autoInit}
                                onChange={handleChange}
                            />
                            <label htmlFor='autoInit' className='text-lg'>
                                Initialize with README
                            </label>
                        </div>

                        <div className='mb-6 flex items-center'>
                            <input
                                type='checkbox'
                                id='allowForking'
                                name='allowForking'
                                className='mr-2 h-5 w-5 dark:bg-[#444444] dark:border-[#444444] dark:text-[#ECECEC] focus:ring-2 focus:ring-gray-500 dark:focus:ring-[#555555] checked:bg-[#4F4F4F] checked:border-[#ECECEC] checked:ring-[#ECECEC]'
                                checked={formData.allowForking}
                                onChange={handleChange}
                            />
                            <label htmlFor='allowForking' className='text-lg'>
                                Allow Forking
                            </label>
                        </div>

                        <div className='mt-8'>
                            <button
                                type='submit'
                                className='w-full py-3 bg-blue-600 dark:bg-[#383838] dark:hover:bg-[#171717] text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md'
                            >
                                Create Repository
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewRepo;
