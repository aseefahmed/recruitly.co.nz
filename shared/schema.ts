import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const jobs = pgTable("jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  salary: text("salary").notNull(),
  skills: text("skills").array().notNull(),
  experienceLevel: text("experience_level").notNull(),
  posted: timestamp("posted").defaultNow().notNull(),
});

export const jobSeekerInquiries = pgTable("job_seeker_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  specialization: text("specialization").notNull(),
  experience: text("experience").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const employerInquiries = pgTable("employer_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contactName: text("contact_name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  hiringNeed: text("hiring_need").notNull(),
  urgency: text("urgency").notNull(),
  requirements: text("requirements").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  position: text("position").notNull(),
  company: text("company").notNull(),
  quote: text("quote").notNull(),
  rating: integer("rating").notNull(),
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  posted: true,
});

export const insertJobSeekerInquirySchema = createInsertSchema(jobSeekerInquiries).omit({
  id: true,
  createdAt: true,
}).extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  specialization: z.enum(["Cloud Engineering", "Cybersecurity", "AI/Machine Learning", "Salesforce", "Other"], {
    required_error: "Please select a specialization"
  }),
  experience: z.string().min(1, "Please select an experience level"),
  message: z.string().min(1, "Please enter a message")
});

export const insertEmployerInquirySchema = createInsertSchema(employerInquiries).omit({
  id: true,
  createdAt: true,
}).extend({
  contactName: z.string().min(1, "Contact name is required"),
  company: z.string().min(1, "Company name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  hiringNeed: z.enum(["Cloud Engineers", "Cybersecurity Professionals", "AI/ML Engineers", "Salesforce Specialists", "Multiple Roles"], {
    required_error: "Please select what you're looking to hire"
  }),
  urgency: z.enum(["Immediate (1-2 weeks)", "Soon (3-4 weeks)", "Flexible (1-2 months)", "Strategic Planning (3+ months)"], {
    required_error: "Please select urgency level"
  }),
  requirements: z.string().min(1, "Please describe your requirements")
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type JobSeekerInquiry = typeof jobSeekerInquiries.$inferSelect;
export type InsertJobSeekerInquiry = z.infer<typeof insertJobSeekerInquirySchema>;
export type EmployerInquiry = typeof employerInquiries.$inferSelect;
export type InsertEmployerInquiry = z.infer<typeof insertEmployerInquirySchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
