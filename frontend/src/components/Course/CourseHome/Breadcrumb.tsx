import Link from "next/link";
import React from "react";

// components/Breadcrumb.tsx
interface BreadcrumbItem {
  breadcrumb: string;
  href?: string; // Make href optional
}

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) => {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return (
    <nav className="fixed w-full bg-sky-300" aria-label="Breadcrumb">
      <div className="mx-auto max-w-7xl  lg:px-8 p-1">
        <ol className="relative inline-flex items-center justify-between md:space-x-3 text-xs text-gray-600">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.breadcrumb}>
              {breadcrumb.href ? (
                <Link href={breadcrumb.href}> {breadcrumb.breadcrumb}</Link>
              ) : (
                <span>{breadcrumb.breadcrumb}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
