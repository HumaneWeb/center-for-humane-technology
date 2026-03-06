import PathForwardLayout from '@/components/layout/pages/path-forward-layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A Path Forward — Center for Humane Technology',
  description:
    'Concrete, systemic solutions to reshape technology for the benefit of humanity. Explore seven solution pillars spanning global coordination, laws, and cultural norms.',
};

export default function PathForwardPage() {
  return <PathForwardLayout />;
}
