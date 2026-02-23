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
        const newItem = input.trim();
        if (bank.includes(newItem) || !newItem) {
            alert("Duplicate domain name!")
            return;
        } 

        // Website validation
        const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-21]{2,63}$|^localhost$/i;

        if (!domainRegex.test(newItem) && (category == "blacklist" || category == "whitelist")) {
            alert("Please enter a valid domain (e.g., website.com)");
            return;
        }

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
