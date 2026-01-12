import { Upload, Cpu, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your Video",
    description:
      "Drag and drop any video format. We support 4K, HDR, and files up to 10GB.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Does the Magic",
    description:
      "Our AI analyzes and processes your video, applying your selected enhancements.",
  },
  {
    icon: Download,
    step: "03",
    title: "Download & Share",
    description:
      "Export in any format or share directly to your favorite platforms.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get started in seconds. No learning curve, no complex software to
            install.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div key={item.step} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-px bg-gradient-to-r from-primary/50 to-secondary/50" />
              )}

              {/* Step circle */}
              <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full glass mb-6 mx-auto">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                <item.icon className="relative w-12 h-12 text-primary" />
              </div>

              {/* Step number */}
              <div className="text-sm font-bold text-primary mb-2">
                {item.step}
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
