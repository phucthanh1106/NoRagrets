import { useState, useEffect } from 'react';
export default function BlockPage() {   
    const [timeLeft, setTimeLeft] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [quesBank, setQuesBank] = useState([]);
    const [remainingChecks, setRemainingChecks] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);

    // Create a ref to store the interval ID so we can clear it from anywhere
    const [intervalId, setIntervalId] = useState(null);

    const startTimer = (seconds) => {
        // Clear any existing timer first to prevent "speed-up" bugs
        if (intervalId) clearInterval(intervalId);

        setTimeLeft(seconds);
        
        const newInterval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(newInterval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        setIntervalId(newInterval);
    };

    useEffect(() => {
        let timer;
        // Fetching questions and time
        chrome.storage.local.get(['realityChecks', 'hesitantTime', 'questions', 'dreams', 'userSettings'], (result) => {
            const hesitantTime = result.hesitantTime || 0;
            const userQuestions = result.questions || ["Is this worth your time?"] ;
            const userDreams = result.dreams || [];
            const numOfChecks = result.realityChecks;

            // Update states
            setTotalTime(hesitantTime);
            setRemainingChecks(numOfChecks);
            setDisplayText(userQuestions[Math.floor(Math.random() * userQuestions.length)]);

            // Check whether they want to use AI-generated questions
            if (result.userSettings.aiPowered) {
                console.log("Need to integrate Gemini API");
            } else {
                setQuesBank(userQuestions);
            }

            // Start timer for the first time
            startTimer(hesitantTime);
            setIsLoaded(true);
        })

        // Clean the timer
        return () => { if (intervalId) clearInterval(intervalId); };
    }, [])

    const handleSkipQues = () => {
        if (timeLeft > 0) return;
        if (remainingChecks != 1) {
            const nextQ = quesBank[Math.floor(Math.random() * quesBank.length)];

            setDisplayText(nextQ); 
            setRemainingChecks(prev => prev - 1);
            startTimer(totalTime);
        } else {
            const urlParams = new URLSearchParams(window.location.search);
            const targetUrl = urlParams.get('target');

            if (targetUrl) {
                chrome.storage.local.set({ 
                    tempAllow: decodeURIComponent(targetUrl)
                }, () => {
                    window.location.replace(decodeURIComponent(targetUrl));
                });
            }
        }
    }

    return (
        <div className="min-h-screen bg-[url('/bgimage1.avif')] bg-cover bg-center flex flex-col items-center justify-center p-12 font-sans relative overflow-hidden">
        
            <div className="z-10 flex flex-col items-center max-w-4xl w-full">
                {/* Question/Dream Label */}
                <span className="text-slate-400 font-bold text-lg uppercase tracking-[0.4em] mb-6">
                    Reality Check
                </span>

                {/* Large Central Text */}
                <h1 className="text-5xl md:text-7xl font-black text-white text-center leading-tight mb-16 tracking-tight">
                    {isLoaded ? displayText : "Connecting..."}
                </h1>

                {/* Timer / Skip Button */}
                <div className="flex flex-col items-center group">
                    <button 
                        onClick={handleSkipQues}
                        className="relative overflow-hidden bg-white/80 text-white/80 px-12 py-5 rounded-2xl font-bold text-lg min-w-[200px] transition-all"
                    >
                        {/* Button Text Layer */}
                        <span className="relative z-10">
                            {!isLoaded 
                                ? "Loading..." 
                                : timeLeft > 0 
                                    ? `${timeLeft}` 
                                    : remainingChecks > 1 
                                        ? "Next Check" 
                                        : "Continue"}
                        </span>

                        {/* Progress Fill Layer */}            
                        <div 
                            className="absolute top-0 left-0 h-full bg-black/80 backdrop-blur-mdtransition-none"
                            style={{ 
                                width: `${((totalTime - timeLeft) / totalTime) * 100}%`,
                            }}
                        />
                    </button>
                    
                    <p className="mt-4 text-slate-300 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Take a breath. Think before you skip.
                    </p>
                </div>
            </div>
        </div>
    )
}