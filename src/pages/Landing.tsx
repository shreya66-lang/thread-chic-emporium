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
      className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 cursor-pointer"
      onClick={() => navigate("/home")}
    >
      {/* Animated geometric lines - inspired by Riotters */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="animate-spin-slow origin-center" style={{ transformOrigin: "50% 50%" }}>
          <circle
            cx="50%"
            cy="50%"
            r="200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary"
          />
          <circle
            cx="50%"
            cy="50%"
            r="250"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary"
          />
          <circle
            cx="50%"
            cy="50%"
            r="300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary"
          />
        </g>
        
        <g className="animate-spin-reverse origin-center" style={{ transformOrigin: "50% 50%" }}>
          <line
            x1="50%"
            y1="30%"
            x2="50%"
            y2="70%"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary"
          />
          <line
            x1="30%"
            y1="50%"
            x2="70%"
            y2="50%"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary"
          />
          <line
            x1="35%"
            y1="35%"
            x2="65%"
            y2="65%"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary"
          />
          <line
            x1="65%"
            y1="35%"
            x2="35%"
            y2="65%"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary"
          />
        </g>
      </svg>

      {/* Moving cloth/fabric waves */}
      <div className="absolute inset-0">
        <div className="cloth-wave cloth-wave-1" />
        <div className="cloth-wave cloth-wave-2" />
        <div className="cloth-wave cloth-wave-3" />
      </div>

      {/* Logo centered */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="animate-fade-in">
          <img
            src={preyasiLogo}
            alt="Preyasi"
            className="w-[400px] h-auto animate-float"
          />
        </div>
      </div>

      {/* Click hint */}
      <p className="absolute bottom-8 left-0 right-0 text-center text-sm text-muted-foreground animate-pulse">
        Click anywhere to enter
      </p>
    </div>
  );
};

export default Landing;
