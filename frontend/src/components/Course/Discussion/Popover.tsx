import React from 'react';
import { Popover as HeadlessPopover } from '@headlessui/react';

export const Popover = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeadlessPopover className="relative">
      {children}
    </HeadlessPopover>
  );
};

export const PopoverTrigger = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeadlessPopover.Button as="div" className="cursor-pointer">
      {children}
    </HeadlessPopover.Button>
  );
};

export const PopoverContent = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <HeadlessPopover.Panel className={`absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg ${className}`}>
      {children}
    </HeadlessPopover.Panel>
  );
};
