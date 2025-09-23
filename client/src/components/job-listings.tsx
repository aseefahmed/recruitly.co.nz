import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, MapPin, Clock, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Job } from "@shared/schema";

export default function JobListings() {
  const [filters, setFilters] = useState({
    category: "All Technologies",
    experience: "All Levels",
    location: "All Locations"
  });

  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ['/api/jobs/filter', filters.category, filters.experience, filters.location],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.category !== "All Technologies") params.append('category', filters.category);
      if (filters.experience !== "All Levels") params.append('experience', filters.experience);
      if (filters.location !== "All Locations") params.append('location', filters.location);
      
      const response = await fetch(`/api/jobs/filter?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      return response.json();
    }
  });

  const applyFilters = () => {
    // Filters are applied automatically via the query key dependency
  };

  const viewJobDetails = (jobId: string) => {
    // Implementation for viewing job details
    console.log('View job details for:', jobId);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Cloud Engineering":
        return "☁️";
      case "Cybersecurity":
        return "🛡️";
      case "AI/Machine Learning":
        return "🧠";
      case "Salesforce":
        return "👔";
      default:
        return "💼";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
  };

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="section-title-jobs">
            Latest Opportunities
          </h2>
          <p className="text-xl text-muted-foreground">
            Explore our current openings across various technology specializations
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-muted/50 p-6 rounded-xl mb-12" data-testid="job-filters">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
              <SelectTrigger data-testid="filter-category">
                <SelectValue placeholder="All Technologies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Technologies">All Technologies</SelectItem>
                <SelectItem value="Cloud Engineering">Cloud Engineering</SelectItem>
                <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                <SelectItem value="AI/Machine Learning">AI/Machine Learning</SelectItem>
                <SelectItem value="Salesforce">Salesforce</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filters.experience} onValueChange={(value) => setFilters(prev => ({ ...prev, experience: value }))}>
              <SelectTrigger data-testid="filter-experience">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Levels">All Levels</SelectItem>
                <SelectItem value="Entry Level (0-2 years)">Entry Level (0-2 years)</SelectItem>
                <SelectItem value="Mid Level (3-5 years)">Mid Level (3-5 years)</SelectItem>
                <SelectItem value="Senior Level (6-10 years)">Senior Level (6-10 years)</SelectItem>
                <SelectItem value="Expert Level (10+ years)">Expert Level (10+ years)</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
              <SelectTrigger data-testid="filter-location">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Locations">All Locations</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="San Francisco">San Francisco</SelectItem>
                <SelectItem value="Austin">Austin</SelectItem>
                <SelectItem value="Boston">Boston</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              onClick={applyFilters}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-search-jobs"
            >
              <Search className="mr-2 h-4 w-4" />
              Search Jobs
            </Button>
          </div>
        </div>
        
        {/* Job Cards */}
        <div className="space-y-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div>
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-16" />
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </Card>
            ))
          ) : jobs && jobs.length > 0 ? (
            jobs.map((job, index) => (
              <Card 
                key={job.id} 
                className="p-6 hover:shadow-lg transition-all duration-300"
                data-testid={`job-card-${index}`}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl">
                        {getCategoryIcon(job.category)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold" data-testid={`job-title-${index}`}>
                          {job.title}
                        </h3>
                        <p className="text-muted-foreground" data-testid={`job-company-${index}`}>
                          {job.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                      <Badge variant="secondary" data-testid={`job-type-${index}`}>
                        {job.type}
                      </Badge>
                      <Badge variant="outline" data-testid={`job-location-${index}`}>
                        <MapPin className="mr-1 h-3 w-3" />
                        {job.location}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4" data-testid={`job-description-${index}`}>
                    {job.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skill}
                        variant="secondary"
                        className="bg-muted text-muted-foreground"
                        data-testid={`job-skill-${index}-${skillIndex}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center" data-testid={`job-salary-${index}`}>
                        <DollarSign className="mr-1 h-4 w-4" />
                        {job.salary}
                      </span>
                      <span className="flex items-center" data-testid={`job-posted-${index}`}>
                        <Clock className="mr-1 h-4 w-4" />
                        {formatTimeAgo(job.posted)}
                      </span>
                    </div>
                    <Button 
                      variant="ghost"
                      onClick={() => viewJobDetails(job.id)}
                      className="text-primary hover:text-primary/80 font-medium"
                      data-testid={`button-view-details-${index}`}
                    >
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12" data-testid="no-jobs-message">
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more opportunities.</p>
            </div>
          )}
        </div>
        
        {jobs && jobs.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              className="bg-primary text-primary-foreground px-8 py-3 hover:bg-primary/90 font-semibold"
              data-testid="button-load-more"
            >
              Load More Opportunities
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
