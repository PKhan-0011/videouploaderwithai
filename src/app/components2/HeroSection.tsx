import { Button } from "@/components/ui/button";
import { Play, Upload, Sparkles } from "lucide-react";
//import heroVisual from "@/assets/hero-visual.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground) / 0.3) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            Powered by Advanced AI
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          Upload. Transform.
          <span className="block gradient-text">Create Magic.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Transform your videos with cutting-edge AI. Auto-generate captions,
          enhance quality, remove backgrounds, and create stunning content in
          minutes.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <Button variant="secondary" size="lg" className="group">
            <Upload className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
            Start Uploading Free
          </Button>
          <Button variant="destructive" size="lg">
            <Play className="w-5 h-5" />
            Watch Demo
          </Button>
        </div>

        {/* Hero visual */}
        <div
          className="mt-16 animate-fade-in relative"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          {/* <img
            src={heroVisual}
            alt="AI Video Editing Interface"
            className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl shadow-primary/20 animate-float"
          /> */}
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-12 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          {[
            { value: "10M+", label: "Videos Processed" },
            { value: "50K+", label: "Happy Creators" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
