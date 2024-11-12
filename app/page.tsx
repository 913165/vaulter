'use client'
import { useState, useEffect } from 'react'

export default function SecretsManager() {
  const [secrets, setSecrets] = useState<Array<{name: string, value: string}>>([])
  const [newSecretName, setNewSecretName] = useState('')
  const [newSecretValue, setNewSecretValue] = useState('')
  const [error, setError] = useState('')
  
  useEffect(() => {
    fetchSecrets()
  }, [])

  const fetchSecrets = async () => {
    try {
      const response = await fetch('/api/secrets')
      const data = await response.json()
      if (data.secrets) {
        setSecrets(data.secrets)
      }
    } catch (error) {
      console.error('Error fetching secrets:', error)
      setError('Failed to fetch secrets')
    }
  }

  const addSecret = async () => {
    if (!newSecretName || !newSecretValue) {
      setError('Both name and value are required')
      return
    }

    try {
      const response = await fetch('/api/secrets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newSecretName,
          value: newSecretValue
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      setNewSecretName('')
      setNewSecretValue('')
      setError('')
      fetchSecrets()
    } catch (error) {
      console.error('Error adding secret:', error)
      setError('Failed to add secret')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Secret Manager</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Secret name"
          value={newSecretName}
          onChange={(e) => setNewSecretName(e.target.value)}
        />
        <input
          className="flex-1 p-2 border rounded"
          type="password"
          placeholder="Secret value"
          value={newSecretValue}
          onChange={(e) => setNewSecretValue(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          onClick={addSecret}
        >
          Add Secret
        </button>
      </div>
      
      <div className="space-y-2">
        {secrets.map((secret, index) => (
          <div key={index} className="border rounded p-4">
            <div className="font-medium">{secret.name}</div>
            <div className="text-sm text-gray-500">{secret.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}