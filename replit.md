# Overview

TechTalent Pro is a modern IT recruitment platform built with React frontend and Express backend. The application serves as a comprehensive job board and recruitment service, specializing in technology positions across Cloud Engineering, Cybersecurity, AI/Machine Learning, and Salesforce domains. The platform facilitates connections between job seekers and employers through job listings, inquiry forms, testimonials, and detailed service offerings.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite for development and building
- **Routing**: Client-side routing with Wouter library for lightweight navigation
- **State Management**: TanStack React Query for server state management and API caching
- **UI Components**: Radix UI primitives with custom shadcn/ui components for consistent design system
- **Styling**: Tailwind CSS with CSS custom properties for theming and responsive design
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development Server**: Custom Vite integration for development with HMR support
- **Data Storage**: In-memory storage implementation with interface abstraction for future database integration
- **API Design**: RESTful endpoints with JSON responses and proper error handling

## Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL with Neon serverless database
- **Schema**: Structured tables for jobs, job seeker inquiries, employer inquiries, and testimonials
- **Migrations**: Drizzle Kit for schema migrations and database management
- **Data Validation**: Zod schemas for runtime type checking and API validation

## Component Architecture
- **Design System**: Modular component library with consistent styling and behavior
- **Layout Structure**: Section-based page components with navigation and footer
- **State Management**: Centralized query client with optimistic updates and error boundaries
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## Development Workflow
- **Build System**: Vite for frontend bundling and esbuild for backend compilation
- **Development**: Hot module replacement and runtime error handling
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Path Aliases**: Configured import aliases for clean code organization

# External Dependencies

## UI and Styling
- **Radix UI**: Comprehensive primitive components for accessibility and functionality
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe component variant management

## Data and State
- **TanStack React Query**: Server state management with caching and synchronization
- **React Hook Form**: Form state management with validation integration
- **Zod**: Schema validation for type safety and runtime checking
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL support

## Database and Hosting
- **Neon Database**: Serverless PostgreSQL database solution
- **Connect PG Simple**: PostgreSQL session store for Express sessions
- **Date-fns**: Date manipulation and formatting utilities

## Development Tools
- **Vite**: Frontend build tool with development server capabilities
- **esbuild**: Fast JavaScript bundler for backend compilation
- **TypeScript**: Static typing for enhanced development experience
- **Wouter**: Lightweight client-side routing solution