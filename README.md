# AI Voice Assistant

A modern AI-powered voice assistant web app built with **React**. Interact using voice commands to manage tasks, set alarms, and open websites directly from your browser.
---

## Features

- **Voice Commands**: Add, list, remove, or clear tasks using natural voice input.
- **Alarms**: Set and cancel alarms with voice input.
- **Open Websites**: Quickly open popular websites via voice commands (e.g., "open YouTube").
- **Real-time Feedback**: Displays the last recognized voice input with animated wave effect.
- **Chat-like Interaction**: AI responds to commands and queries.
- **Web Audio Feedback**: Plays tones for success, errors, and alarms.
- **Persistence**: Tasks, messages, and alarms are saved in `localStorage`.
- **Animations**: Gradient backgrounds, bouncing/rotating robot icon, microphone pulse effect.
- **Responsive Design**: Works on desktop and mobile.

---

## File Structure

```
voice-assistant/
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ index.css
│  ├─ components/
│  │  ├─ VoiceAssistant.jsx
│  │  ├─ TaskList.jsx
│  │  └─ AlarmList.jsx
│  └─ utils/
│     └─ time.js
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/SRCarlo/Voice-Assistant.git
```

2. Navigate to the project directory:

```bash
cd voice-assistant
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## Usage

- **Start/Stop Listening**: Click the microphone button.
- **Tasks**:
  - `add task buy milk`
  - `list tasks`
  - `remove task 1`
  - `clear tasks`
- **Alarms**:
  - `set alarm in 2 minutes` or `set alarm at 7 am`
  - `cancel alarm 123`
- **Open Websites**:
  - `open youtube`
  - `open gmail`
  - `open example.com`
- **Reset All**: Say `reset` to clear tasks, alarms, and messages.

---

## Technologies Used

- **React** (Functional Components & Hooks)
- **Framer Motion** (Animations)
- **React Icons**
- **Web Speech API** (Speech Recognition & Synthesis)
- **Web Audio API** (Audio tones)
- **Tailwind CSS**
- **Vite** (Build Tool)

---

## Customization

- Add more websites in `VoiceAssistant.jsx` via the `SITE_MAP` object.
- Modify gradient or animation styles in Tailwind classes or component CSS.
- Change colors and layout in `index.css` or component styles.

## License

MIT License  
This project is licensed under the MIT License, which means you are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the project, **as long as you include the original copyright and license notice**.  
The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement.

---

Created by **[SRCarlo](https://github.com/SRCarlo)**

### Contact

Feel free to reach out for questions, suggestions, or collaboration:  
- GitHub: [SRCarlo](https://github.com/SRCarlo)  
- Email: asphaltshubhuu@gmail.com 

### Contributing

Contributions, issues, and feature requests are welcome!  
1. Fork the repo  
2. Create a new branch (`git checkout -b feature/YourFeature`)  
3. Commit your changes (`git commit -m 'Add some feature'`)  
4. Push to the branch (`git push origin feature/YourFeature`)  
5. Open a Pull Request  

### Disclaimer

This project is for educational and personal use.  
Use responsibly and do not rely on it for critical tasks.  

### Acknowledgements

- [React](https://reactjs.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Framer Motion](https://www.framer.com/motion/)  
- [React Icons](https://react-icons.github.io/react-icons/)  
- Inspiration from various AI voice assistant projects