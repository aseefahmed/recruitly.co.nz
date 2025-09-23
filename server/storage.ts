import { 
  type Job, 
  type InsertJob,
  type JobSeekerInquiry,
  type InsertJobSeekerInquiry,
  type EmployerInquiry,
  type InsertEmployerInquiry,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Jobs
  getJobs(): Promise<Job[]>;
  getJobsByCategory(category: string): Promise<Job[]>;
  getJobsByExperience(experienceLevel: string): Promise<Job[]>;
  getJobsByLocation(location: string): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  
  // Job Seeker Inquiries
  createJobSeekerInquiry(inquiry: InsertJobSeekerInquiry): Promise<JobSeekerInquiry>;
  getJobSeekerInquiries(): Promise<JobSeekerInquiry[]>;
  
  // Employer Inquiries
  createEmployerInquiry(inquiry: InsertEmployerInquiry): Promise<EmployerInquiry>;
  getEmployerInquiries(): Promise<EmployerInquiry[]>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private jobs: Map<string, Job>;
  private jobSeekerInquiries: Map<string, JobSeekerInquiry>;
  private employerInquiries: Map<string, EmployerInquiry>;
  private testimonials: Map<string, Testimonial>;

  constructor() {
    this.jobs = new Map();
    this.jobSeekerInquiries = new Map();
    this.employerInquiries = new Map();
    this.testimonials = new Map();
    
    // Initialize with some sample jobs and testimonials
    this.initializeData();
  }

  private async initializeData() {
    // Sample jobs
    const sampleJobs: InsertJob[] = [
      {
        title: "Senior Cloud Engineer",
        company: "TechCorp Solutions",
        location: "Remote",
        type: "Full-time",
        category: "Cloud Engineering",
        description: "Design and implement scalable cloud infrastructure solutions using AWS and Kubernetes. Lead migration projects and optimize system performance.",
        salary: "$120k - $150k",
        skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
        experienceLevel: "Senior Level (6-10 years)"
      },
      {
        title: "Cybersecurity Analyst",
        company: "SecureNet Inc.",
        location: "New York",
        type: "Full-time",
        category: "Cybersecurity",
        description: "Monitor security incidents, conduct threat analysis, and implement security measures to protect organizational assets and data.",
        salary: "$95k - $120k",
        skills: ["SIEM", "Incident Response", "Penetration Testing", "Risk Assessment"],
        experienceLevel: "Mid Level (3-5 years)"
      },
      {
        title: "ML Engineer",
        company: "AI Innovations Lab",
        location: "San Francisco",
        type: "Full-time",
        category: "AI/Machine Learning",
        description: "Develop and deploy machine learning models at scale. Work with large datasets and implement MLOps practices for production systems.",
        salary: "$140k - $180k",
        skills: ["Python", "TensorFlow", "MLOps", "Kubernetes"],
        experienceLevel: "Senior Level (6-10 years)"
      },
      {
        title: "Salesforce Developer",
        company: "Enterprise Solutions Corp",
        location: "Austin",
        type: "Full-time",
        category: "Salesforce",
        description: "Customize and develop Salesforce solutions including Apex, Lightning components, and integrations with third-party systems.",
        salary: "$100k - $130k",
        skills: ["Apex", "Lightning", "Salesforce Admin", "Integration"],
        experienceLevel: "Mid Level (3-5 years)"
      },
      {
        title: "Cloud Security Engineer",
        company: "CloudGuard Technologies",
        location: "Remote",
        type: "Full-time",
        category: "Cybersecurity",
        description: "Design and implement security controls for cloud environments. Ensure compliance and conduct security assessments.",
        salary: "$130k - $160k",
        skills: ["AWS Security", "IAM", "Compliance", "Security Architecture"],
        experienceLevel: "Senior Level (6-10 years)"
      },
      {
        title: "Junior Data Scientist",
        company: "DataTech Solutions",
        location: "Boston",
        type: "Full-time",
        category: "AI/Machine Learning",
        description: "Support data science projects, build predictive models, and assist in data analysis and visualization tasks.",
        salary: "$75k - $95k",
        skills: ["Python", "Pandas", "Scikit-learn", "SQL"],
        experienceLevel: "Entry Level (0-2 years)"
      }
    ];

    for (const job of sampleJobs) {
      await this.createJob(job);
    }

    // Sample testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Sarah Chen",
        position: "Senior Cloud Engineer",
        company: "Microsoft",
        quote: "TechTalent Pro helped me transition from a traditional IT role to a cloud engineer position at a Fortune 500 company. Their guidance throughout the process was exceptional.",
        rating: 5
      },
      {
        name: "Michael Rodriguez",
        position: "VP of Engineering",
        company: "TechStart Inc.",
        quote: "We needed to scale our cybersecurity team rapidly. TechTalent Pro delivered 8 qualified candidates within 3 weeks. Exceptional service and results.",
        rating: 5
      },
      {
        name: "Dr. Priya Patel",
        position: "ML Research Scientist",
        company: "Google AI",
        quote: "The AI/ML opportunities they presented were exactly what I was looking for. Professional, knowledgeable, and truly invested in finding the right fit.",
        rating: 5
      }
    ];

    for (const testimonial of sampleTestimonials) {
      await this.createTestimonial(testimonial);
    }
  }

  async getJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values()).sort((a, b) => 
      new Date(b.posted).getTime() - new Date(a.posted).getTime()
    );
  }

  async getJobsByCategory(category: string): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => 
      job.category === category
    );
  }

  async getJobsByExperience(experienceLevel: string): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => 
      job.experienceLevel === experienceLevel
    );
  }

  async getJobsByLocation(location: string): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => 
      job.location === location
    );
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = randomUUID();
    const job: Job = { 
      ...insertJob, 
      id, 
      posted: new Date()
    };
    this.jobs.set(id, job);
    return job;
  }

  async createJobSeekerInquiry(insertInquiry: InsertJobSeekerInquiry): Promise<JobSeekerInquiry> {
    const id = randomUUID();
    const inquiry: JobSeekerInquiry = { 
      ...insertInquiry, 
      id, 
      createdAt: new Date()
    };
    this.jobSeekerInquiries.set(id, inquiry);
    return inquiry;
  }

  async getJobSeekerInquiries(): Promise<JobSeekerInquiry[]> {
    return Array.from(this.jobSeekerInquiries.values());
  }

  async createEmployerInquiry(insertInquiry: InsertEmployerInquiry): Promise<EmployerInquiry> {
    const id = randomUUID();
    const inquiry: EmployerInquiry = { 
      ...insertInquiry, 
      id, 
      createdAt: new Date()
    };
    this.employerInquiries.set(id, inquiry);
    return inquiry;
  }

  async getEmployerInquiries(): Promise<EmployerInquiry[]> {
    return Array.from(this.employerInquiries.values());
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
