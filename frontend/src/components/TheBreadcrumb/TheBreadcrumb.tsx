import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const TheBreadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2">
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          )}
          <a
            href={item.href}
            className={`text-sm hover:text-blue-600 ${
              index === items.length - 1
                ? 'text-gray-900 font-medium'
                : 'text-gray-500'
            }`}
            onClick={(e) => 
              index === items.length - 1 ? e.preventDefault() : undefined
            }
          >
            {item.label}
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default TheBreadcrumb;