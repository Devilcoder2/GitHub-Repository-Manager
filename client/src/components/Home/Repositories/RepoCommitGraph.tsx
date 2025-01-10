/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../helper';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface RepoCommitGraphProps {
    owner: string;
    name: string;
}

interface CommitData {
    date: string;
    count: number;
}

const RepoCommitGraph: React.FC<RepoCommitGraphProps> = ({ owner, name }) => {
    const [commitData, setCommitData] = useState<CommitData[]>([]);
    const [chartType, setChartType] = useState<'line' | 'bar'>('line');

    const fetchCommitData = async () => {
        try {
            const commitResponse = await axios.get(
                `${BASE_URL}/repo/${owner}/${name}/commits`,
                {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                }
            );

            setCommitData(commitResponse.data);
        } catch (error) {
            console.error('Error fetching commit data:', error);
        }
    };

    useEffect(() => {
        fetchCommitData();
    }, []);

    // Prepare chart data
    const chartData = {
        labels: commitData.map((item) => item.date), // X-axis labels
        datasets: [
            {
                label: 'Commits Over Time',
                data: commitData.map((item) => item.count), // Y-axis data
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                tension: 0.4, 
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Commits Over Time',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Commit Count',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='my-28'>
            <h1>COMMITS OVER TIME</h1>

            {/* Toggle Button */}
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => setChartType('line')}
                    style={{
                        marginRight: '10px',
                        padding: '10px',
                        backgroundColor:
                            chartType === 'line' ? '#007bff' : '#ddd',
                        color: chartType === 'line' ? '#fff' : '#000',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Line Chart
                </button>
                <button
                    onClick={() => setChartType('bar')}
                    style={{
                        padding: '10px',
                        backgroundColor:
                            chartType === 'bar' ? '#007bff' : '#ddd',
                        color: chartType === 'bar' ? '#fff' : '#000',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Bar Chart
                </button>
            </div>

            {/* Render Chart */}
            {chartType === 'line' ? (
                <Line data={chartData} options={options} />
            ) : (
                <Bar data={chartData} options={options} />
            )}
        </div>
    );
};

export default RepoCommitGraph;
