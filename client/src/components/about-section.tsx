import { Award, Network, Rocket } from "lucide-react";

export default function AboutSection() {
  const achievements = [
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Award-winning recruitment firm recognized by TechCrunch and Forbes",
      iconBg: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      icon: Network,
      title: "Extensive Network",
      description: "Over 10,000 vetted professionals in our talent network",
      iconBg: "bg-accent/10",
      iconColor: "text-accent"
    },
    {
      icon: Rocket,
      title: "Fast Placement",
      description: "Average placement time of 21 days for qualified positions",
      iconBg: "bg-primary/10",
      iconColor: "text-primary"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="about-title">
              Leading IT Recruitment Since 2019
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="about-description">
              TechTalent Pro has established itself as the premier recruitment partner for technology companies across North America. Our deep understanding of the IT landscape, combined with our proven methodologies, ensures exceptional results for both candidates and employers.
            </p>
            
            <div className="space-y-6">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={achievement.title} className="flex items-center space-x-4" data-testid={`achievement-item-${index}`}>
                    <div className={`w-12 h-12 ${achievement.iconBg} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`${achievement.iconColor} h-6 w-6`} />
                    </div>
                    <div>
                      <h3 className="font-semibold" data-testid={`achievement-title-${index}`}>
                        {achievement.title}
                      </h3>
                      <p className="text-muted-foreground" data-testid={`achievement-description-${index}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="space-y-8">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional recruitment team in modern office" 
              className="rounded-2xl shadow-xl w-full h-auto"
              data-testid="about-image"
            />
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-xl border border-border" data-testid="stat-experience">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Years of Excellence</div>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border" data-testid="stat-recruiters">
                <div className="text-3xl font-bold text-accent mb-2">25</div>
                <div className="text-sm text-muted-foreground">Certified Recruiters</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
