"use client"

import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { useSearchParams } from "next/navigation"

export default function TranslateContent() {

  const searchParams = useSearchParams()
  const original = searchParams.get("original") || ""
  const translated = searchParams.get("translated") || ""

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
            <h2 className="text-4xl text-white mb-6 leading-tight">Your professional translation is ready.</h2>
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
              <h2 className="text-3xl text-foreground">Translation Complete</h2>
              <p className="text-muted-foreground">Here is your professional translation</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="translation" className="text-sm font-medium text-foreground">
                  Your Translation:
                </Label>
                <Input
                  id="translation"
                  type="text"
                  value={translated}
                  placeholder="Your translated text will appear here..."
                  className="h-12 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3]"
                  readOnly
                />

                <Label htmlFor="translation" className="text-sm font-small text-foreground">
                  Your Original Phrase:
                </Label>
                <Input
                  id="translation"
                  type="text"
                  value={original}
                  placeholder="Your original..."
                  className="h-12 border-gray-200 focus:ring-0 shadow-none rounded-lg bg-white focus:border-[#3F3FF3]"
                  readOnly
                />

              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Have a look at the infrastructure under <a href="https://github.com/KhoiManos">github.com/KhoiManos</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
