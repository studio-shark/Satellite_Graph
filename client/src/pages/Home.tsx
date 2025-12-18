import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Box, Layers, Clock, Info, BarChart3, TrendingUp, Zap } from "lucide-react";
import Visualization3D from "@/components/Visualization3D";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [stage, setStage] = useState<"2d" | "3d" | "4d" | "overview">("2d");
  const [showInfo, setShowInfo] = useState(false);

  // Auto-advance for demo purposes if user doesn't interact
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only auto-advance once to show capability
      // setStage("3d");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const stages = [
    {
      id: "2d",
      title: "2D Traditional Strategy",
      subtitle: "BCG Matrix Era",
      icon: <Box className="w-5 h-5" />,
      description: "Static analysis of market share vs. growth rate. Limited to snapshot views of current performance.",
      metrics: [
        { label: "Market Share", value: "High/Low" },
        { label: "Growth Rate", value: "High/Low" },
        { label: "Timeframe", value: "Static" }
      ],
      color: "text-blue-400"
    },
    {
      id: "3d",
      title: "3D Transition",
      subtitle: "Expansion Phase",
      icon: <Layers className="w-5 h-5" />,
      description: "Adding depth to analysis. Incorporating market complexity, competitive intensity, and resource allocation.",
      metrics: [
        { label: "Complexity", value: "Medium" },
        { label: "Variables", value: "Multi-factor" },
        { label: "Perspective", value: "Volumetric" }
      ],
      color: "text-cyan-400"
    },
    {
      id: "4d",
      title: "4D Advanced Models",
      subtitle: "Temporal Intelligence",
      icon: <Clock className="w-5 h-5" />,
      description: "Integrating time as the fourth dimension. Predictive analytics, trend forecasting, and dynamic evolution tracking.",
      metrics: [
        { label: "Predictive Power", value: "95%" },
        { label: "Time Horizon", value: "Dynamic" },
        { label: "Intelligence", value: "Adaptive" }
      ],
      color: "text-purple-400"
    }
  ];

  const currentStage = stages.find(s => s.id === stage) || stages[0];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050A14] text-white font-sans selection:bg-cyan-500/30">
      {/* Background Visualization */}
      <Visualization3D stage={stage} />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-display">
            ECONOMIC<span className="text-white">VISION</span>
          </h1>
          <p className="text-sm text-cyan-200/70 font-mono tracking-widest mt-1">TEMPORAL INTELLIGENCE SYSTEM v4.0</p>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="pointer-events-auto border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-200 backdrop-blur-md"
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info className="w-5 h-5" />
        </Button>
      </header>

      {/* Main Content Overlay */}
      <main className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-center items-center">
        {/* Central Stage Indicator - Only visible when transitioning */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-[15%] text-center pointer-events-none"
          >
            <Badge variant="outline" className="mb-4 border-cyan-500/50 text-cyan-300 bg-cyan-950/30 backdrop-blur-sm px-4 py-1">
              CURRENT MODE
            </Badge>
            <h2 className={`text-5xl md:text-7xl font-bold font-display tracking-tight drop-shadow-[0_0_15px_rgba(0,240,255,0.3)] ${currentStage.color}`}>
              {currentStage.id.toUpperCase()}
            </h2>
            <p className="text-xl text-gray-300 mt-2 font-light tracking-wide">{currentStage.subtitle}</p>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-10 pointer-events-none">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
          
          {/* Stage Selector */}
          <div className="glass-panel p-2 rounded-2xl flex gap-2 pointer-events-auto">
            {stages.map((s) => (
              <button
                key={s.id}
                onClick={() => setStage(s.id as any)}
                className={`
                  relative px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium
                  ${stage === s.id 
                    ? "bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)] border border-cyan-500/50" 
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"}
                `}
              >
                {s.icon}
                <span>{s.id.toUpperCase()}</span>
                {stage === s.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl border border-cyan-400/50"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Context Panel */}
          <Card className="w-full md:w-96 glass-panel border-cyan-500/20 bg-black/40 pointer-events-auto backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-display text-cyan-100 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                System Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {currentStage.description}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {currentStage.metrics.map((metric, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-2 border border-white/10">
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{metric.label}</div>
                        <div className="text-sm font-mono text-cyan-300">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Info Overlay */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0A1020] border border-cyan-500/30 rounded-2xl max-w-2xl w-full p-8 shadow-[0_0_50px_rgba(0,240,255,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-display text-white mb-4">About This Visualization</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                This interactive presentation demonstrates the evolution of economic strategy models.
                Moving beyond the traditional 2D BCG Matrix, we visualize the transition into 3D expansion
                and finally into 4D temporal intelligence, where time becomes a critical analytical dimension.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-500/20">
                  <h3 className="text-blue-400 font-bold mb-2">2D Strategy</h3>
                  <p className="text-xs text-gray-400">Static snapshot analysis based on two variables.</p>
                </div>
                <div className="p-4 rounded-xl bg-cyan-900/20 border border-cyan-500/20">
                  <h3 className="text-cyan-400 font-bold mb-2">3D Transition</h3>
                  <p className="text-xs text-gray-400">Volumetric analysis adding depth and complexity.</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-900/20 border border-purple-500/20">
                  <h3 className="text-purple-400 font-bold mb-2">4D Intelligence</h3>
                  <p className="text-xs text-gray-400">Predictive modeling incorporating time and evolution.</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setShowInfo(false)} className="bg-cyan-600 hover:bg-cyan-500 text-white">
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
