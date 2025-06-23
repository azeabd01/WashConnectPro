import React from 'react';

const WeeklyPerformance = ({ data }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Performance Hebdomadaire</h3>
            <div className="space-y-4">
                {data.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="w-20 text-sm font-medium text-gray-600">{day.day}</div>
                        <div className="flex-1 mx-4">
                            <div className="bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${(day.bookings / 25) * 100}%` }}
                                />
                            </div>
                        </div>
                        <div className="text-sm flex items-center gap-3">
                            <span className="text-gray-600">{day.bookings} rés.</span>
                            <span className="font-medium text-gray-900">{day.revenue} MAD</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyPerformance;
