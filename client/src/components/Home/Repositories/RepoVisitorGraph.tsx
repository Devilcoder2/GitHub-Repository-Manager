/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { BASE_URL } from '../../../helper';

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

interface RepoVisitorGraphProps {
    owner: string;
    name: string;
}

interface VisitorData {
    date: string;
    count: number;
}

const RepoVisitorGraph: React.FC<RepoVisitorGraphProps> = ({ owner, name }) => {
    const [visitorsData, setVisitorsData] = useState<VisitorData[]>([]);
    const [chartType, setChartType] = useState<'line' | 'bar'>('line');

    const fetchVisitorsData = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/repo/${owner}/${name}/visitors`,
                {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                }
            );

            setVisitorsData(response.data);
        } catch (error) {
            console.error('Error fetching visitor data:', error);
        }
    };

    useEffect(() => {
        fetchVisitorsData();
    }, []);

    // Prepare chart data
    const chartData = {
        labels: visitorsData.map((item) => item.date),
        datasets: [
            {
                label: 'Unique Visitors Over Time',
                data: visitorsData.map((item) => item.count),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
                text: 'Unique Visitors Over Time',
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
                    text: 'Visitor Count',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='my-28'>
            <h1>UNIQUE VISITORS OVER TIME</h1>

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
            {visitorsData.length === 0 ? (
                'No Visitors on this repo...'
            ) : chartType === 'line' ? (
                <Line data={chartData} options={options} />
            ) : (
                <Bar data={chartData} options={options} />
            )}
        </div>
    );
};

export default RepoVisitorGraph;
