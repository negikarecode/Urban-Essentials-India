import { redirect } from 'next/navigation';

export function generateStaticParams() {
  return [{ target: 'school' }, { target: 'college' }, { target: 'office' }];
}

export default function AudiencePage() {
  redirect('/products');
}
