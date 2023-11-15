'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useMobileSidebar } from '@/hoooks/use-mobile-sidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Sidebar } from './sidebar';

export default function MobileSidebar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const isOpen = useMobileSidebar((state) => state.isOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const onOpen = useMobileSidebar((state) => state.onOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden mr-2"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="p-2 pt-10">
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
}
