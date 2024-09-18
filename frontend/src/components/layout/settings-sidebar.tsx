import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Book, Users, Calendar, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Book, label: 'Courses', href: '/courses' },
    { icon: Users, label: 'Students', href: '/students' },
    { icon: Calendar, label: 'Schedule', href: '/schedule' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <aside className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && <h2 className="text-xl font-bold">SMIT Academy</h2>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 pt-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} passHref>
                  <div className={`flex items-center p-3 ${pathname === item.href ? 'bg-gray-700' : 'hover:bg-gray-700'} rounded-lg transition-colors duration-200`}>
                    <item.icon size={20} />
                    {!isCollapsed && <span className="ml-3">{item.label}</span>}
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