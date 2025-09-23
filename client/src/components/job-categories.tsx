import { Cloud, Shield, Brain, Bus, ArrowRight } from "lucide-react";

export default function JobCategories() {
  const categories = [
    {
      icon: Cloud,
      title: "Cloud Engineer",
      description: "Design, implement, and manage scalable cloud infrastructure on AWS, Azure, and GCP platforms.",
      skills: ["AWS", "Azure", "Kubernetes"],
      openPositions: "45+ Open Positions",
      gradient: "from-primary/5 to-accent/5",
      iconBg: "bg-primary/10 group-hover:bg-primary/20",
      iconColor: "text-primary"
    },
    {
      icon: Shield,
      title: "Cybersecurity Engineer",
      description: "Protect organizations from cyber threats through advanced security architecture and incident response.",
      skills: ["CISSP", "Penetration Testing", "SOC"],
      openPositions: "32+ Open Positions",
      gradient: "from-accent/5 to-primary/5",
      iconBg: "bg-accent/10 group-hover:bg-accent/20",
      iconColor: "text-accent"
    },
    {
      icon: Brain,
      title: "AI/ML Engineer",
      description: "Build intelligent systems and machine learning models that drive innovation and business value.",
      skills: ["Python", "TensorFlow", "PyTorch"],
      openPositions: "28+ Open Positions",
      gradient: "from-primary/5 to-secondary",
      iconBg: "bg-primary/10 group-hover:bg-primary/20",
      iconColor: "text-primary"
    },
    {
      icon: Bus,
      title: "Salesforce Specialist",
      description: "Implement and customize Salesforce solutions to optimize customer relationships and business processes.",
      skills: ["Admin", "Developer", "Architect"],
      openPositions: "38+ Open Positions",
      gradient: "from-accent/5 to-secondary",
      iconBg: "bg-accent/10 group-hover:bg-accent/20",
      iconColor: "text-accent"
    }
  ];

  return (
    <section id="jobs" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="section-title-categories">
            Featured IT Specializations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We specialize in connecting exceptional talent with leading companies across these high-demand technology sectors
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.title}
                className={`bg-gradient-to-br ${category.gradient} p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300 group cursor-pointer`}
                data-testid={`card-category-${index}`}
              >
                <div className={`w-16 h-16 ${category.iconBg} rounded-xl flex items-center justify-center mb-6 transition-colors`}>
                  <IconComponent className={`${category.iconColor} h-8 w-8`} />
                </div>
                <h3 className="text-xl font-bold mb-3" data-testid={`category-title-${index}`}>
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-4" data-testid={`category-description-${index}`}>
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skill}
                      className={`${category.iconColor === 'text-primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'} text-xs px-3 py-1 rounded-full`}
                      data-testid={`skill-${index}-${skillIndex}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-accent" data-testid={`positions-count-${index}`}>
                    {category.openPositions}
                  </span>
                  <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
