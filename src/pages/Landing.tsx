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
      className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 cursor-pointer"
      onClick={() => navigate("/home")}
    >
      {/* Vibrant gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.1),transparent_60%)]" />
      
      {/* Moving cloth/fabric waves with vibrant colors */}
      <div className="absolute inset-0 opacity-50">
        <div className="cloth-wave cloth-wave-1" />
        <div className="cloth-wave cloth-wave-2" />
        <div className="cloth-wave cloth-wave-3" />
      </div>

      {/* Colorful animated geometric patterns - mandala inspired */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="purplePink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.6)" />
            <stop offset="50%" stopColor="rgba(236, 72, 153, 0.6)" />
            <stop offset="100%" stopColor="rgba(250, 204, 21, 0.5)" />
          </linearGradient>
          <linearGradient id="yellowPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(250, 204, 21, 0.6)" />
            <stop offset="50%" stopColor="rgba(236, 72, 153, 0.5)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.6)" />
          </linearGradient>
          <linearGradient id="pinkYellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(236, 72, 153, 0.6)" />
            <stop offset="100%" stopColor="rgba(250, 204, 21, 0.6)" />
          </linearGradient>
        </defs>
        
        {/* Mandala-style rotating circles */}
        <g className="animate-spin-slow origin-center" style={{ transformOrigin: "50% 50%" }}>
          <circle cx="50" cy="50" r="20" fill="none" stroke="url(#purplePink)" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="url(#yellowPurple)" strokeWidth="0.15" strokeDasharray="1 1" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="url(#pinkYellow)" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="url(#purplePink)" strokeWidth="0.1" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="url(#yellowPurple)" strokeWidth="0.15" />
          
          {/* Decorative flower petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 50 50)`}>
              <circle cx="50" cy="15" r="2" fill="url(#pinkYellow)" opacity="0.7" />
              <ellipse cx="50" cy="18" rx="1.5" ry="3" fill="url(#purplePink)" opacity="0.5" />
            </g>
          ))}
        </g>
        
        {/* Counter-rotating inner mandala */}
        <g className="animate-spin-reverse origin-center" style={{ transformOrigin: "50% 50%" }}>
          <circle cx="50" cy="50" r="15" fill="none" stroke="url(#yellowPurple)" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="url(#pinkYellow)" strokeWidth="0.15" strokeDasharray="0.5 0.5" />
          
          {/* Star pattern */}
          <line x1="50" y1="35" x2="50" y2="65" stroke="url(#purplePink)" strokeWidth="0.15" />
          <line x1="35" y1="50" x2="65" y2="50" stroke="url(#yellowPurple)" strokeWidth="0.15" />
          <line x1="39" y1="39" x2="61" y2="61" stroke="url(#pinkYellow)" strokeWidth="0.15" />
          <line x1="61" y1="39" x2="39" y2="61" stroke="url(#purplePink)" strokeWidth="0.15" />
        </g>

        {/* Floating decorative dots */}
        <g className="animate-spin-slow-alt origin-center" style={{ transformOrigin: "50% 50%" }}>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const x = 50 + 30 * Math.cos((angle * Math.PI) / 180);
            const y = 50 + 30 * Math.sin((angle * Math.PI) / 180);
            return (
              <circle 
                key={i} 
                cx={x} 
                cy={y} 
                r="1.5" 
                fill={i % 3 === 0 ? "rgba(168, 85, 247, 0.6)" : i % 3 === 1 ? "rgba(236, 72, 153, 0.6)" : "rgba(250, 204, 21, 0.6)"} 
              />
            );
          })}
        </g>
      </svg>

      {/* Logo centered with colorful presentation */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="animate-fade-in">
          <div className="relative">
            {/* Vibrant circular glow behind logo */}
            <div className="absolute inset-0 -m-16 rounded-full bg-gradient-radial from-purple-300/40 via-pink-300/30 to-transparent blur-3xl animate-pulse-slow" />
            <div className="absolute inset-0 -m-12 rounded-full bg-gradient-radial from-yellow-200/30 via-transparent to-transparent blur-2xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
            
            {/* Logo with circular frame effect */}
            <div className="relative rounded-full p-8 md:p-12 backdrop-blur-sm bg-white/30 border-2 border-white/50 shadow-2xl">
              <div className="rounded-full overflow-hidden w-[min(400px,70vw)] aspect-square flex items-center justify-center bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-yellow-50/50">
                <img
                  src={preyasiLogo}
                  alt="Preyasi"
                  className="w-full h-full object-cover animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click hint */}
      <p className="absolute bottom-8 left-0 right-0 text-center text-sm font-light tracking-wider uppercase text-purple-600/80 animate-pulse">
        Click anywhere to enter
      </p>
    </div>
  );
};

export default Landing;
