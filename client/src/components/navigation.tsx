import { useState } from "react";
import { Users, Menu, Cloud, Shield, Brain, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MegaMenu, SalesforceIcon } from "@/components/ui/megamenu";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const specializationItems = [
    {
      title: "Cloud Computing",
      description: "AWS, Azure, GCP expertise for scalable infrastructure and modern cloud solutions",
      icon: Cloud,
      link: "#services"
    },
    {
      title: "Cyber Security",
      description: "Security professionals for threat analysis, penetration testing, and compliance",
      icon: Shield,
      link: "#services"
    },
    {
      title: "AI/ML",
      description: "Machine learning engineers and data scientists for intelligent automation",
      icon: Brain,
      link: "#services"
    },
    {
      title: "Salesforce",
      description: "Certified developers and admins for CRM customization and implementation",
      icon: SalesforceIcon,
      link: "#services"
    },
    {
      title: "Data Analytics/Engineering",
      description: "Data pipeline architects and analysts for business intelligence solutions",
      icon: BarChart3,
      link: "#services"
    }
  ];

  const navItems = [
    { label: "Services", id: "services" },
    { label: "Jobs", id: "jobs" },
    { label: "About", id: "about" },
    { label: "Success Stories", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-primary" data-testid="logo-icon" />
            <span className="font-bold text-xl text-foreground" data-testid="company-name">
              TechTalent Pro
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <MegaMenu 
              title="Our Specializations" 
              items={specializationItems}
              className="relative"
              onItemClick={scrollToSection}
            />
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-primary hover:text-primary/80 font-medium"
              data-testid="button-signin"
            >
              Sign In
            </Button>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-post-job"
            >
              Post a Job
            </Button>
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="pb-4 border-b border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Our Specializations</h3>
                  <div className="space-y-3">
                    {specializationItems.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={index}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors w-full text-left"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('services');
                          }}
                        >
                          <IconComponent className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            {item.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-lg text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`mobile-nav-${item.id}`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 border-t border-border">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-primary hover:text-primary/80 font-medium mb-2"
                    data-testid="mobile-button-signin"
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="mobile-button-post-job"
                  >
                    Post a Job
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
