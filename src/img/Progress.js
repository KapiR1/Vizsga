import React from 'react';

export default function Progress({ value }) {
    return (
        <div className="w-full bg-gray-200 rounded h-4">
            <div
                className="bg-blue-600 h-4 rounded"
                style={{ width: `${value}%` }}
            ></div>
        </div>
    );
}
