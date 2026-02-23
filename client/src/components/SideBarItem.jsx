import { useState, useEffect } from 'react';

export default function SidebarItem({ id, label, icon, activeTab, setActiveTab }) {
    return (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full text-black flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-semibold transition-all ${
                activeTab === id ? 'bg-gray-200 text-black' : 'text-black hover:bg-slate-50'
            }`}
        >
            <span className={`text-lg ${activeTab === id ? '' : 'grayscale opacity-60'}`}>
                {icon}
            </span>
            {label}
        </button>
    )
};