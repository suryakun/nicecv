import { ReactElement } from 'react';
import { CustomNavbar } from '@/components/custom-navbar';
import { Toaster } from '@/components/ui/toaster';

const PreviewLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomNavbar />
      <main className="flex flex-col flex-grow">{children}</main>
      <Toaster />
    </div>
  );
};

export default PreviewLayout;
