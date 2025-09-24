import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpecializationItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link?: string;
}

interface MegaMenuProps {
  title: string;
  items: SpecializationItem[];
  className?: string;
  onItemClick?: (sectionId: string) => void;
}

export function MegaMenu({ title, items, className, onItemClick }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Close menu on Escape key or outside click, handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          setFocusedIndex(-1);
          triggerRef.current?.focus();
          break;
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex(prev => {
            const next = prev < items.length ? prev + 1 : 0;
            itemRefs.current[next]?.focus();
            return next;
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex(prev => {
            const next = prev <= 0 ? items.length : prev - 1;
            itemRefs.current[next]?.focus();
            return next;
          });
          break;
        case "Home":
          event.preventDefault();
          setFocusedIndex(0);
          itemRefs.current[0]?.focus();
          break;
        case "End":
          event.preventDefault();
          setFocusedIndex(items.length);
          itemRefs.current[items.length]?.focus();
          break;
        case "Tab":
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      // Close menu if focus moves outside the menu container
      if (menuRef.current && !menuRef.current.contains(event.relatedTarget as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      menuRef.current?.addEventListener("focusout", handleFocusOut);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      menuRef.current?.removeEventListener("focusout", handleFocusOut);
    };
  }, [isOpen, items.length]);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (newIsOpen) {
      // Focus first item when opening
      setTimeout(() => {
        setFocusedIndex(0);
        itemRefs.current[0]?.focus();
      }, 0);
    } else {
      setFocusedIndex(-1);
    }
  };

  const handleItemClick = (event: React.MouseEvent, item: SpecializationItem, index: number) => {
    event.preventDefault();
    setIsOpen(false);
    setFocusedIndex(-1);
    if (onItemClick) {
      onItemClick('services');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  };

  const handleMouseEnter = () => {
    if (!isOpen) {
      setIsOpen(true);
      setFocusedIndex(-1);
    }
  };

  const handleMouseLeave = () => {
    // Only close on mouse leave if no item is focused
    if (focusedIndex === -1) {
      setIsOpen(false);
    }
  };

  return (
    <div 
      ref={menuRef}
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerRef}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        data-testid="megamenu-trigger"
      >
        <span>{title}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-lg z-50 p-6"
          role="menu"
          aria-label={title}
        >
          <div className="grid grid-cols-1 gap-4">
            {items.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  ref={(el) => itemRefs.current[index] = el}
                  onClick={(e) => handleItemClick(e, item, index)}
                  onFocus={() => setFocusedIndex(index)}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors group cursor-pointer text-left w-full"
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                  data-testid={`megamenu-item-${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  <div className="flex-shrink-0">
                    <IconComponent className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <button
              ref={(el) => itemRefs.current[items.length] = el}
              onClick={(e) => handleItemClick(e, { title: "View all", description: "", icon: () => null }, items.length)}
              onFocus={() => setFocusedIndex(items.length)}
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded transition-colors"
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
              data-testid="megamenu-view-all"
            >
              View all specializations
              <ChevronDown className="ml-1 h-4 w-4 rotate-[-90deg]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Custom Salesforce icon component since lucide doesn't have one
function SalesforceIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.8 8.4c-.3-1.6-1.7-2.8-3.4-2.8-1.1 0-2.1.5-2.7 1.4-.4-.2-.8-.3-1.3-.3-1.7 0-3.1 1.4-3.1 3.1 0 .2 0 .4.1.6C3.6 10.9 3 11.9 3 13c0 1.7 1.4 3.1 3.1 3.1h8.4c1.4 0 2.5-1.1 2.5-2.5 0-1.2-.8-2.2-2-2.4 0-.3.1-.5.1-.8 0-1.1-.5-2.1-1.3-2.8l1-.2z"/>
    </svg>
  );
}

export { SalesforceIcon };