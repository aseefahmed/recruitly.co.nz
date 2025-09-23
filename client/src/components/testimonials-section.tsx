import { useQuery } from "@tanstack/react-query";
import { Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Testimonial } from "@shared/schema";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index}
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="section-title-testimonials">
            Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from the professionals and companies who have transformed their careers and teams through our services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-4" />
                    ))}
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-20 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </Card>
            ))
          ) : testimonials ? (
            testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className={`p-8 ${index % 3 === 0 ? 'bg-gradient-to-br from-primary/5 to-accent/5' : index % 3 === 1 ? 'bg-gradient-to-br from-accent/5 to-secondary' : 'bg-gradient-to-br from-primary/5 to-secondary'} border-border`}
                data-testid={`testimonial-card-${index}`}
              >
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="flex" data-testid={`testimonial-rating-${index}`}>
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 italic" data-testid={`testimonial-quote-${index}`}>
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${index % 2 === 0 ? 'bg-primary/20' : 'bg-accent/20'} rounded-full flex items-center justify-center`}>
                      <User className={`${index % 2 === 0 ? 'text-primary' : 'text-accent'} h-6 w-6`} />
                    </div>
                    <div>
                      <div className="font-semibold" data-testid={`testimonial-name-${index}`}>
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground" data-testid={`testimonial-position-${index}`}>
                        {testimonial.position}
                      </div>
                      <div className="text-sm text-accent" data-testid={`testimonial-company-${index}`}>
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12" data-testid="no-testimonials-message">
              <h3 className="text-xl font-semibold mb-2">No testimonials available</h3>
              <p className="text-muted-foreground">Check back soon for success stories from our clients.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
