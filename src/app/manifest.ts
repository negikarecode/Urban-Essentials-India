import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Urban Essentials',
    short_name: 'UrbanEssentials',
    description: 'Premium everyday bottles, bags, and lunchboxes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf8f5',
    theme_color: '#064e3b',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
