import axios from 'axios';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const AICodeReview = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isReviewing, setIsReviewing] = useState(false);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setInput(event.target.value);
    };

    const handleGetReview = async () => {
        setIsLoading(true);
        setIsReviewing(true);
        // Simulate an API call to get the review

        const res = await axios.post('http://localhost:5000/codeReview', {
            codeSnippet: input,
        });

        console.log(res.data);
        setResponse(res.data.review);
        setIsLoading(false);
    };

    const handleReviewAnother = () => {
        setIsReviewing(false);
        setInput('');
        setResponse('');
    };

    return (
        <div className='flex flex-col justify-between min-h-screen bg-[#FAFAFA] dark:bg-[#171717] text-gray-800 dark:text-[#ECECEC] p-4'>
            {/* Chat Display */}
            <div className='flex-grow overflow-auto mb-4'>
                <div className='p-4 bg-white dark:bg-[#212121] rounded-lg shadow relative'>
                    {isLoading ? (
                        <div className='animate-pulse'>
                            <div className='h-4 bg-gray-200 dark:bg-[#383838] rounded w-3/4 mb-2'></div>
                            <div className='h-4 bg-gray-200 dark:bg-[#383838] rounded w-5/6'></div>
                        </div>
                    ) : response ? (
                        // <p className='whitespace-pre-wrap'>{response}</p>
                        <ReactMarkdown className='prose dark:prose-dark'>
                            {response}
                        </ReactMarkdown>
                    ) : (
                        <p className='text-gray-500 dark:text-white'>
                            Enter your code to get a review.
                        </p>
                    )}
                </div>
            </div>

            {/* Input Section */}
            {!isReviewing ? (
                <div className='flex items-end gap-2'>
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        placeholder='Paste your code here...'
                        rows={1}
                        className='flex-grow resize-none p-3 rounded-lg shadow-md border border-gray-300 dark:border-[#2F2F2F] bg-white dark:bg-[#383838] text-gray-800 dark:text-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-[#1570EF] dark:focus:ring-[#383838] scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-[#585858] scrollbar-track-gray-200 dark:scrollbar-track-[#171717]'
                        style={{
                            minHeight: '40px',
                            maxHeight: '200px',
                            overflowY: 'auto',
                        }}
                    ></textarea>
                    <button
                        onClick={handleGetReview}
                        className='px-4 py-2 bg-[#1570EF] dark:bg-[#383838] text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:dark:bg-[#585858] transition-all'
                        style={{ height: '50px' }}
                    >
                        Get Review
                    </button>
                </div>
            ) : (
                <div className='flex justify-center'>
                    <button
                        onClick={handleReviewAnother}
                        className='w-full max-w-xs px-4 py-2 bg-[#1570EF] dark:bg-[#383838] text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:dark:bg-[#585858] transition-all'
                        style={{ height: '50px' }}
                    >
                        Review Another Code
                    </button>
                </div>
            )}
        </div>
    );
};

export default AICodeReview;
