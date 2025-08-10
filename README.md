# 🦈 3D Shark Portfolio

An immersive 3D portfolio website featuring a swimming shark in an ocean environment, built with React, Three.js, and TypeScript.

## ✨ Features

- **Interactive 3D Scene** - Realistic shark swimming animation with physics-based movement
- **Ocean Environment** - Dynamic underwater atmosphere with gradient lighting
- **Responsive Design** - Optimized for desktop and mobile devices
- **Smooth Performance** - 60fps animations with efficient rendering
- **Professional Portfolio Content** - Showcasing full-stack development experience

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Animation**: Framer Motion
- **Linting**: ESLint with TypeScript support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio-3d.git
cd portfolio-3d

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view in browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── 3d/
│   │   ├── Ocean.tsx      # 3D ocean environment
│   │   └── Shark.tsx      # Animated shark model
│   └── PortfolioContent.tsx # Portfolio information overlay
├── App.tsx                # Main application component
└── main.tsx              # Application entry point
```

## 🎯 Key Features Implemented

### 3D Shark Animation
- Realistic swimming patterns with physics-based movement
- Boundary detection to keep shark visible
- Smooth orientation changes and banking effects
- Mobile-optimized performance

### Ocean Environment
- Gradient background simulating ocean depths
- Dynamic lighting with ambient and directional lights
- Environment mapping for realistic reflections
- Optional camera following system

### Portfolio Showcase
- Professional experience summary (3+ years)
- Technology stack highlighting
- Multilingual capabilities display
- Industry experience across manufacturing, healthcare, retail, finance

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Mobile Optimization

- Responsive layout with Tailwind CSS breakpoints
- Touch-friendly interactions
- Optimized 3D performance for mobile devices
- Prevented unwanted zoom behaviors

## 🎨 Customization

### Shark Behavior
Modify shark movement in `src/components/3d/Shark.tsx`:
- `velocity` - Swimming speed
- `SAFE_BOUNDS` - Movement boundaries
- Animation timing and smoothness

### Ocean Appearance
Customize ocean environment in `src/components/3d/Ocean.tsx`:
- Background gradient colors
- Lighting setup
- Camera positioning

### Portfolio Content
Update personal information in `src/components/PortfolioContent.tsx`:
- Professional experience
- Skills and technologies
- Contact information

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

### Deploy to platforms:
- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag and drop `dist` folder or connect repository
- **GitHub Pages**: Use `gh-pages` package for easy deployment

## 🔮 Future Enhancements

- [ ] Additional marine life and underwater effects
- [ ] Interactive project showcase with 3D elements
- [ ] Sound effects and ambient ocean audio
- [ ] Particle systems for bubbles and water effects
- [ ] Multiple shark species with different behaviors

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

MIT License - feel free to use this code for your own portfolio projects.

---

**Built with ❤️ by Kai** | Full-Stack Engineer specializing in React and Web3