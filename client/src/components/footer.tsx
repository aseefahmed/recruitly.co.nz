import { Users } from "lucide-react";

export default function Footer() {
  const services = [
    "Executive Search",
    "Contract Staffing", 
    "Team Augmentation",
    "Talent Consulting",
    "Salary Benchmarking"
  ];

  const specializations = [
    "Cloud Engineering",
    "Cybersecurity",
    "AI/Machine Learning", 
    "Salesforce",
    "DevOps"
  ];

  const socialLinks = [
    { platform: "LinkedIn", icon: "fab fa-linkedin", href: "#" },
    { platform: "Twitter", icon: "fab fa-twitter", href: "#" },
    { platform: "Facebook", icon: "fab fa-facebook", href: "#" },
    { platform: "Instagram", icon: "fab fa-instagram", href: "#" }
  ];

  return (
    <footer className="bg-foreground text-background py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Users className="h-8 w-8 text-primary" data-testid="footer-logo" />
              <span className="font-bold text-xl" data-testid="footer-company-name">TechTalent Pro</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md" data-testid="footer-description">
              Premier IT recruitment agency connecting exceptional technology professionals with leading companies across North America.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.platform}
                  href={social.href}
                  className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors"
                  data-testid={`social-link-${social.platform.toLowerCase()}`}
                  aria-label={`Follow us on ${social.platform}`}
                >
                  <i className={`${social.icon} text-primary`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4" data-testid="footer-services-title">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              {services.map((service, index) => (
                <li key={service}>
                  <a 
                    href="#" 
                    className="hover:text-background transition-colors"
                    data-testid={`footer-service-${index}`}
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4" data-testid="footer-specializations-title">Specializations</h3>
            <ul className="space-y-2 text-muted-foreground">
              {specializations.map((specialization, index) => (
                <li key={specialization}>
                  <a 
                    href="#" 
                    className="hover:text-background transition-colors"
                    data-testid={`footer-specialization-${index}`}
                  >
                    {specialization}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-muted-foreground/20 mt-12 pt-8 text-center text-muted-foreground">
          <p data-testid="footer-copyright">
            &copy; 2024 TechTalent Pro. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
