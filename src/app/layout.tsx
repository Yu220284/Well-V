import { redirect } from 'next/navigation';

// This is the root layout, which redirects to the default locale.
export default function RootLayout() {
  redirect('/ja');
}
