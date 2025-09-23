import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Bus, Building, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertJobSeekerInquiry, InsertEmployerInquiry } from "@shared/schema";

export default function ContactSection() {
  const { toast } = useToast();
  
  const [jobSeekerForm, setJobSeekerForm] = useState<InsertJobSeekerInquiry>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialization: "Cloud Engineering",
    experience: "",
    message: ""
  });

  const [employerForm, setEmployerForm] = useState<InsertEmployerInquiry>({
    contactName: "",
    company: "",
    email: "",
    phone: "",
    hiringNeed: "Cloud Engineers",
    urgency: "Soon (3-4 weeks)",
    requirements: ""
  });

  const jobSeekerMutation = useMutation({
    mutationFn: (data: InsertJobSeekerInquiry) => 
      apiRequest("POST", "/api/inquiries/job-seeker", data),
    onSuccess: async (response) => {
      const result = await response.json();
      toast({
        title: "Application Submitted!",
        description: result.message,
      });
      setJobSeekerForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialization: "Cloud Engineering",
        experience: "",
        message: ""
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
    },
  });

  const employerMutation = useMutation({
    mutationFn: (data: InsertEmployerInquiry) => 
      apiRequest("POST", "/api/inquiries/employer", data),
    onSuccess: async (response) => {
      const result = await response.json();
      toast({
        title: "Consultation Requested!",
        description: result.message,
      });
      setEmployerForm({
        contactName: "",
        company: "",
        email: "",
        phone: "",
        hiringNeed: "Cloud Engineers",
        urgency: "Soon (3-4 weeks)",
        requirements: ""
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
    },
  });

  const handleJobSeekerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!jobSeekerForm.firstName || !jobSeekerForm.lastName || !jobSeekerForm.email || !jobSeekerForm.specialization) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    jobSeekerMutation.mutate(jobSeekerForm);
  };

  const handleEmployerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!employerForm.contactName || !employerForm.company || !employerForm.email || !employerForm.hiringNeed) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    employerMutation.mutate(employerForm);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-secondary/30 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="section-title-contact">
            Ready to Transform Your Career or Team?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with our expert recruiters today and discover opportunities that align with your goals
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Job Seeker Form */}
          <Card className="shadow-lg" data-testid="job-seeker-form">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Bus className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">For Job Seekers</h3>
                  <p className="text-muted-foreground">Find your next career opportunity</p>
                </div>
              </div>
              
              <form onSubmit={handleJobSeekerSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="First Name"
                    value={jobSeekerForm.firstName}
                    onChange={(e) => setJobSeekerForm(prev => ({ ...prev, firstName: e.target.value }))}
                    className="focus:ring-primary focus:border-primary"
                    data-testid="input-first-name"
                    required
                  />
                  <Input
                    placeholder="Last Name"
                    value={jobSeekerForm.lastName}
                    onChange={(e) => setJobSeekerForm(prev => ({ ...prev, lastName: e.target.value }))}
                    className="focus:ring-primary focus:border-primary"
                    data-testid="input-last-name"
                    required
                  />
                </div>
                
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={jobSeekerForm.email}
                  onChange={(e) => setJobSeekerForm(prev => ({ ...prev, email: e.target.value }))}
                  className="focus:ring-primary focus:border-primary"
                  data-testid="input-email"
                  required
                />
                
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={jobSeekerForm.phone}
                  onChange={(e) => setJobSeekerForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="focus:ring-primary focus:border-primary"
                  data-testid="input-phone"
                />
                
                <Select value={jobSeekerForm.specialization} onValueChange={(value) => setJobSeekerForm(prev => ({ ...prev, specialization: value }))}>
                  <SelectTrigger className="focus:ring-primary focus:border-primary" data-testid="select-specialization">
                    <SelectValue placeholder="Select Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cloud Engineering">Cloud Engineering</SelectItem>
                    <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="AI/Machine Learning">AI/Machine Learning</SelectItem>
                    <SelectItem value="Salesforce">Salesforce</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={jobSeekerForm.experience} onValueChange={(value) => setJobSeekerForm(prev => ({ ...prev, experience: value }))}>
                  <SelectTrigger className="focus:ring-primary focus:border-primary" data-testid="select-experience">
                    <SelectValue placeholder="Experience Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entry Level (0-2 years)">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="Mid Level (3-5 years)">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="Senior Level (6-10 years)">Senior Level (6-10 years)</SelectItem>
                    <SelectItem value="Expert Level (10+ years)">Expert Level (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Textarea
                  placeholder="Tell us about your career goals and what you're looking for..."
                  rows={4}
                  value={jobSeekerForm.message}
                  onChange={(e) => setJobSeekerForm(prev => ({ ...prev, message: e.target.value }))}
                  className="focus:ring-primary focus:border-primary resize-none"
                  data-testid="textarea-job-seeker-message"
                />
                
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                  disabled={jobSeekerMutation.isPending}
                  data-testid="button-submit-job-seeker"
                >
                  {jobSeekerMutation.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Application
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Employer Form */}
          <Card className="shadow-lg" data-testid="employer-form">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Building className="text-accent h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">For Employers</h3>
                  <p className="text-muted-foreground">Find exceptional IT talent</p>
                </div>
              </div>
              
              <form onSubmit={handleEmployerSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Contact Name"
                    value={employerForm.contactName}
                    onChange={(e) => setEmployerForm(prev => ({ ...prev, contactName: e.target.value }))}
                    className="focus:ring-accent focus:border-accent"
                    data-testid="input-contact-name"
                    required
                  />
                  <Input
                    placeholder="Company Name"
                    value={employerForm.company}
                    onChange={(e) => setEmployerForm(prev => ({ ...prev, company: e.target.value }))}
                    className="focus:ring-accent focus:border-accent"
                    data-testid="input-company-name"
                    required
                  />
                </div>
                
                <Input
                  type="email"
                  placeholder="Business Email"
                  value={employerForm.email}
                  onChange={(e) => setEmployerForm(prev => ({ ...prev, email: e.target.value }))}
                  className="focus:ring-accent focus:border-accent"
                  data-testid="input-business-email"
                  required
                />
                
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={employerForm.phone}
                  onChange={(e) => setEmployerForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="focus:ring-accent focus:border-accent"
                  data-testid="input-employer-phone"
                />
                
                <Select value={employerForm.hiringNeed} onValueChange={(value) => setEmployerForm(prev => ({ ...prev, hiringNeed: value }))}>
                  <SelectTrigger className="focus:ring-accent focus:border-accent" data-testid="select-hiring-need">
                    <SelectValue placeholder="What are you looking to hire?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cloud Engineers">Cloud Engineers</SelectItem>
                    <SelectItem value="Cybersecurity Professionals">Cybersecurity Professionals</SelectItem>
                    <SelectItem value="AI/ML Engineers">AI/ML Engineers</SelectItem>
                    <SelectItem value="Salesforce Specialists">Salesforce Specialists</SelectItem>
                    <SelectItem value="Multiple Roles">Multiple Roles</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={employerForm.urgency} onValueChange={(value) => setEmployerForm(prev => ({ ...prev, urgency: value }))}>
                  <SelectTrigger className="focus:ring-accent focus:border-accent" data-testid="select-urgency">
                    <SelectValue placeholder="How urgent is this hire?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Immediate (1-2 weeks)">Immediate (1-2 weeks)</SelectItem>
                    <SelectItem value="Soon (3-4 weeks)">Soon (3-4 weeks)</SelectItem>
                    <SelectItem value="Flexible (1-2 months)">Flexible (1-2 months)</SelectItem>
                    <SelectItem value="Strategic Planning (3+ months)">Strategic Planning (3+ months)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Textarea
                  placeholder="Describe your hiring needs, team size, and specific requirements..."
                  rows={4}
                  value={employerForm.requirements}
                  onChange={(e) => setEmployerForm(prev => ({ ...prev, requirements: e.target.value }))}
                  className="focus:ring-accent focus:border-accent resize-none"
                  data-testid="textarea-requirements"
                />
                
                <Button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                  disabled={employerMutation.isPending}
                  data-testid="button-submit-employer"
                >
                  {employerMutation.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Building className="mr-2 h-4 w-4" />
                      Request Consultation
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Contact Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 bg-card p-6 rounded-xl border border-border" data-testid="contact-info">
            <div className="flex items-center space-x-2">
              <i className="fas fa-phone text-primary"></i>
              <span className="font-medium">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-envelope text-accent"></i>
              <span className="font-medium">hello@techtalentpro.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-clock text-primary"></i>
              <span className="font-medium">Mon-Fri 9AM-6PM EST</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
