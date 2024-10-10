import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  {
    name: 'Products',
    href: '/admin/products',
    subItems: [
      { name: 'List', href: '/admin/products' },
      { name: 'Create', href: '/admin/products/create' },
    ],
  },
  {
    name: 'Articles',
    href: '/admin/articles',
    subItems: [
      { name: 'List', href: '/admin/articles' },
      { name: 'Create', href: '/admin/articles/create' },
    ],
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubMenu = (name: string) => {
    setOpenSubMenu(openSubMenu === name ? null : name);
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-20 lg:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-gray-800 text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <nav className="p-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="mb-2">
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleSubMenu(item.name)}
                      className="flex items-center justify-between w-full py-2 px-4 rounded hover:bg-gray-700"
                    >
                      {item.name}
                      {openSubMenu === item.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {openSubMenu === item.name && (
                      <ul className="ml-4 mt-2">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.name}>
                            <Link href={subItem.href}>
                              <a
                                className={`block py-2 px-4 rounded ${
                                  router.pathname === subItem.href ? 'bg-gray-700' : 'hover:bg-gray-700'
                                }`}
                              >
                                {subItem.name}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link href={item.href}>
                    <a
                      className={`block py-2 px-4 rounded ${
                        router.pathname === item.href ? 'bg-gray-700' : 'hover:bg-gray-700'
                      }`}
                    >
                      {item.name}
                    </a>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}