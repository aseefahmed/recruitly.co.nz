import { Search, Handshake, Users, TrendingUp } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Search,
      title: "Talent Sourcing & Screening",
      description: "Advanced sourcing strategies and rigorous technical screening to identify candidates who match your exact requirements and company culture.",
      iconBg: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      icon: Handshake,
      title: "Executive Search",
      description: "Specialized executive recruitment for senior technology leadership positions including CTOs, VPs of Engineering, and technical directors.",
      iconBg: "bg-accent/10",
      iconColor: "text-accent"
    },
    {
      icon: Users,
      title: "Team Augmentation",
      description: "Scalable team augmentation services to help you rapidly expand your technical capabilities with pre-vetted professionals.",
      iconBg: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Comprehensive salary benchmarking, market insights, and competitive intelligence to inform your hiring strategy.",
      iconBg: "bg-accent/10",
      iconColor: "text-accent"
    }
  ];

  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="section-title-services">
            Our Recruitment Excellence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive recruitment services tailored for the technology sector with proven methodologies and industry expertise
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="space-y-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={service.title} className="flex items-start space-x-4" data-testid={`service-item-${index}`}>
                    <div className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`${service.iconColor} h-6 w-6`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2" data-testid={`service-title-${index}`}>
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground" data-testid={`service-description-${index}`}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional recruitment consultation" 
              className="rounded-2xl shadow-xl w-full h-auto"
              data-testid="services-image"
            />
            
            <div className="absolute -top-6 -right-6 bg-card p-4 rounded-xl shadow-lg border border-border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium" data-testid="live-matching-indicator">Live Matching</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
