"use client";

import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import Image from "next/image";
import { Card } from "../ui/card";

const VapiWidget = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [message, setMessage] = useState<any[]>([]);

  const { user, isLoaded } = useUser();

  const messageContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainer.current) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
  }, [message]);

  // Event for Vapi
  useEffect(() => {
    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("message", handleMessage);
    vapi.on("error", handleError);
  }, []);

  function handleCallStart() {
    toast.success("Call Start");
    setIsConnecting(false);
    setIsCallActive(true);
    setIsCallEnded(false);
  }
  function handleCallEnd() {
    toast.success("Call Ended");
    setIsConnecting(false);
    setIsCallActive(false);
    setIsSpeaking(false);
    setIsCallEnded(true);
  }
  function handleSpeechStart() {
    setIsSpeaking(true);
  }
  function handleSpeechEnd() {
    setIsSpeaking(false);
  }

  function handleMessage(message: any) {
    if (message.type === "transcript" && message.transcriptType === "final") {
      const newMessage = { content: message.transcript, role: message.role };

      setMessage((prev) => [...prev, newMessage]);
    }
  }

  function handleError() {
    toast.error("Vapi Error");
    setIsConnecting(false);
    setIsCallActive(false);
  }

  async function toggleCall() {
    if (isCallActive) vapi.stop();
    else {
      try {
        setIsConnecting(true);
        setMessage([]);
        setIsCallEnded(false);
        vapi.start(process.env.NEXT_PUBLIC_DENTIST_WISE_AI_ASSISTANT_ID);
      } catch (error) {
        toast.error("Vapi Error");
        setIsConnecting(false);
      }
    }
  }

  if (!isLoaded)
    return (
      <div className="relative w-full h-screen flex mt-10 justify-center">
        <Loader className=" animate-spin" width={80} height={80} />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 flex flex-col overflow-hidden pb-20">
      {/* TITLE */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-mono">
          <span>Talk to Your </span>
          <span className="text-primary uppercase">AI Dental Assistant</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Have a voice conversation with our AI assistant for dental advice and
          guidance
        </p>
      </div>

      {/* VIDEO CALL AREA */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* AI ASSISTANT CARD */}

        <Card className="bg-card/90 backdrop-blur-sm border border-border overflow-hidden relative">
          <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
            {/* AI VOICE ANIMATION */}
            <div
              className={`absolute inset-0 ${
                isSpeaking ? "opacity-30" : "opacity-0"
              } transition-opacity duration-300`}
            >
              {/* voice wave animation when speaking */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`mx-1 h-16 w-1 bg-primary rounded-full ${
                      isSpeaking ? "animate-sound-wave" : ""
                    }`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      height: isSpeaking ? `${Math.random() * 50 + 20}%` : "5%",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* AI LOGO */}
            <div className="relative size-32 mb-4">
              <div
                className={`absolute inset-0 bg-primary opacity-10 rounded-full blur-lg ${
                  isSpeaking ? "animate-pulse" : ""
                }`}
              />

              <div className="relative w-full h-full rounded-full bg-card flex items-center justify-center border border-border overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5"></div>
                <Image
                  src="/logo.png"
                  alt="AI Dental Assistant"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>

            <h2 className="text-xl font-bold text-foreground">DentWise AI</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Dental Assistant
            </p>

            {/* SPEAKING INDICATOR */}
            <div
              className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border ${
                isSpeaking ? "border-primary" : ""
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isSpeaking ? "bg-primary animate-pulse" : "bg-muted"
                }`}
              />

              <span className="text-xs text-muted-foreground">
                {isSpeaking
                  ? "Speaking..."
                  : isCallActive
                  ? "Listening..."
                  : isCallEnded
                  ? "Call ended"
                  : "Waiting..."}
              </span>
            </div>
          </div>
        </Card>

        {/* USER CARD */}
        <Card
          className={`bg-card/90 backdrop-blur-sm border overflow-hidden relative`}
        >
          <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
            {/* User Image */}
            <div className="relative size-32 mb-4">
              <Image
                src={user?.imageUrl!}
                alt="User"
                width={128}
                height={128}
                className="size-full object-cover rounded-full"
              />
            </div>

            <h2 className="text-xl font-bold text-foreground">You</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {user
                ? (user.firstName + " " + (user.lastName || "")).trim()
                : "Guest"}
            </p>

            {/* User Ready Text */}
            <div
              className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border`}
            >
              <div className={`w-2 h-2 rounded-full bg-muted`} />
              <span className="text-xs text-muted-foreground">Ready</span>
            </div>
          </div>
        </Card>
      </div>

      {/* MESSAGE CONTAINER */}
      {message.length > 0 && (
        <div
          ref={messageContainer}
          className="w-full bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 mb-8 h-64 overflow-y-auto transition-all duration-300 scroll-smooth"
        >
          <div className="space-y-3">
            {message.map((msg, index) => (
              <div
                key={index}
                className="message-item animate-in fade-in duration-300"
              >
                <div className="font-semibold text-xs text-muted-foreground mb-1">
                  {msg.role === "assistant" ? "DentWise AI" : "You"}:
                </div>
                <p className="text-foreground">{msg.content}</p>
              </div>
            ))}

            {isCallEnded && (
              <div className="message-item animate-in fade-in duration-300">
                <div className="font-semibold text-xs text-primary mb-1">
                  System:
                </div>
                <p className="text-foreground">
                  Call ended. Thank you for using DentWise AI!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CALL CONTROLS */}
      <div className="w-full flex justify-center gap-4">
        <Button
          className={`w-44 text-xl rounded-3xl ${
            isCallActive
              ? "bg-destructive hover:bg-destructive/90"
              : "bg-primary hover:bg-primary/90"
          } text-white relative`}
          onClick={toggleCall}
          disabled={isConnecting}
        >
          {isConnecting && (
            <span className="absolute inset-0 rounded-full animate-ping bg-primary/50 opacity-75"></span>
          )}

          <span>
            {isCallActive
              ? "End Call"
              : isConnecting
              ? "Connecting..."
              : "Start Call"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default VapiWidget;
