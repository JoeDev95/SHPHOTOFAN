import AdminNav from '@/admin/AdminNav';
import {
  getPhotosCountIncludingHiddenCached,
  getUniqueTagsCached,
} from '@/photo/cache';
import { getStorageUploadUrlsNoStore } from '@/services/storage/cache';
import {
  PATH_ADMIN_PHOTOS,
  PATH_ADMIN_TAGS,
  PATH_ADMIN_UPLOADS,
} from '@/site/paths';

/**
 * AdminLayout component for the admin dashboard
 * @param children - ReactNode for the content to be rendered within the layout
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch counts for photos, uploads, and tags in parallel
  const [
    countPhotos,
    countUploads,
    countTags,
  ] = await Promise.all([
    getPhotosCountIncludingHiddenCached(),
    getStorageUploadUrlsNoStore()
      .then(urls => urls.length)
      .catch(() => 0),
    getUniqueTagsCached().then(tags => tags.length),
  ]);

  // Define navigation items with label, href, and count
  const navItems = [
    {
      label: 'Fotos',
      href: PATH_ADMIN_PHOTOS,
      count: countPhotos,
    },
    {
      label: 'Uploads',
      href: PATH_ADMIN_UPLOADS,
      count: countUploads,
    },
    {
      label: 'Tags',
      href: PATH_ADMIN_TAGS,
      count: countTags,
    },
  ].filter(item => item.count > 0);

  // Render AdminNav component and children within a div
  return (
    <div className="mt-4 space-y-5">
      <AdminNav items={navItems} />
      {children}
    </div>
  );
}
