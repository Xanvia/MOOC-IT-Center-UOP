import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  isOpen: boolean; // renamed to isOpen to keep it consistent
  toggleSidebar: () => void; // Add this for the toggle button
  navItems: { icon: any; label: string; href: string }[];
}

const Sidebar = ({ isOpen, toggleSidebar, navItems }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className={`bg-blue-950 text-white transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          {!isOpen && <h2 className="text-xl font-bold">OpenEd</h2>}
          <button
            onClick={toggleSidebar} // Use toggleSidebar function passed from parent
            className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 pt-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} passHref>
                  <div
                    className={`flex items-center p-3 ${
                      pathname === item.href
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    } rounded-lg transition-colors duration-200`}
                  >
                    <item.icon size={20} />
                    {isOpen && <span className="ml-3">{item.label}</span>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
