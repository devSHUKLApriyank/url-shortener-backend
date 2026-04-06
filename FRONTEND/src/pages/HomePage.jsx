import { useState } from 'react'
import { UrlForm } from '../components/UrlForm'

export function HomePage() {
  const [shortUrl, setShortUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          URL Shortener
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Make your long URLs shorter and shareable
        </p>

        <UrlForm onShortUrlGenerated={setShortUrl} />

        {shortUrl && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Your short URL:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded text-sm focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}