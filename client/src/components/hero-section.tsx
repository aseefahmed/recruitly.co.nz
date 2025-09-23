import { Search, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const handleJobSeekerCTA = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEmployerCTA = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Connect Top <span className="text-primary">IT Talent</span> with Leading{" "}
              <span className="text-accent">Tech Companies</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Premier recruitment agency specializing in Cloud Engineering, Cybersecurity, AI/ML, and 
              Salesforce positions. We bridge the gap between exceptional talent and innovative companies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={handleJobSeekerCTA}
                className="bg-primary text-primary-foreground px-8 py-3 hover:bg-primary/90 font-semibold"
                data-testid="button-find-job"
              >
                <Search className="mr-2 h-5 w-5" />
                Find Your Dream Job
              </Button>
              <Button 
                variant="outline"
                onClick={handleEmployerCTA}
                className="bg-card text-foreground border-border px-8 py-3 hover:bg-secondary font-semibold"
                data-testid="button-hire-talent"
              >
                <Building className="mr-2 h-5 w-5" />
                Hire Top Talent
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary" data-testid="stat-candidates">2,500+</div>
                <div className="text-sm text-muted-foreground">Placed Candidates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent" data-testid="stat-companies">150+</div>
                <div className="text-sm text-muted-foreground">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary" data-testid="stat-success-rate">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional tech team collaboration" 
              className="rounded-2xl shadow-2xl w-full h-auto"
              data-testid="hero-image"
            />
            
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <i className="fas fa-trophy text-primary text-xl"></i>
                </div>
                <div>
                  <div className="font-semibold" data-testid="industry-leader-title">Industry Leader</div>
                  <div className="text-sm text-muted-foreground">5+ Years Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
