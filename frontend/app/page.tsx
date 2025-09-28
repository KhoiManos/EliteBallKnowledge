"use client"

import { useState } from "react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"

import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [currentView, setCurrentView] = useState<"login" | "register" | "forgot">("login")
  const [user_input, setUserInput] = useState("")
  const router = useRouter()

  const handleSubmit = async () => {
  if (!user_input.trim()) {
    alert("Bitte Text eingeben");
    return;
  }

  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ textInput: user_input }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Serverfehler: ${res.status}`);
    }

    const data = await res.json();
    
    // Prüfe auf Fehler von der API
    if (data.error) {
      alert(`Fehler: ${data.error}`);
      return;
    }

    router.push(`/translate?original=${encodeURIComponent(data.original)}&translated=${encodeURIComponent(data.translated)}`)
  } catch (error) {
    console.error("Fehler:", error);
    alert(`Verbindungsfehler: ${error instanceof Error ? error.message : "Unbekannter Fehler"}`);
  }
  };

  return (
    <div className="min-h-screen flex font-sans">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ backgroundColor: "#3F3FF3" }}>
        <div className="relative z-10 flex flex-col justify-between w-full px-12 py-12">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
              <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#3F3FF3" }}></div>
            </div>
            <h1 className="text-xl font-semibold text-white">Elite Ball Knowledge</h1>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl text-white mb-6 leading-tight">
              Effortlessly translate your Brain Rot language into professional sentences.
            </h2>
          </div>

          <div className="flex justify-between items-center text-white/70 text-sm">
            <span>
              <a href="https://github.com/KhoiManos">Project under github.com/KhoiManos</a>
            </span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden text-center mb-8">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: "#3F3FF3" }}
            >
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-xl font-semibold text-foreground">Khoi</h1>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 text-center">
              
              <h2 className="text-3xl text-foreground">
                {currentView === "login" && "Welcome to Elite Ball Knowledge"}
              </h2>
              <p className="text-muted-foreground">
                {currentView === "login" && "Translate Brain-Rot expressions into professional language"}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Brain Rot Language Input:
                </Label>
                <Input
                  id="user_input"
                  type="email"
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Example: You are a Sigma"
                  className="h-12 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3]"
                />
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              
              className="w-full h-12 text-sm font-medium text-white hover:opacity-90 rounded-lg shadow-none cursor-pointer"
              style={{ backgroundColor: "#3F3FF3" }}
            >
              {currentView === "login" && "Enter"}
              
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              {currentView === "login" && (
                <>
                  Have a look at the infrastructure under{" "}
                  <a href="https://github.com/KhoiManos">github.com/KhoiManos</a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
