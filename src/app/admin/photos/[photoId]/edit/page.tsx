import { redirect } from 'next/navigation';
import { getPhotoNoStore, getUniqueTagsCached } from '@/photo/cache';
import { PATH_ADMIN } from '@/site/paths';
import PhotoEditPageClient from '@/photo/PhotoEditPageClient';

/**
 * Function that renders the photo edit page.
 * @param photoId - The ID of the photo to edit.
 * @returns JSX element representing the photo edit page.
 */
export default async function PhotoEditPage({
  params: { photoId },
}: {
  params: { photoId: string }
}) {
  const photo = await getPhotoNoStore(photoId);

  if (!photo) { redirect(PATH_ADMIN); }

  const uniqueTags = await getUniqueTagsCached();

  return (
    <PhotoEditPageClient {...{ photo, uniqueTags }} />
  );
};
