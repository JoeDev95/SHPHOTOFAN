/* eslint-disable max-len */
import { NextResponse } from 'next/server';

const REQUIRE_ENV_VARS = false;

const TITLE = 'Foto Blog';
const DESCRIPTION = 'Galeria de fotos com dados da câmera';
const REPO_TEAM = 'JoeDev95';
const REPO_NAME = 'SHPHOTOFAN';

export function GET() {
  const url = new URL('https://vercel.com/new/clone');

  url.searchParams.set('demo-title', TITLE);
  url.searchParams.set('demo-description', DESCRIPTION);
  url.searchParams.set('demo-url', 'https://photos.sambecker.com');
  url.searchParams.set('demo-description', DESCRIPTION);
  url.searchParams.set('demo-image', 'https://photos.sambecker.com/template-image-tight');
  url.searchParams.set('project-name', TITLE);
  url.searchParams.set('repository-name', REPO_NAME);
  url.searchParams.set('repository-url', `https://github.com/${REPO_TEAM}/${REPO_NAME}`);
  url.searchParams.set('from', 'templates');
  url.searchParams.set('skippable-integrations', '1');
  if (REQUIRE_ENV_VARS) {
    url.searchParams.set('env-description', 'Configure your photo blog meta');
    url.searchParams.set('env-link', 'BLANK');
    url.searchParams.set('env', [
      'NEXT_PUBLIC_SITE_TITLE',
    ].join(','));
  }
  url.searchParams.set('teamCreateStatus', 'hidden');
  url.searchParams.set('stores', JSON.stringify([
    { type: 'postgres' },
    { type: 'blob' },
  ]));

  // TODO: Return the URL as a JSON response
  return new Response(JSON.stringify(url), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
