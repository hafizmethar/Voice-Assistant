import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaRobot,
  FaGlobe,
  FaQuestionCircle,
  FaTrash,
} from "react-icons/fa";
import TaskList from "./TaskList";
import AlarmList from "./AlarmList";
import {
  parseAlarmTextToDate,
  formatTime,
  getCurrentTime,
  getGreeting,
} from "../utils/time";

// Quick site map for "open X"
const SITE_MAP = {
  // 🌐 Social & Communication
  youtube: "https://youtube.com",
  gmail: "https://mail.google.com",
  google: "https://google.com",
  instagram: "https://instagram.com",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
  whatsapp: "https://web.whatsapp.com",
  maps: "https://maps.google.com",
  twitter: "https://twitter.com",
  x: "https://twitter.com",
  facebook: "https://facebook.com",
  messenger: "https://messenger.com",
  telegram: "https://web.telegram.org",
  discord: "https://discord.com",
  reddit: "https://reddit.com",
  snapchat: "https://web.snapchat.com",
  tiktok: "https://tiktok.com",
  pinterest: "https://pinterest.com",
  quora: "https://quora.com",

  // 🎬 Movies & Entertainment
  netflix: "https://netflix.com",
  prime: "https://primevideo.com",
  hotstar: "https://hotstar.com",
  sonyLiv: "https://www.sonyliv.com",
  zee5: "https://zee5.com",
  voot: "https://voot.com",
  aha: "https://www.aha.video",
  mxPlayer: "https://www.mxplayer.in",
  crunchyroll: "https://crunchyroll.com",
  hulu: "https://hulu.com",
  disneyPlus: "https://disneyplus.com",
  appleTV: "https://tv.apple.com",
  twitch: "https://twitch.tv",
  imdb: "https://imdb.com",
  rottentomatoes: "https://rottentomatoes.com",

  // 🎵 Music & Audio
  spotify: "https://spotify.com",
  soundcloud: "https://soundcloud.com",
  gaana: "https://gaana.com",
  wynk: "https://wynk.in/music",
  saavn: "https://www.jiosaavn.com",
  appleMusic: "https://music.apple.com",
  tidal: "https://tidal.com",
  youtubeMusic: "https://music.youtube.com",
  shazam: "https://www.shazam.com",

  // 🧑‍💻 Productivity
  notion: "https://notion.so",
  slack: "https://slack.com",
  zoom: "https://zoom.us",
  skype: "https://web.skype.com",
  calendly: "https://calendly.com",
  drive: "https://drive.google.com",
  docs: "https://docs.google.com",
  sheets: "https://sheets.google.com",
  slides: "https://slides.google.com",
  forms: "https://forms.google.com",
  dropbox: "https://dropbox.com",
  onedrive: "https://onedrive.live.com",
  outlook: "https://outlook.live.com",
  yahoo: "https://mail.yahoo.com",
  protonmail: "https://protonmail.com",
  evernote: "https://evernote.com",
  trello: "https://trello.com",
  asana: "https://asana.com",
  monday: "https://monday.com",

  // 🛒 Shopping & Payments
  amazon: "https://amazon.com",
  flipkart: "https://flipkart.com",
  myntra: "https://myntra.com",
  ebay: "https://ebay.com",
  aliexpress: "https://aliexpress.com",
  shopify: "https://shopify.com",
  paytm: "https://paytm.com",
  phonepe: "https://phonepe.com",
  snapdeal: "https://snapdeal.com",
  walmart: "https://walmart.com",
  target: "https://target.com",
  etsy: "https://etsy.com",
  bestbuy: "https://bestbuy.com",

  // 👨‍💻 Tech & Coding
  stackoverflow: "https://stackoverflow.com",
  w3schools: "https://w3schools.com",
  mdn: "https://developer.mozilla.org",
  geeksforgeeks: "https://geeksforgeeks.org",
  codepen: "https://codepen.io",
  codesandbox: "https://codesandbox.io",
  replit: "https://replit.com",
  hackerrank: "https://hackerrank.com",
  leetcode: "https://leetcode.com",
  kaggle: "https://kaggle.com",
  coursera: "https://coursera.org",
  udemy: "https://udemy.com",
  edx: "https://edx.org",
  khanacademy: "https://khanacademy.org",
  freecodecamp: "https://freecodecamp.org",

  // 📚 Education & Research
  mitocw: "https://ocw.mit.edu",
  nptel: "https://nptel.ac.in",
  skillshare: "https://skillshare.com",
  linkedinLearning: "https://www.linkedin.com/learning",
  brilliant: "https://brilliant.org",
  udacity: "https://udacity.com",
  datacamp: "https://datacamp.com",
  pluralsight: "https://pluralsight.com",
  researchgate: "https://researchgate.net",
  jstor: "https://jstor.org",
  googleScholar: "https://scholar.google.com",

  // 🤖 AI & Tools
  chatgpt: "https://chat.openai.com",
  openai: "https://openai.com",
  copilot: "https://copilot.microsoft.com",
  claude: "https://claude.ai",
  gemini: "https://gemini.google.com",
  perplexity: "https://perplexity.ai",
  huggingface: "https://huggingface.co",
  midjourney: "https://midjourney.com",
  runway: "https://runwayml.com",
  leonardo: "https://leonardo.ai",
  characterai: "https://character.ai",
  phind: "https://phind.com",
  poe: "https://poe.com",
  notebooklm: "https://notebooklm.google",

  // 📰 News & Media
  bbc: "https://bbc.com",
  cnn: "https://cnn.com",
  nytimes: "https://nytimes.com",
  ndtv: "https://ndtv.com",
  indianexpress: "https://indianexpress.com",
  thehindu: "https://thehindu.com",
  reuters: "https://reuters.com",
  aljazeera: "https://aljazeera.com",
  foxnews: "https://foxnews.com",
  timesofindia: "https://timesofindia.indiatimes.com",

  // 💰 Finance & Business
  forbes: "https://forbes.com",
  bloomberg: "https://bloomberg.com",
  moneycontrol: "https://moneycontrol.com",
  investing: "https://investing.com",
  yahooFinance: "https://finance.yahoo.com",
  coinmarketcap: "https://coinmarketcap.com",
  coingecko: "https://coingecko.com",
  robinhood: "https://robinhood.com",

  // ⚽ Sports
  espn: "https://espn.com",
  cricbuzz: "https://cricbuzz.com",
  f1: "https://formula1.com",
  nba: "https://nba.com",
  fifa: "https://fifa.com",
  olympics: "https://olympics.com",

  // 🏥 Health & Fitness
  webmd: "https://webmd.com",
  mayoclinic: "https://mayoclinic.org",
  healthline: "https://healthline.com",
  who: "https://who.int",
  nih: "https://nih.gov",
  myfitnesspal: "https://myfitnesspal.com",

  // ✈️ Travel & Maps
  makemytrip: "https://makemytrip.com",
  yatra: "https://yatra.com",
  goibibo: "https://goibibo.com",
  airbnb: "https://airbnb.com",
  booking: "https://booking.com",
  tripadvisor: "https://tripadvisor.com",
  expedia: "https://expedia.com",

  // 🏛️ Government & Services
  indiaGov: "https://www.india.gov.in",
  irctc: "https://www.irctc.co.in",
  uidai: "https://uidai.gov.in",
  incometax: "https://incometax.gov.in",
  digiLocker: "https://digilocker.gov.in",

  // ⚙️ Utilities
  speedtest: "https://www.speedtest.net",
  canva: "https://canva.com",
  grammarly: "https://grammarly.com",
  removebg: "https://remove.bg",
  tinyurl: "https://tinyurl.com",
  bitly: "https://bitly.com",
};

export default function VoiceAssistant() {
  // UI + state
  const [listening, setListening] = useState(false);
  const [lastHeard, setLastHeard] = useState("");
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("va_messages") || "[]");
    } catch {
      return [];
    }
  });
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("va_tasks") || "[]");
    } catch {
      return [];
    }
  });
  const [alarms, setAlarms] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("va_alarms") || "[]");
    } catch {
      return [];
    }
  });

  // refs
  const recognitionRef = useRef(null);
  const timersRef = useRef({}); // alarmId -> timeoutId
  const audioCtxRef = useRef(null); // WebAudio

  // ---------- WebAudio tones (no files needed) ----------
  const ensureAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  };

  const tone = (
    freq = 880,
    duration = 0.18,
    type = "sine",
    volume = 0.25,
    startAt = 0
  ) => {
    const ctx = ensureAudio();
    const t0 = ctx.currentTime + startAt;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration);
  };

  const playSuccess = () => {
    tone(520, 0.12, "sine", 0.22, 0);
    tone(790, 0.12, "sine", 0.22, 0.11);
  };
  const playError = () => {
    tone(700, 0.12, "sawtooth", 0.2, 0);
    tone(480, 0.12, "sawtooth", 0.2, 0.11);
  };
  const playAlarm = () => {
    for (let i = 0; i < 6; i++) tone(900, 0.15, "square", 0.25, i * 0.22);
  };

  // ---------- Speech Recognition ----------
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      addMsg(
        "ai",
        "Speech Recognition not supported in this browser. Use Chrome or Edge."
      );
      return;
    }
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";

    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript.toLowerCase().trim();
      setLastHeard(transcript);
      addMsg("user", transcript);
      handleCommand(transcript);
    };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;

    // greet on first load (only if no history)
    if (!messages.length) {
      const greet = `${getGreeting()} I'm your AI voice assistant. Say "help" to see what I can do.`;
      addMsg("ai", greet);
      speak(greet);
    }

    return () => {
      try {
        rec.abort();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Persistence ----------
  useEffect(() => {
    localStorage.setItem("va_messages", JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    localStorage.setItem("va_tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem("va_alarms", JSON.stringify(alarms));
  }, [alarms]);

  // ---------- (Re)schedule alarms after mount ----------
  useEffect(() => {
    Object.values(timersRef.current).forEach(clearTimeout);
    timersRef.current = {};
    alarms.forEach(scheduleAlarm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once with initial alarms

  // ---------- Helpers ----------
  const addMsg = (from, text) => {
    setMessages((prev) => [...prev, { from, text }]);
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1;
    u.pitch = 1;
    synth.speak(u);
  };

  const startListening = () => {
    const rec = recognitionRef.current;
    if (!rec) {
      addMsg("ai", "Speech Recognition not supported.");
      return;
    }
    try {
      // Resume audio context on user gesture (for tones)
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      setListening(true);
      rec.start();
    } catch {
      setListening(false);
    }
  };

  const stopListening = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    try {
      rec.stop();
    } catch {}
    setListening(false);
  };

  const openSite = (text) => {
    const key = text.split(/\s+/)[0];
    const url =
      SITE_MAP[key] ||
      (text.includes(".")
        ? text.startsWith("http")
          ? text
          : `https://${text}`
        : `https://${text}.com`);
    window.open(url, "_blank", "noopener,noreferrer");
    addMsg("ai", `Opening ${key}...`);
    playSuccess();
    speak(`Opening ${key}`);
  };

  const scheduleAlarm = ({ id, time }) => {
    const when = new Date(time);
    const delay = when.getTime() - Date.now();
    if (delay <= 0) {
      fireAlarm(id);
      return;
    }
    const tid = setTimeout(() => fireAlarm(id), delay);
    timersRef.current[id] = tid;
  };

  const fireAlarm = (id) => {
    const alarmExists = alarms.find((a) => a.id === id);
    if (!alarmExists) return; // do nothing if alarm is already removed

    playAlarm();
    speak("Alarm time!");
    addMsg("ai", "⏰ Alarm time!");
    setAlarms((prev) => prev.filter((a) => a.id !== id));

    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("⏰ Alarm", { body: "It's time!" });
    }
  };

  const cancelAlarm = (id) => {
    setAlarms((prev) => prev.filter((a) => a.id !== id));
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
    addMsg("ai", `Canceled alarm ${id}.`);
    speak(`Canceled alarm ${id}`);
  };

  // ---------- Rule-based AI-like fallback ----------
  const wittyReply = (msg) => {
    if (/^(hi|hello|hey)\b/.test(msg)) return getGreeting();
    if (msg.includes("how are you"))
      return "Running at the speed of JavaScript 🚀";
    if (msg.includes("who are you"))
      return "I'm your local, free voice assistant.";
    if (msg.includes("time")) return `It's ${getCurrentTime()}.`;
    if (msg.includes("date"))
      return `Today is ${new Date().toLocaleDateString()}.`;
    if (msg.includes("help") || msg.includes("what can you do")) {
      return "Try: add task buy milk, list tasks, remove task 1, clear tasks, set alarm at 7 am, set alarm in 2 minutes, cancel alarm 123, open youtube, what time is it, reset all.";
    }
    return "Sorry, I didn't understand that. Say 'help' for examples.";
  };

  // ---------- Command router ----------
  const handleCommand = (cmd) => {
    // Time
    if (cmd.includes("what time") || cmd.includes("current time")) {
      const t = formatTime(new Date());
      addMsg("ai", `It is ${t}.`);
      speak(`It is ${t}`);
      return;
    }

    // Tasks
    if (cmd.startsWith("add task")) {
      const task = cmd.replace("add task", "").trim();
      if (!task) {
        playError();
        addMsg("ai", "Please say the task after 'add task'.");
        speak("Please say the task.");
      } else {
        setTasks((prev) => [...prev, task]);
        playSuccess();
        addMsg("ai", `Task added: ${task}`);
        speak(`Task added: ${task}`);
      }
      return;
    }

    if (cmd.startsWith("list tasks") || cmd.startsWith("show tasks")) {
      if (tasks.length === 0) {
        addMsg("ai", "No tasks yet.");
        speak("No tasks yet.");
      } else {
        addMsg("ai", `You have ${tasks.length} task(s).`);
        speak(`You have ${tasks.length} tasks.`);
      }
      return;
    }

    const rm = cmd.match(/remove\s+task\s+(\d+)/);
    if (rm) {
      const idx = parseInt(rm[1], 10) - 1;
      setTasks((prev) => {
        if (idx >= 0 && idx < prev.length) {
          const t = prev[idx];
          const next = prev.filter((_, i) => i !== idx);
          playSuccess();
          addMsg("ai", `Removed task: ${t}`);
          speak(`Removed task: ${t}`);
          return next;
        } else {
          playError();
          addMsg("ai", "I couldn't find that task number.");
          speak("I couldn't find that task number.");
          return prev;
        }
      });
      return;
    }

    if (cmd.includes("clear tasks") || cmd.includes("remove all tasks")) {
      setTasks([]);
      playSuccess();
      addMsg("ai", "Cleared all tasks.");
      speak("Cleared all tasks.");
      return;
    }

    // Alarms
    if (cmd.startsWith("set alarm")) {
      const whenTxt = cmd.replace("set alarm", "").trim(); // "at 7 am" / "in 2 minutes"
      const when = parseAlarmTextToDate(whenTxt);
      if (!when) {
        playError();
        addMsg("ai", "Sorry, I couldn't understand the time.");
        speak("Sorry, I couldn't understand the time.");
      } else {
        const id = Date.now();
        const alarmObj = { id, time: when.toISOString() };
        setAlarms((prev) => {
          const next = [...prev, alarmObj];
          scheduleAlarm(alarmObj);
          return next;
        });
        playSuccess();
        addMsg(
          "ai",
          `Alarm set for ${when.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}. (id: ${id})`
        );
        speak(
          `Alarm set for ${when.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`
        );
      }
      return;
    }

    const cancel = cmd.match(/cancel\s+alarm\s+(\d+)/);
    if (cancel) {
      cancelAlarm(Number(cancel[1]));
      return;
    }

    // Open site
    if (cmd.startsWith("open")) {
      const rest = cmd
        .replace("open", "")
        .trim()
        .replace(/^the\s+/, "");
      if (rest) openSite(rest);
      else {
        playError();
        addMsg("ai", "Say 'open' followed by a site, e.g., open youtube.");
        speak("Say open followed by a site.");
      }
      return;
    }

    // Reset all
    if (cmd.startsWith("reset")) {
      resetAll();
      return;
    }

    // Fallback "AI-like" reply
    const reply = wittyReply(cmd);
    if (reply.startsWith("Sorry")) playError();
    else playSuccess();
    addMsg("ai", reply);
    speak(reply);
  };

  // Ask for Notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  const clearAllAlarms = () => {
    Object.values(timersRef.current).forEach((tid) => clearTimeout(tid));
    timersRef.current = {};
  };

  const resetAll = () => {
    clearAllAlarms(); // cancel all scheduled alarms
    setTasks([]);
    setAlarms([]); // clear alarms state
    setMessages([]);
    setLastHeard("");
    localStorage.removeItem("va_tasks");
    localStorage.removeItem("va_alarms");
    localStorage.removeItem("va_messages");
    playSuccess();
    addMsg("ai", "Reset complete. Fresh start!");
    speak("Reset complete. Fresh start!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl p-5 bg-surface rounded-2xl shadow-soft border border-white/15"
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold flex items-center gap-3">
          <FaRobot className="text-gray-400 text-2xl animate-bounce-rotate" />
          <span className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-700 bg-clip-text text-transparent font-extrabold animate-[shimmer_3s_ease-in-out_infinite]">
            AI Voice Assistant
          </span>
        </h1>

        <style jsx>{`
          @keyframes shimmer {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          @keyframes bounce-rotate {
            0% {
              transform: translateY(0) rotate(0deg);
            }
            25% {
              transform: translateY(-5px) rotate(15deg);
            }
            50% {
              transform: translateY(0) rotate(0deg);
            }
            75% {
              transform: translateY(-5px) rotate(-15deg);
            }
            100% {
              transform: translateY(0) rotate(0deg);
            }
          }

          /* Apply the animation */
          .animate-bounce-rotate {
            animation: bounce-rotate 2s ease-in-out infinite;
          }
        `}</style>

        <div className="flex items-center gap-3">
          <button
            onClick={resetAll}
            className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
            title="Reset all"
          >
            <FaTrash />
          </button>
          <button
            onClick={listening ? stopListening : startListening}
            className={`p-3 rounded-full transition focus:outline-none focus:ring-4 ${
              listening ? "pulse" : ""
            }`}
            style={{
              boxShadow: listening
                ? "0 0 0 8px rgba(239,68,68,.15)"
                : "0 0 0 8px rgba(34,197,94,.15)",
            }}
            title={listening ? "Stop Listening" : "Start Listening"}
            aria-label={listening ? "Stop Listening" : "Start Listening"}
          >
            <div
              className={`p-3 rounded-full ${
                listening
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-emerald-500 hover:bg-emerald-600"
              } text-white`}
            >
              {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </div>
          </button>
        </div>
      </header>

      {/* Last heard + quick tips */}
      <div className="text-sm text-white mb-3 p-3 rounded-2xl bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-md border border-gray-600 flex items-center gap-2">
        <span className="font-semibold text-gray-300 font-bold">Heard :</span>

        <span className="text-white flex-1 flex items-center gap-1">
          {lastHeard ? (
            <span>{lastHeard}</span>
          ) : (
            <>
              <FaMicrophone className="text-gray-400 w-4 h-4 animate-pulse" />
              <span className="text-gray-400">
                Click the mic and speak your command
              </span>
            </>
          )}
        </span>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-300 mb-4">
        <FaQuestionCircle className="opacity-70" />
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-card/70 px-2 py-1">
            add task buy milk
          </span>
          <span className="rounded-full bg-card/70 px-2 py-1">
            set alarm in 2 minutes
          </span>
          <span className="rounded-full bg-card/70 px-2 py-1">
            open youtube
          </span>
          <span className="rounded-full bg-card/70 px-2 py-1">
            what time is it
          </span>
          <span className="rounded-full bg-card/70 px-2 py-1">
            remove task 1
          </span>
          <span className="rounded-full bg-card/70 px-2 py-1">reset</span>
        </div>
      </div>

      {/* Chat area */}
      <div className="mb-2 p-3 rounded-xl bg-card/60 border border-white/14 flex flex-col gap-2">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`chat-bubble max-w-[85%] rounded-2xl px-3 py-2 text-sm break-words
        ${
          m.from === "ai"
            ? "bg-gradient-to-r from-gray-700 to-gray-600 self-start text-white"
            : "bg-gradient-to-r from-gray-600 to-gray-700 self-end ml-auto text-white"
        }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Task List Section */}
      <div className="mb-2 p-4 border border-white/10 rounded-2xl bg-card/50">
        <TaskList
          tasks={tasks}
          onRemove={(i) =>
            setTasks((prev) => prev.filter((_, idx) => idx !== i))
          }
          onClear={() => setTasks([])}
        />
      </div>

      {/* Alarm List Section */}
      <div className="mb-2 p-4 border border-white/10 rounded-2xl bg-card/50">
        <AlarmList alarms={alarms} onCancel={cancelAlarm} />
      </div>

      {/* Footer (hint) */}
      <div className="mt-2">
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
          <FaGlobe /> Open Websites
        </h3>
        <p className="text-gray-400 text-sm">
          Try: <span className="text-blue-400">"open gmail"</span>,{" "}
          <span className="text-blue-400">"open linkedin"</span>, or say a full
          URL like <span className="text-blue-400">"open example.com"</span>.
        </p>
      </div>
    </motion.div>
  );
}
