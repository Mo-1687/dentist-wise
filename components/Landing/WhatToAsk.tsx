import { MessageCircleIcon, MessageSquareIcon } from "lucide-react";
import Image from "next/image";
import Badge from "../Badge/Badge";

const WhatToAsk = () => {
  const questions = [
    {
      question: "My tooth hurts when I bite down",
      answer:
        "Get immediate advice on pain management, possible causes, and when to see a dentist urgently",
      tags: ["Instant Response", "Pain Relief"],
    },
    {
      question: "How much does teeth whitening cost?",
      answer:
        "Compare treatment options, pricing ranges, and find the best whitening solution for your budget",
      tags: ["Cost Analysis", "Treatment Options"],
    },
    {
      question: "When should I replace my filling?",
      answer:
        "Learn about filling lifespan, warning signs of wear, and replacement timing guidance",
      tags: ["Preventive Care", "Maintenance"],
    },
  ];
  return (
    <section
      id="about"
      className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-background to-muted/20"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 flex flex-col items-center gap-5">
          <Badge icon={<MessageCircleIcon size={10} />} text="What to Ask" />

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold  tracking-tight">
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Ask about
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              anything dental
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From simple questions to complex concerns, our AI delivers
            expert-level guidance trained on thousands of real dental cases
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Interactive Chat Examples */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-8">
                Common questions our AI answers:
              </h3>

              <div className="space-y-6">
                {questions.map((q, index) => (
                  <div key={index} className="group relative">
                    <div className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-6 border border-border/50 hover:border-primary/30 hover:-translate-y-4 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                          <MessageSquareIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-3 flex-1">
                          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                            <p className="font-semibold text-primary">
                              {q.question}
                            </p>
                          </div>
                          <div className="bg-muted/30 rounded-2xl p-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {q.answer}
                            </p>
                            <div className="flex gap-2 mt-3">
                              {q.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Left Side - Interactive Chat Examples */}

          {/* Right Side - AI Illustration */}
          <div className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 hover:-translate-y-10 transition-all duration-500">
            <div className="flex items-center justify-center h-full">
              <Image
                src="/confused.png"
                alt="AI Assistant"
                width={600}
                height={600}
                className="w-full h-auto max-w-lg object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatToAsk;
