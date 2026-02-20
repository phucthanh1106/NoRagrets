import { useState } from "react";

export default function CustomizationPage() {
  const [enabled, setEnabled] = useState(true);
  const [goal, setGoal] = useState("");
  const [emotion, setEmotion] = useState("");
  const [dreamNarrative, setDreamNarrative] = useState("");

  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState([]);

  const [questionInput, setQuestionInput] = useState("");
  const [questions, setQuestions] = useState([]);

  const [siteInput, setSiteInput] = useState("");
  const [sites, setSites] = useState(["youtube.com", "instagram.com"]);

  const addKeyword = () => {
    if (!keywordInput.trim()) return;
    setKeywords([...keywords, keywordInput.trim()]);
    setKeywordInput("");
  };

  const addQuestion = () => {
    if (!questionInput.trim()) return;
    setQuestions([...questions, questionInput.trim()]);
    setQuestionInput("");
  };

  const addSite = () => {
    if (!siteInput.trim()) return;
    setSites([...sites, siteInput.trim()]);
    setSiteInput("");
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-white">
      <div className="w-[900px] mx-auto pt-[48px] pb-[80px]">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-[32px]">
          <h1 className="text-[28px] font-bold">Motivation System</h1>
          <button className="text-[14px] text-gray-400 hover:text-white">
            Back
          </button>
        </div>

        {/* EXTENSION TOGGLE */}
        <div className="w-full h-[80px] bg-[#171A21] rounded-[12px] p-[20px] flex justify-between items-center">
          <span className="text-[16px] font-medium">Extension Status</span>
          <div
            onClick={() => setEnabled(!enabled)}
            className={`w-[52px] h-[28px] rounded-full cursor-pointer flex items-center transition-all ${
              enabled ? "bg-green-500 justify-end" : "bg-gray-600 justify-start"
            }`}
          >
            <div className="w-[22px] h-[22px] bg-white rounded-full m-[3px]" />
          </div>
        </div>

        {/* GOAL SECTION */}
        <Section
          title="What are you working toward?"
          subtitle="This appears when you open distracting sites"
        >
          <Textarea value={goal} onChange={setGoal} height="80px" />
        </Section>

        {/* EMOTIONAL REASON */}
        <Section title="Why does this matter to you?">
          <Textarea value={emotion} onChange={setEmotion} height="100px" />
        </Section>

        {/* DREAM KEYWORDS */}
        <Section title="Dream Keywords">
          <div className="flex gap-[10px]">
            <input
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              className="flex-1 h-[48px] bg-[#171A21] border border-[#2A2F3A] rounded-[10px] px-[12px] outline-none focus:border-blue-500"
              placeholder="Enter keyword..."
            />
            <button
              onClick={addKeyword}
              className="w-[100px] h-[48px] bg-blue-600 rounded-[8px] hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-[10px] mt-[12px]">
            {keywords.map((k, i) => (
              <div
                key={i}
                className="h-[36px] px-[12px] bg-[#1F2430] rounded-[8px] flex items-center gap-[8px]"
              >
                <span className="text-[14px]">{k}</span>
                <button
                  onClick={() =>
                    setKeywords(keywords.filter((_, idx) => idx !== i))
                  }
                  className="text-gray-400 hover:text-white text-[14px]"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </Section>

        {/* QUESTION BANK */}
        <Section title="Questions That Should Stop You">
          <div className="flex gap-[10px]">
            <input
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              className="flex-1 h-[48px] bg-[#171A21] border border-[#2A2F3A] rounded-[10px] px-[12px] outline-none focus:border-blue-500"
              placeholder="Enter question..."
            />
            <button
              onClick={addQuestion}
              className="w-[100px] h-[48px] bg-blue-600 rounded-[8px] hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className="mt-[12px]">
            {questions.map((q, i) => (
              <div
                key={i}
                className="w-full min-h-[48px] bg-[#171A21] rounded-[10px] p-[14px] mt-[10px] flex justify-between items-center"
              >
                <span className="text-[15px]">{q}</span>
                <button
                  onClick={() =>
                    setQuestions(questions.filter((_, idx) => idx !== i))
                  }
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </Section>

        {/* DREAM NARRATIVE */}
        <Section title="Describe Your Dream Life in Detail">
          <Textarea
            value={dreamNarrative}
            onChange={setDreamNarrative}
            height="140px"
          />
        </Section>

        {/* BLOCKED SITES */}
        <Section title="Blocked Websites">
          <div className="flex gap-[10px]">
            <input
              value={siteInput}
              onChange={(e) => setSiteInput(e.target.value)}
              className="flex-1 h-[48px] bg-[#171A21] border border-[#2A2F3A] rounded-[10px] px-[12px] outline-none focus:border-blue-500"
              placeholder="example.com"
            />
            <button
              onClick={addSite}
              className="w-[100px] h-[48px] bg-blue-600 rounded-[8px] hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className="mt-[12px]">
            {sites.map((site, i) => (
              <div
                key={i}
                className="w-full h-[44px] bg-[#171A21] rounded-[10px] px-[14px] mt-[8px] flex justify-between items-center"
              >
                <span>{site}</span>
                <button
                  onClick={() =>
                    setSites(sites.filter((_, idx) => idx !== i))
                  }
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </Section>

        {/* SAVE BUTTON */}
        <button className="w-full h-[56px] bg-blue-600 rounded-[12px] mt-[48px] font-semibold hover:bg-blue-700 active:bg-blue-800">
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* Reusable Components */

function Section({ title, subtitle, children }) {
  return (
    <div className="mt-[40px]">
      <h2 className="text-[18px] font-semibold mb-[8px]">{title}</h2>
      {subtitle && (
        <p className="text-[13px] text-gray-500 mb-[12px]">{subtitle}</p>
      )}
      {children}
    </div>
  );
}

function Textarea({ value, onChange, height }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ height }}
      className="w-full bg-[#171A21] border border-[#2A2F3A] rounded-[10px] p-[12px] text-[15px] outline-none focus:border-blue-500"
    />
  );
}