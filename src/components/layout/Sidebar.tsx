'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconHotel } from '@/components/icons/IconHotel';
import { IconPlus } from '@/components/icons/IconPlus';
import { IconList } from '@/components/icons/IconList';
import { IconSettings } from '@/components/icons/IconSettings';
import { IconUser } from '@/components/icons/IconUser';
import { IconMenu } from '@/components/icons/IconMenu';
import { IconClose } from '@/components/icons/IconClose';

const mainMenuItems = [
  { label: 'Bookings', path: '/bookings', icon: IconList },
  { label: 'Add Booking', path: '/add-booking', icon: IconPlus },
  { label: 'Hotels', path: '/hotels', icon: IconHotel },
  { label: 'Account', path: '/account', icon: IconUser },
];

const bottomMenuItems = [
  { label: 'Settings', path: '/settings', icon: IconSettings },
];

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/hotels' && (pathname === '/' || pathname === '/hotels')) {
      return true;
    }
    return pathname?.startsWith(path);
  };

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white z-50 flex items-center px-4">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-gray-700"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <IconClose className="w-6 h-6" />
          ) : (
            <IconMenu className="w-6 h-6" />
          )}
        </button>
        <h1 className="ml-4 text-lg font-bold text-gray-900">Afirmotel Booking</h1>
      </div>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30 mt-16"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`
          fixed lg:top-0 top-16 left-0 h-[calc(100vh-4rem)] lg:h-full w-64 bg-white z-40 transition-transform duration-300
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 hidden lg:block">
          <h1 className="text-xl font-bold text-gray-900">Afirmotel Booking</h1>
        </div>

        <nav className="p-4 lg:p-4 pt-6 lg:pt-0 flex flex-col h-[calc(100%-6rem)] lg:h-[calc(100%-5.5rem)]">
          <ul className="space-y-2">
            {mainMenuItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={closeMobile}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200
                      ${active
                        ? 'bg-[var(--color-theme-primary-light)] text-[var(--color-theme-primary)]'
                        : 'text-gray-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="space-y-2 mt-auto">
            {bottomMenuItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={closeMobile}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200
                      ${active
                        ? 'bg-[var(--color-theme-primary-light)] text-[var(--color-theme-primary)]'
                        : 'text-gray-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
