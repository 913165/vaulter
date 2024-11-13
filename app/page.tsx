'use client'
export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">About Vaulter</h1>
      
      <div className="prose dark:prose-invert">
        <p>
          Vaulter is a secure secret management solution that helps you store and manage sensitive information like API keys, passwords, and other credentials.
        </p>
        
        <h2>Features</h2>
        <ul>
          <li>Secure storage of sensitive data</li>
          <li>Easy-to-use interface</li>
          <li>Role-based access control</li>
          <li>Audit logging</li>
        </ul>

        <h2>Security</h2>
        <p>
          All data is encrypted at rest and in transit. We use industry standard encryption protocols to ensure your secrets remain secure.
        </p>
      </div>
    </main>
  )
}