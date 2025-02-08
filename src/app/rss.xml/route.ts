import { cache } from 'react';
import { INFINITE_SCROLL_FEED_INITIAL } from '@/photo';
import { getPhotos } from '@/photo/db/query';
import { getNextImageUrlForRequest } from '@/services/next-image';
import {
  BASE_URL,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from '@/site/config';
import { absolutePathForPhoto } from '@/site/paths';
import { formatDate } from '@/utility/date';

export const dynamic = 'force-static';

const getPhotosCached = cache(() => getPhotos({
  limit: INFINITE_SCROLL_FEED_INITIAL,
}));

export async function GET() {
  const photos = await getPhotosCached().catch(() => []);

  const items = [];
  for (const photo of photos) {
    const link = absolutePathForPhoto({photo: photo});
    const image = getNextImageUrlForRequest(photo.url, 1080, 75)
      .replaceAll('&', '&amp;');
    const thumb = getNextImageUrlForRequest(photo.url, 640, 75)
      .replaceAll('&', '&amp;');
    const alt = photo.caption ?
      `${photo.title}: ${photo.caption}` : photo.title;

    const description = photo.caption ?
      `<description>
        <![CDATA[${photo.caption}]]>
      </description>` : '';
    const caption = photo.caption ? `<p>${photo.caption}</p>` : '';

    items.push(`<item>
      <title>${photo.title}</title>
      <link>${link}</link>
      <pubDate>${formatDate({date: photo.createdAt, length: 'rss'})}</pubDate>
      <guid isPermaLink="true">${link}</guid>
      ${description}
      <content:encoded>
        <![CDATA[<p><img src="${image}" title="${alt}" alt="${alt}" /></p>
          ${caption}]]>
      </content:encoded>
      <media:content url="${image}" type="image/jpeg"
        medium="image" width="1080" />
      <media:thumbnail url="${thumb}" width="640" />
    </item>`);
  }

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/">

  <channel>
    <title>${SITE_TITLE}</title>
    <atom:link href="${BASE_URL}/rss.xml"
      rel="self" type="application/rss+xml" />
    <link>${BASE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>

    ${items.join('\n\n    ')}

  </channel>

</rss>`,
    {
      headers: {
        'Content-Type': 'text/xml',
      },
    },
  );
}
