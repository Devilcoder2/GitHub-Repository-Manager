/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pie, Doughnut, PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    ChartData,
} from 'chart.js';
import { useState } from 'react';

// Register ChartJS components
ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend);

type ChartType = 'pie' | 'doughnut' | 'polar';

const ShowLanguages = ({
    languages,
}: {
    languages: Record<string, number>;
}) => {
    const [activeChart, setActiveChart] = useState<ChartType>('pie');

    // Calculate total lines of code
    const total = Object.values(languages).reduce(
        (sum, value) => sum + value,
        0
    );

    // Generate labels with percentages
    const labels = Object.entries(languages).map(([lang, value]) => {
        const percentage = ((value / total) * 100).toFixed(1);
        return `${lang} (${percentage}%)`;
    });

    // Generate random colors for each language
    const generateColors = (count: number) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(`hsl(${(i * 360) / count}, 70%, 50%)`);
        }
        return colors;
    };

    const chartData: ChartData<'pie' | 'doughnut' | 'polarArea'> = {
        labels: labels,
        datasets: [
            {
                data: Object.values(languages),
                backgroundColor: generateColors(Object.keys(languages).length),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: 'Languages Used',
                font: {
                    size: 16,
                    weight: 'bold',
                },
            },
        },
    };

    const renderChart = () => {
        switch (activeChart) {
            case 'pie':
                return (
                    <Pie
                        data={chartData as ChartData<'pie'>}
                        options={options as any}
                    />
                );
            case 'doughnut':
                return (
                    <Doughnut
                        data={chartData as ChartData<'doughnut'>}
                        options={options as any}
                    />
                );
            case 'polar':
                return (
                    <PolarArea
                        data={chartData as ChartData<'polarArea'>}
                        options={options as any}
                    />
                );
            default:
                return (
                    <Pie
                        data={chartData as ChartData<'pie'>}
                        options={options as any}
                    />
                );
        }
    };

    return (
        <div className='mt-6'>
            {languages && (
                <div className='w-full max-w-md mx-auto'>
                    <div className='flex justify-center gap-4 mb-6'>
                        {(['pie', 'doughnut', 'polar'] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setActiveChart(type)}
                                className={`px-4 py-2 rounded-md ${
                                    activeChart === type
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>
                    {renderChart()}
                </div>
            )}
        </div>
    );
};

export default ShowLanguages;
