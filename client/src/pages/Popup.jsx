import { useState, useEffect } from 'react';

function Popup() {
    const [isActive, setIsActive] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const [realityChecks, setRealityChecks] = useState("");
    const [hesitantTime, setHesitantTime] = useState("");
    const [error, setError] = useState({ realityChecks: "", hesitantTime: "" });
    
    // Load saved state when the popup opens
    useEffect(() => {
        // Check the 'isActive' key in Chrome's local storage
        chrome.storage.local.get(['isActive', 'realityChecks', 'hesitantTime'], (result) => {
            if (result.isActive !== undefined) setIsActive(result.isActive);
            if (result.realityChecks !== undefined) setRealityChecks(result.realityChecks);
            if (result.hesitantTime !== undefined) setHesitantTime(result.hesitantTime);
        });
    }, []);

    // Handle the toggle behaviour of the on/off switch
    const handleToggle = () => {
        const newActiveState = !isActive;
        setFirstRender(false);
        setIsActive(newActiveState);
        chrome.storage.local.set({ isActive: newActiveState });
    }

    // Handle the button that leads user to options page
    const handleGoOptions = () => {
        // Construct the URL to our index.html and add our 'type' hint
        const url = chrome.runtime.getURL("index.html?type=options");

        // Open a brand new tab and go to that url
        chrome.tabs.create({ url })
    }

    const updateBasicSettings = (key, value) => {
        const cleanValue = value.replace(/\D/g, '');
        const formattedValue = cleanValue.replace(/^0+(?!$)/, '');
        let numValue = parseInt(formattedValue) || 0;
        let errorMsg = "";

        // Enforce some limits
        if (key === 'realityChecks') {
            if (numValue > 20) {
                numValue = 20;
                errorMsg = "Max 20 reality checks allowed";
            }
        } else if (key === 'hesitantTime') {
            if (numValue > 60) {
                numValue = 60;
                errorMsg = "Time must be under 1 min (60s)";
            }
        }

        // Update errors
        setError(prev => ({ ...prev, [key]: errorMsg }));


        if (key === 'realityChecks') setRealityChecks(formattedValue);
        if (key === 'hesitantTime') setHesitantTime(formattedValue);
        chrome.storage.local.set({ [key]: numValue });
    };


    return (
        <div className="w-65 p-1 bg-white text-slate-100 font-sans shadow-xl border border-slate-800">
            <header className="flex justify-between items-center mb-2">
                <div className="flex items-baseline gap-1 ml-2">
                    <h1 className="text-lg font-bold text-black drop-shadow-[0_0_20px_rgba(248,113,113,0.5)]">
                    NoRagrets
                    </h1>
                    {/* 🏷️ Version Tag */}
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
                        v{chrome.runtime.getManifest().version}
                    </span>
                </div>

                {/* Power Symbol Toggle */}
                <button 
                    onClick={handleToggle}
                    className="focus:outline-none transition-transform active:scale-90"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 30 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className={`w-6 h-6 transition-all ${firstRender ? 'duration-0' : 'duration-300'} 
                            ${isActive 
                                ? 'text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]' 
                                : 'text-gray-300 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                            }`}
                    >
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                        <line x1="12" y1="2" x2="12" y2="12"></line>
                    </svg>
                </button>
            </header>

            <div className="space-y-4 p-1">
                {/* Input 1: Reality Checks */}
                <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Reality Checks</label>
                    <div className="relative">
                        <input 
                            type="text"
                            inputMode="numeric"
                            value={realityChecks}
                            onChange={(e) => updateBasicSettings('realityChecks', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        />
                        <span className="absolute right-4 top-2 text-slate-400 text-sm">count</span>
                    </div>

                    {/* Error Message Area */}
                    {error.realityChecks && (
                        <p className="ml-1 text-red-500 text-[10px]">
                            {error.realityChecks}
                        </p>
                    )}
                </div>


                {/* Input 2: Hesitant Timer */}
                <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Hesitant Timer</label>
                    <div className="relative">
                        <input 
                            type="text"
                            inputMode="numeric"
                            value={hesitantTime}
                            onChange={(e) => updateBasicSettings('hesitantTime', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        />
                        <span className="absolute right-4 top-2 text-slate-400 text-sm">sec</span>
                    </div>

                    {/* Error Message Area */}
                    {error.hesitantTime && (
                        <p className="ml-1 text-red-500 text-[10px]">
                            {error.hesitantTime}
                        </p>
                    )}
                </div>


                <button 
                    onClick={handleGoOptions}
                    className="w-full py-2 text-sm text-slate-400 hover:text-blue-500 font-medium transition-colors"
                >
                    More Settings →
                </button>
            </div>
        </div>
    );
}

export default Popup;