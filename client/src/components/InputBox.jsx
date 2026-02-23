import { useState, useEffect } from 'react';


export default function InputBox({ category, label, placeholder }) {
    const [input, setInput] = useState("");
    const [bank, setBank] = useState([]);

    useEffect(() => {
        chrome.storage.local.get([category], (result) => {
            if (result[category]) {
                setBank(result[category]);
            }
        })
    }, [category])

    const handleAddItem = () => {
        let newItem = input.trim();

        // If user didn't include protocol, add https://
        if (!newItem.startsWith("http://") && !newItem.startsWith("https://")) {
            newItem = "https://" + newItem;
        }

        const parsedUrl = new URL(newItem);
        let hostname = parsedUrl.hostname;

        // normalize www
        if (hostname.startsWith("www.")) {
            hostname = hostname.slice(4);
        }

        newItem = hostname; // store clean domain only

        const newBank = [...bank, newItem];
        setBank(newBank);
        setInput("");
        chrome.storage.local.set({ [category]: newBank }); // IMPORTANT!!!: chrome.storage.local.set requires an object not an array
    }

    const handleRemoveItem = (index) => {
        const newBank = bank.filter((_, i) => i !== index);
        setBank(newBank);
        chrome.storage.local.set({ [category]: newBank });
    };

    return (
        <div className="flex flex-col gap-4 mb-8">
        <div className="relative group">
            <label className="absolute -top-2.5 left-3 px-1 bg-white text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {label}
            </label>
            <div className="border border-slate-200 rounded-xl p-3 focus-within:border-blue-500 transition-all shadow-sm">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddItem(category)}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-slate-800 text-sm focus:outline-none"
                />
            </div>
        </div>
        {/* List Rendering */}
        <div className="flex flex-col gap-2">
            {bank.map((item, index) => (
                <div key={index} className="flex justify-between items-center gap-2 bg-slate-100 px-3 py-1.5 overflow-hidden rounded-full border border-slate-200">
                    <span className="text-xs text-slate-700 font-medium truncate">{item}</span>
                    <button onClick={() => handleRemoveItem(index)} className="text-slate-400 hover:text-red-500 text-xs flex-shrink-0">✕</button>
                </div>
            ))}
        </div>
        </div>
    );
}
