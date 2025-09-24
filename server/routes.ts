import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJobSeekerInquirySchema, insertEmployerInquirySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all jobs
  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = await storage.getJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  // Filter jobs
  app.get("/api/jobs/filter", async (req, res) => {
    try {
      const { category, experience, location } = req.query;
      let jobs = await storage.getJobs();

      if (category && category !== "All Technologies") {
        jobs = jobs.filter(job => job.category === category);
      }

      if (experience && experience !== "All Levels") {
        jobs = jobs.filter(job => job.experienceLevel === experience);
      }

      if (location && location !== "All Locations") {
        jobs = jobs.filter(job => job.location === location);
      }

      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to filter jobs" });
    }
  });

  // Get testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Submit job seeker inquiry
  app.post("/api/inquiries/job-seeker", async (req, res) => {
    try {
      const validatedData = insertJobSeekerInquirySchema.parse(req.body);
      const inquiry = await storage.createJobSeekerInquiry(validatedData);
      res.status(201).json({ 
        message: "Your inquiry has been submitted successfully! We'll contact you within 24 hours.",
        inquiry
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid form data",
          errors: error.errors 
        });
      } else {
        console.error("Error creating job seeker inquiry:", error);
        res.status(500).json({ message: "Failed to submit inquiry" });
      }
    }
  });

  // Submit employer inquiry
  app.post("/api/inquiries/employer", async (req, res) => {
    try {
      const validatedData = insertEmployerInquirySchema.parse(req.body);
      const inquiry = await storage.createEmployerInquiry(validatedData);
      res.status(201).json({ 
        message: "Your consultation request has been submitted! Our team will contact you within 24 hours.",
        inquiry
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid form data",
          errors: error.errors 
        });
      } else {
        console.error("Error creating job seeker inquiry:", error);
        res.status(500).json({ message: "Failed to submit inquiry" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
