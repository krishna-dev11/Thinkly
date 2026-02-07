// import React, { useState, useRef, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { askAI } from "../../Services.jsx/Operations/authAPI";
// import { MessageSquare, X, Send, Bot, User } from "lucide-react";

// const AIGeminiChat = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [inputQuery, setInputQuery] = useState("");
//   const [chatHistory, setChatHistory] = useState([]); // Poori chat yahan save hogi
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();
//   const scrollRef = useRef(null);

//   // Auto-scroll logic: Naya message aate hi niche scroll ho jaye
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [chatHistory, loading, isOpen]);

//   const handleAskAi = (e) => {
//     e.preventDefault();
//     const currentQuery = inputQuery.trim();
//     if (!currentQuery) return;

//     // 1. User ka sawal history mein add karo
//     const newUserMessage = { type: "user", text: currentQuery };
//     setChatHistory((prev) => [...prev, newUserMessage]);
    
//     setLoading(true);
//     setInputQuery(""); // Input field turant saaf karo

//     // 2. API call karo
//     dispatch(askAI(currentQuery, (res) => {
//       // 3. AI ka jawab history mein add karo
//       const newBotMessage = { type: "bot", text: res };
//       setChatHistory((prev) => [...prev, newBotMessage]);
//       setLoading(false);
//     }));
//   };

//   return (
//     <div className=" absolute  top-5 right-10 z-[1000] font-sans flex flex-col items-end">
      
//       {/* --- CHAT WINDOW --- */}
//       <div
//         className={`mb-4 w-[350px] md:w-[380px] h-[520px] bg-gray-100 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform ${
//           isOpen 
//             ? "translate-y-0 opacity-100 scale-100" 
//             : "translate-y-10 opacity-0 scale-95 pointer-events-none"
//         }`}
//       >
//         {/* Header */}
//         <div className="bg-black p-4 flex items-center justify-between text-white">
//           <div className="flex items-center gap-3">
//             <div className="bg-red-600 p-1.5 rounded-lg">
//               <Bot size={24} className="text-white" />
//             </div>
//             <div>
//               <h3 className="text-sm font-semibold leading-none text-white">Thinkly Assistant</h3>
//               <span className="text-[11px] text-gray-400">Online | AI Powered</span>
//             </div>
//           </div>
//           <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full">
//             <X size={20} className="text-white"/>
//           </button>
//         </div>

//         {/* Messages Area */}
//         <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8F9FA]">
//           {/* Default Greeting */}
//           <div className="flex items-start gap-2 max-w-[85%]">
//             <div className="bg-red-600 p-1 rounded-md mt-1 shrink-0">
//               <Bot size={14} className="text-white" />
//             </div>
//             <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-gray-800 text-sm">
//               Hi there 👋 How can I help you today?
//             </div>
//           </div>

//           {/* Loop through Chat History */}
//           {chatHistory.map((msg, index) => (
//             <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} items-start gap-2`}>
//               {msg.type === "bot" && (
//                 <div className="bg-red-600 p-1 rounded-md mt-1 shrink-0">
//                   <Bot size={14} className="text-black" />
//                 </div>
//               )}
              
//               <div className={`p-3 rounded-2xl border text-sm max-w-[85%] shadow-sm ${
//                 msg.type === "user" 
//                 ? "bg-red-600 text-black rounded-tr-none" 
//                 : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
//               }`}>
//                 {msg.text}
//               </div>

//               {msg.type === "user" && (
//                 <div className="bg-gray-300 p-1 rounded-md mt-1 shrink-0">
//                   <User size={14} className="text-gray-600" />
//                 </div>
//               )}
//             </div>
//           ))}

//           {/* Typing Indicator */}
//           {loading && (
//             <div className="flex items-center gap-2 ml-8">
//               <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
//                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
//                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
//                 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input Form */}
//         <div className="p-4 bg-white border-t border-gray-200">
//           <form onSubmit={handleAskAi} className="flex items-center bg-gray-100 rounded-full px-4 py-2">
//             <input
//               type="text"
//               value={inputQuery}
//               onChange={(e) => setInputQuery(e.target.value)}
//               placeholder="Ask anything..."
//               className="flex-1 bg-transparent outline-none text-sm text-gray-700 py-1"
//             />
//             <button 
//               type="submit"
//               disabled={loading || !inputQuery.trim()}
//               className="ml-2 p-1.5 bg-red-600 rounded-full text-black hover:bg-red-700 transition-all disabled:opacity-50"
//             >
//               <Send size={16} />
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* --- FLOATING BUTTON --- */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={`w-14 h-14 rounded-full flex bg-white items-center justify-center text-black shadow-2xl transition-all duration-300 hover:scale-110 ${
//           isOpen ? "bg-black" : "bg-red-600"
//         }`}
//       >
//         {isOpen ? <X size={28} /> : <Bot size={28} />}
//       </button>
//     </div>
//   );
// };

// export default AIGeminiChat;


import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { askAI } from "../../Services.jsx/Operations/authAPI";
import { X, Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown"; // Step 1: Import library

const AIGeminiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, loading, isOpen]);

  const handleAskAi = (e) => {
    e.preventDefault();
    const currentQuery = inputQuery.trim();
    if (!currentQuery) return;

    const newUserMessage = { type: "user", text: currentQuery };
    setChatHistory((prev) => [...prev, newUserMessage]);
    
    setLoading(true);
    setInputQuery("");

    dispatch(askAI(currentQuery, (res) => {
      const newBotMessage = { type: "bot", text: res };
      setChatHistory((prev) => [...prev, newBotMessage]);
      setLoading(false);
    }));
  };

  return (
    <div className="absolute right-10 z-[1000] font-sans flex flex-col items-end">
      
      {/* --- CHAT WINDOW --- */}
      <div
        className={`mb-4 w-[350px] md:w-[400px] h-[550px] bg-gray-100 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform ${
          isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-black p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-1.5 rounded-lg">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-none text-white">Thinkly Assistant</h3>
              <span className="text-[11px] text-gray-400">Online | AI Powered</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full">
            <X size={20} className="text-white"/>
          </button>
        </div>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8F9FA]">
          {/* Default Greeting */}
          <div className="flex items-start gap-2 max-w-[85%]">
            <div className="bg-red-600 p-1 rounded-md mt-1 shrink-0"><Bot size={14} className="text-white" /></div>
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-gray-800 text-sm">
              Hi there 👋 How can I help you today?
            </div>
          </div>

          {chatHistory.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} items-start gap-2`}>
              {msg.type === "bot" && (
                <div className="bg-red-600 p-1 rounded-md mt-1 shrink-0"><Bot size={14} className="text-white" /></div>
              )}
              
              <div className={`p-3 rounded-2xl border text-sm max-w-[85%] shadow-sm ${
                msg.type === "user" ? "bg-red-600 text-black rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none"
              }`}>
                {/* Step 2: Render Markdown for Bot messages */}
                {msg.type === "bot" ? (
                  <article className="prose prose-sm prose-slate max-w-none break-words">
                    <ReactMarkdown 
                      components={{
                        // Styling for markdown elements
                        strong: ({node, ...props}) => <span className="font-bold text-black" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal ml-4 my-2" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </article>
                ) : (
                  msg.text
                )}
              </div>

              {msg.type === "user" && (
                <div className="bg-gray-300 p-1 rounded-md mt-1 shrink-0"><User size={14} className="text-gray-600" /></div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 ml-8">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleAskAi} className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 py-1"
            />
            <button 
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="ml-2 p-1.5 bg-red-600 rounded-full text-caribbeangreen-700 hover:bg-red-700 transition-all disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center bg-caribbeangreen-100 justify-center shadow-2xl transition-all duration-300 hover:scale-110 ${
          isOpen ? "bg-black text-white" : "bg-red-600 text-white"
        }`}
      >
        {isOpen ? <X size={28} /> : <Bot size={28} />}
      </button>
    </div>
  );
};

export default AIGeminiChat;