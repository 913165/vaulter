export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-primary">
         About Vaulter
        </h1>
        <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
          Your trusted platform for secure password and sensitive information management.
          We provide military-grade encryption to keep your digital life safe.
        </p>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 bg-secondary/5">
        <h2 className="text-3xl font-semibold mb-8 text-center">Why Choose Vaulter?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-card shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Bank-Level Security</h3>
            <p className="text-muted-foreground">
              Advanced encryption protocols ensure your data remains protected at all times.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Easy Access</h3>
            <p className="text-muted-foreground">
              Access your secrets from anywhere, on any device, with our secure cloud storage.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Team Sharing</h3>
            <p className="text-muted-foreground">
              Securely share sensitive information with team members and manage access rights.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Commitment</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Since our founding, we've been dedicated to providing the most secure and user-friendly
            platform for managing sensitive information. Our team of security experts works
            tirelessly to keep your data protected.
          </p>
          <p className="text-lg text-muted-foreground">
            Trusted by thousands of individuals and businesses worldwide, Vaulter continues
            to evolve with the latest security standards and technologies.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-12 bg-secondary/5">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have questions? Our support team is here to help.
          </p>
          <a 
            href="mailto:support@vaulter.com" 
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}