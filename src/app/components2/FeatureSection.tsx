import { Wand2, Zap, Globe, Shield, Layers, Mic } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI Auto-Captions",
    description:
      "Generate accurate captions in 100+ languages with industry-leading AI transcription.",
  },
  {
    icon: Zap,
    title: "Instant Enhancement",
    description:
      "Upscale resolution, stabilize footage, and enhance colors with one click.",
  },
  {
    icon: Globe,
    title: "Background Removal",
    description:
      "Remove or replace backgrounds instantly using advanced AI segmentation.",
  },
  {
    icon: Layers,
    title: "Smart Editing",
    description:
      "AI suggests cuts, transitions, and effects based on your content style.",
  },
  {
    icon: Mic,
    title: "Voice Cloning",
    description:
      "Dub your videos in any language while preserving your original voice.",
  },
  {
    icon: Shield,
    title: "Secure Storage",
    description:
      "Enterprise-grade encryption with unlimited cloud storage included.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="gradient-text"> Create</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful AI tools designed to transform your raw footage into
            polished, professional content.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group gradient-border p-6 rounded-xl hover:scale-[1.02] transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
