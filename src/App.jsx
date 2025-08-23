import VoiceAssistant from "./components/VoiceAssistant";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      {/* Main Assistant Centered */}
      <div className="flex-1 flex items-center justify-center p-4">
        <VoiceAssistant />
      </div>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-gray-800">
        <p className="text-gray-400 text-sm flex items-center justify-center gap-1">
          © {new Date().getFullYear()} • <span>⚡ Powered by </span>
          <a
            href="https://github.com/SRCarlo"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-bold animate-pulse"
          >
            SRCarlo
          </a>
        </p>
      </footer>
    </div>
  );
}
