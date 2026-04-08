# 🎮 Tetris Game - Multi-Agent Testing Environment

A modern, responsive Tetris game built with vanilla JavaScript, featuring a multi-agent stage system for development, testing, staging, and production environments.

## 🌟 Features

- **Classic Tetris Gameplay**: All 7 tetromino pieces with rotation and movement
- **Multi-Agent Stages**: Switch between Development, Testing, Staging, and Production modes
- **Responsive Design**: Works on desktop and mobile devices
- **Score System**: Track your score, level, and lines cleared
- **Next Piece Preview**: See what's coming next
- **Keyboard Controls**: Full keyboard support for gameplay
- **Beautiful UI**: Modern gradient design with smooth animations

## 🎯 Agent Stages

### Development Stage
- **Speed**: 800ms (slower for testing)
- **Features**: Full debugging, grid overlay, verbose logging
- **Use Case**: Initial development and feature testing

### Testing Stage
- **Speed**: 600ms (moderate)
- **Features**: Validation enabled, performance monitoring
- **Use Case**: QA testing and bug verification

### Staging Stage
- **Speed**: 500ms (normal)
- **Features**: Production-like environment, optimized
- **Use Case**: Pre-production validation

### Production Stage
- **Speed**: 400ms (fastest)
- **Features**: Fully optimized, error logging only
- **Use Case**: Live deployment

## 🎮 Controls

| Key | Action |
|-----|--------|
| ← → | Move piece left/right |
| ↑ | Rotate piece |
| ↓ | Soft drop (move down faster) |
| Space | Hard drop (instant drop) |
| P | Pause/Resume game |

## 🚀 Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/tetris.git
cd tetris
```

2. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

3. Navigate to `http://localhost:8000` in your browser

### GitHub Pages Deployment

This project is configured for GitHub Pages deployment:

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Tetris game with multi-agent stages"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tetris.git
git push -u origin main
```

2. Enable GitHub Pages:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Click "Save"

3. Your game will be live at: `https://YOUR_USERNAME.github.io/tetris/`

## 📁 Project Structure

```
tetris/
├── index.html          # Main HTML file
├── styles.css          # Styling and responsive design
├── app.js              # Game logic and agent stage management
├── README.md           # This file
├── .bob/
│   └── agents.json     # Agent stage configurations
└── assets/             # Future assets (images, sounds, etc.)
```

## 🔧 Configuration

Agent stages are configured in `.bob/agents.json`. Each stage includes:

- **Game Speed**: Drop interval in milliseconds
- **Debug Mode**: Enable/disable debugging features
- **Grid Display**: Show/hide alignment grid
- **Log Level**: Verbosity of console output
- **Testing Configuration**: Test suite settings

## 🎨 Customization

### Changing Colors

Edit the `COLORS` array in `app.js`:
```javascript
const COLORS = [
    '#000000', // Empty
    '#00f0f0', // I - Cyan
    '#f0f000', // O - Yellow
    // ... add your colors
];
```

### Adjusting Difficulty

Modify agent stage speeds in `app.js`:
```javascript
const AGENT_CONFIGS = {
    development: {
        speed: 800, // Change this value
        // ...
    }
};
```

## 🧪 Testing

The project includes configurations for different testing stages:

- **Unit Tests**: Test individual game functions
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows
- **Performance Tests**: Measure game performance

## 📊 Scoring System

- **Line Clear**: 100 points × current level
- **Soft Drop**: 1 point per cell
- **Hard Drop**: 2 points per cell
- **Level Up**: Every 10 lines cleared

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Classic Tetris game design by Alexey Pajitnov
- Built with vanilla JavaScript for maximum compatibility
- Designed for GitHub Pages deployment

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Enjoy the game! 🎮**