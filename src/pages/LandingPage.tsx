import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Shield, Zap, Clock, ChevronRight, Pill, ClipboardList, Users } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

interface LandingPageProps {
  onEnterApp: () => void
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <Pill className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">MedsCheck Forms</h1>
              <p className="text-xs text-muted-foreground">Ontario Pharmacy Documentation</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" disabled className="gap-2">
              <Shield className="h-4 w-4" />
              Login (Coming Soon)
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Streamline Your{' '}
            <span className="text-primary">MedsCheck</span>{' '}
            Documentation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete all 4 Ontario Government MedsCheck forms efficiently. 
            Fill once, generate professional PDFs, and download instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={onEnterApp} className="gap-2 text-lg px-8">
              Start Creating Forms <ChevronRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" disabled className="gap-2 text-lg px-8">
              <Shield className="h-5 w-5" />
              Sign In (Coming Soon)
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-center mb-8">Why Use MedsCheck Forms?</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <FileText className="h-10 w-10 text-primary mb-2" />
              <CardTitle className="text-lg">4 Complete Forms</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                All Ontario MedsCheck forms in one place - Healthcare Provider Notification, 
                Patient Acknowledgement, Personal Medication Record, and Pharmacist Worksheet.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle className="text-lg">Smart Auto-Fill</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Patient and pharmacy information syncs across all forms automatically. 
                Fill once, use everywhere.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <Clock className="h-10 w-10 text-primary mb-2" />
              <CardTitle className="text-lg">Auto-Save</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your work is automatically saved to your browser. 
                Come back anytime and pick up where you left off.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <ClipboardList className="h-10 w-10 text-primary mb-2" />
              <CardTitle className="text-lg">PDF Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Generate professional, government-formatted PDFs instantly. 
                Preview and download with a single click.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Forms Overview */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Included Forms</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-background rounded-lg p-6 border">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white font-bold rounded-lg w-10 h-10 flex items-center justify-center shrink-0">1</div>
                <div>
                  <h4 className="font-semibold mb-1">Healthcare Provider Notification</h4>
                  <p className="text-sm text-muted-foreground">
                    Notify the patient's primary care provider about the MedsCheck service and medication review findings.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-lg p-6 border">
              <div className="flex items-start gap-4">
                <div className="bg-green-500 text-white font-bold rounded-lg w-10 h-10 flex items-center justify-center shrink-0">2</div>
                <div>
                  <h4 className="font-semibold mb-1">Patient Acknowledgement</h4>
                  <p className="text-sm text-muted-foreground">
                    Document patient consent and acknowledgement of the MedsCheck service provided.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-lg p-6 border">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500 text-white font-bold rounded-lg w-10 h-10 flex items-center justify-center shrink-0">3</div>
                <div>
                  <h4 className="font-semibold mb-1">Personal Medication Record</h4>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive list of all patient medications including prescriptions, OTCs, and natural health products.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-lg p-6 border">
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 text-white font-bold rounded-lg w-10 h-10 flex items-center justify-center shrink-0">4</div>
                <div>
                  <h4 className="font-semibold mb-1">Pharmacist Worksheet</h4>
                  <p className="text-sm text-muted-foreground">
                    Detailed 4-page worksheet for pharmacist documentation including clinical assessment and therapeutic issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto border-2 border-dashed">
          <CardHeader className="text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <CardTitle>User Accounts Coming Soon</CardTitle>
            <CardDescription className="text-base">
              We're working on secure user authentication with the following features:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Secure login with email/password
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Cloud storage for your form data
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Access your forms from any device
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Patient history and form archives
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                AI-powered clinical notes extraction
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>MedsCheck Forms — Built for Ontario Pharmacies</p>
          <p className="mt-1">Forms based on Ontario Government MedsCheck Program requirements</p>
        </div>
      </footer>
    </div>
  )
}
