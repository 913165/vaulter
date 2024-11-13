'use client'

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from  "@/components/ui/header"

type Secret = {
  name: string
  value: string
}

export default function SecretsPage() {
  const [secrets, setSecrets] = useState<Secret[]>([])
  const [newSecret, setNewSecret] = useState({ name: '', value: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSecrets()
  }, [])

  async function fetchSecrets() {
    try {
      const response = await fetch('/api/secrets')
      const data = await response.json()
      setSecrets(data.secrets)
    } catch (error) {
      console.error('Error fetching secrets:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/secrets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSecret),
      })

      if (response.ok) {
        setNewSecret({ name: '', value: '' })
        fetchSecrets()
      }
    } catch (error) {
      console.error('Error adding secret:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Manage Secrets</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Secret</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Secret Name</Label>
                  <Input
                    id="name"
                    value={newSecret.name}
                    onChange={(e) => setNewSecret(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="API_KEY"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="value">Secret Value</Label>
                  <Input
                    id="value"
                    type="password"
                    value={newSecret.value}
                    onChange={(e) => setNewSecret(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="Enter secret value"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Add Secret
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Secrets</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading secrets...</p>
              ) : secrets.length === 0 ? (
                <p className="text-muted-foreground">No secrets stored yet.</p>
              ) : (
                <div className="space-y-4">
                  {secrets.map((secret) => (
                    <div key={secret.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <span className="font-mono">{secret.name}</span>
                      <span className="font-mono">••••••••</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}