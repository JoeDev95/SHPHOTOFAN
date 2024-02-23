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
      .catch(e => {
        console.error(`Error getting blob upload urls: ${e}`);
        return 0;
      }),
    getUniqueTagsCached().then(tags => tags.length),
  ]);

  // Define navigation items with label, href, and count
  const navItemPhotos = {
    label: 'Fotos',
    href: PATH_ADMIN_PHOTOS,
    count: countPhotos,
  };

  const navItemUploads = {
    label: 'Uploads',
    href: PATH_ADMIN_UPLOADS,
    count: countUploads,
  };

  const navItemTags = {
    label: 'Tags',
    href: PATH_ADMIN_TAGS,
    count: countTags,
  };

  // Initialize navigation items array with photos item
  const navItems = [navItemPhotos];

  // Add uploads and tags items to navigation if count is greater than 0
  if (countUploads > 0) { navItems.push(navItemUploads); }
  if (countTags > 0) { navItems.push(navItemTags); }

  // Render AdminNav component and children within a div
  return (
    <div className="mt-4 space-y-5">
      <AdminNav items={navItems} />
      {children}
    </div>
  );
}
