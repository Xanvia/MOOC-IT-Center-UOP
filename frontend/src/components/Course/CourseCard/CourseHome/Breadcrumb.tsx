import Link from 'next/link';
import React from 'react';

// components/Breadcrumb.tsx
interface BreadcrumbItem {
    breadcrumb: string;
    href?: string; // Make href optional
  }
  

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) => {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return (
    <nav className="flex bg-sky-200 p-4 pl-40" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.breadcrumb}>
            {breadcrumb.href ? (
              <Link href={breadcrumb.href} > {breadcrumb.breadcrumb}</Link>
            ) : (
              <span>{breadcrumb.breadcrumb}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
