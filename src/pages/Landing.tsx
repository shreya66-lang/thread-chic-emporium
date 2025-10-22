import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import preyasiLogo from "@/assets/preyasi-logo.png";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-navigate after 3 seconds, or user can click
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-pink-50/30 cursor-pointer"
      onClick={() => navigate("/home")}
    >
      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,237,213,0.4),rgba(255,245,235,0.2))]" />
      
      {/* Moving cloth/fabric waves - background layer */}
      <div className="absolute inset-0 opacity-40">
        <div className="cloth-wave cloth-wave-1" />
        <div className="cloth-wave cloth-wave-2" />
        <div className="cloth-wave cloth-wave-3" />
      </div>

      {/* Animated geometric lines - inspired by Riotters */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(217, 119, 6, 0.3)" />
            <stop offset="50%" stopColor="rgba(234, 88, 12, 0.5)" />
            <stop offset="100%" stopColor="rgba(217, 119, 6, 0.3)" />
          </linearGradient>
        </defs>
        
        {/* Outer rotating circles */}
        <g className="animate-spin-slow origin-center" style={{ transformOrigin: "50% 50%" }}>
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="0.15"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="0.1"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="0.15"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="0.08"
            strokeDasharray="2 2"
          />
        </g>
        
        {/* Inner counter-rotating pattern */}
        <g className="animate-spin-reverse origin-center" style={{ transformOrigin: "50% 50%" }}>
          <line x1="50" y1="20" x2="50" y2="80" stroke="url(#lineGradient)" strokeWidth="0.1" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="url(#lineGradient)" strokeWidth="0.1" />
          <line x1="25" y1="25" x2="75" y2="75" stroke="url(#lineGradient)" strokeWidth="0.1" />
          <line x1="75" y1="25" x2="25" y2="75" stroke="url(#lineGradient)" strokeWidth="0.1" />
        </g>

        {/* Additional decorative elements */}
        <g className="animate-spin-slow-alt origin-center" style={{ transformOrigin: "50% 50%" }}>
          <circle cx="50" cy="20" r="1.5" fill="rgba(217, 119, 6, 0.4)" />
          <circle cx="80" cy="50" r="1.5" fill="rgba(234, 88, 12, 0.4)" />
          <circle cx="50" cy="80" r="1.5" fill="rgba(217, 119, 6, 0.4)" />
          <circle cx="20" cy="50" r="1.5" fill="rgba(234, 88, 12, 0.4)" />
        </g>
      </svg>

      {/* Logo centered with enhanced presentation */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="animate-fade-in">
          <div className="relative">
            {/* Subtle glow behind logo */}
            <div className="absolute inset-0 bg-gradient-radial from-amber-200/30 via-transparent to-transparent blur-3xl animate-pulse-slow" />
            
            <img
              src={preyasiLogo}
              alt="Preyasi"
              className="relative w-[min(500px,80vw)] h-auto animate-float drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Click hint */}
      <p className="absolute bottom-8 left-0 right-0 text-center text-sm font-light tracking-wider uppercase text-foreground/60 animate-pulse">
        Click anywhere to enter
      </p>
    </div>
  );
};

export default Landing;
