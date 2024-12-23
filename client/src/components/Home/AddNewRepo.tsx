/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import axios from 'axios';

const AddNewRepo = () => {
    const isDarkMode = useSelector((state: RootState) => state.isDarkModeOn); // Assuming you store dark mode in redux

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        visibility: 'public',
        autoInit: false,
        allowForking: true,
    });

    const [errors, setErrors] = useState({
        name: '',
        description: '',
    });

    const [notification, setNotification] = useState({
        message: '',
        type: '', // 'success' or 'error'
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (checked as boolean) : value,
        });
    };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(
                    'http://localhost:5000/create-repo',
                    formData,
                    {
                        headers: {
                            Authorization: `${localStorage.getItem(
                                'accessToken'
                            )}`,
                        },
                    }
                );
                setNotification({
                    message: 'Repository created successfully!',
                    type: 'success',
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

                    {/* Notification */}
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

                    <form onSubmit={handleSubmit}>
                        {/* Repository Name */}
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

                        {/* Description */}
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

                        {/* Visibility */}
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

                        {/* Initialize with README */}
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

                        {/* Allow Forking */}
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

                        {/* Submit Button */}
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
