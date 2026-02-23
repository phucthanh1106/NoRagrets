export default function TestCSS() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-12 font-sans relative overflow-hidden">
        
            {/* Subtle Background Decoration */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50" />

            <div className="z-10 flex flex-col items-center max-w-4xl w-full">
                {/* Question/Dream Label */}
                <span className="text-slate-400 font-bold text-xs uppercase tracking-[0.4em] mb-6 animate-pulse">
                Reality Check
                </span>

                {/* Large Central Text */}
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 text-center leading-tight mb-16 tracking-tight">
                Is this choice helping you become the person you want to be?
                </h1>

                {/* Timer / Skip Button */}
                <div className="relative group">
                <button 
                    disabled 
                    className="relative overflow-hidden bg-slate-100 text-slate-400 px-12 py-5 rounded-2xl font-bold text-lg min-w-[200px] transition-all cursor-not-allowed border border-slate-200"
                >
                    {/* Progress Fill Layer */}
                    <div 
                    className="absolute top-0 left-0 h-full bg-slate-900 transition-none"
                    style={{ 
                        width: '0%', /* This will be animated via JS later */
                        animation: 'fillProgress 10s linear forwards' 
                    }}
                    />
                    
                    {/* Button Text Layer */}
                    <span className="relative z-10 flex items-center gap-3">
                        Wait 10s...
                    </span>
                </button>
                
                <p className="mt-4 text-slate-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Take a breath. Think before you skip.
                </p>
                </div>
            </div>
        </div>
    )
}