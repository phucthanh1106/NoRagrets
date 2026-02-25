import { useState, useEffect } from 'react';
import InputBox from '../components/InputBox';
import SidebarItem from '../components/SideBarItem';

const Options = () => {
    const [activeTab, setActiveTab] = useState("blocked");
    const [settings, setSettings] = useState({
        useWhitelist: false,
        aiPowered: false
    });


    useEffect(() => {
        chrome.storage.local.get(['userSettings'], (result) => {
            if (result.userSettings) setSettings(result.userSettings);
        });
    }, []);

    const updateSettings = (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        chrome.storage.local.set({ userSettings: newSettings });
    };

    return (
        <div className="flex min-h-screen bg-white font-sans text-slate-900">
        {/* Left Navbar */}
        <aside className="w-64 border-r border-slate-100 p-4 flex flex-col gap-8 bg-slate-50/50">
            <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black italic">NR</div>
            <h1 className="font-semibold text-2xl tracking-tighter">NoRagrets</h1>
            </div>

            <nav className="flex flex-col gap-1 ">
                <SidebarItem id="blocked" label="Blocked List" icon="⊘" activeTab={activeTab} setActiveTab={setActiveTab} />
                <SidebarItem id="questions" label="Self-questions" icon="?" activeTab={activeTab} setActiveTab={setActiveTab} />
                <SidebarItem id="dreams" label="Goals" icon="⟡" activeTab={activeTab} setActiveTab={setActiveTab} />
                <SidebarItem id="settings" label="Settings" icon="⛭" activeTab={activeTab} setActiveTab={setActiveTab}/>
            </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-12 max-w-4xl">
            {activeTab === 'blocked' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <h2 className="text-3xl font-black mb-8">Where to stay focused?</h2>
                    <div className="flex gap-8 items-start">
                        <div className="flex-1">
                            <InputBox 
                                category="blacklist" 
                                label="Blacklist (Block these)" 
                                placeholder="facebook.com..." 
                            />
                        </div>
                        <div className="flex-1">
                            <InputBox 
                                category="whitelist" 
                                label="Whitelist (Block all others)" 
                                placeholder="github.com..." 
                            />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'questions' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-3xl font-black mb-8">Reality Check Questions</h2>
                <InputBox category="questions" label="Questions for yourself" placeholder="Is this helping your future?" isTextArea />
            </div>
            )}

            {activeTab === 'dreams' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-3xl font-black mb-8">What are you working for?</h2>
                <InputBox category="dreams" label="Your Goals" placeholder="Financial freedom, traveling..." isTextArea />
            </div>
            )}

            {activeTab === 'settings' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-3xl font-black mb-10">App Settings</h2>
                
                <div className="space-y-8">
                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-slate-50/30">
                    <div>
                        <p className="font-bold text-slate-800">Use Whitelist Mode</p>
                        <p className="text-xs text-slate-500">Only allow sites in your whitelist, block everything else.</p>
                    </div>
                    <button 
                        onClick={() => updateSettings('useWhitelist', !settings.useWhitelist)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${settings.useWhitelist ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.useWhitelist ? 'left-7' : 'left-1'}`} />
                    </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-slate-50/30">
                    <div>
                        <p className="font-bold text-slate-800">AI-Powered Questions</p>
                        <p className="text-xs text-slate-500">Generate reality checks based on your recorded dreams.</p>
                    </div>
                    <button 
                        onClick={() => updateSettings('aiPowered', !settings.aiPowered)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${settings.aiPowered ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.aiPowered ? 'left-7' : 'left-1'}`} />
                    </button>
                </div>
                </div>
            </div>
            )}
        </main>
        </div>
    );
};

export default Options;