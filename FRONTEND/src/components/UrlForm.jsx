import { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'

export function UrlForm({ onShortUrlGenerated }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { shortUrl } = await createShortUrl({ url })  // ✅ capital U
      onShortUrlGenerated(shortUrl)
    } catch (err) {
      setError(err.response?.data?.message ?? 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)  // ✅ always resets
    }
  }

  // ... rest of JSX unchanged


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your URL here..."
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
      >
        {loading ? 'Creating...' : 'Shorten URL'}
      </button>
    </form>
  )
}