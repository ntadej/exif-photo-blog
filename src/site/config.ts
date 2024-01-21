import type { StorageType } from '@/services/storage';
import { makeUrlAbsolute, shortenUrl } from '@/utility/url';

// META / DOMAINS

export const SITE_TITLE =
  process.env.NEXT_PUBLIC_SITE_TITLE ||
  'Photo Blog';

const VERCEL_BRANCH_URL = process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL;
const VERCEL_BRANCH = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF;
const VERCEL_URL = VERCEL_BRANCH_URL && VERCEL_BRANCH
  ? `${VERCEL_BRANCH_URL.split(`-git-${VERCEL_BRANCH}-`)[0]}.vercel.app`
  : undefined;

const SITE_DOMAIN =
  process.env.NEXT_PUBLIC_SITE_DOMAIN ||
  VERCEL_URL;

const SITE_DOMAIN_SHORT = shortenUrl(SITE_DOMAIN);

export const SITE_DOMAIN_OR_TITLE =
  SITE_DOMAIN_SHORT ||
  SITE_TITLE;

export const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  SITE_DOMAIN;

export const BASE_URL = process.env.NODE_ENV === 'production'
  ? makeUrlAbsolute(SITE_DOMAIN)?.toLowerCase()
  : 'http://localhost:3000';

// STORAGE: VERCEL BLOB
export const HAS_VERCEL_BLOB_STORAGE =
  (process.env.BLOB_READ_WRITE_TOKEN ?? '').length > 0;

// STORAGE: Cloudflare R2
// Includes separate check for client-side usage, i.e., url construction
export const HAS_CLOUDFLARE_R2_STORAGE_CLIENT =
  (process.env.NEXT_PUBLIC_CLOUDFLARE_R2_BUCKET ?? '').length > 0 &&
  (process.env.NEXT_PUBLIC_CLOUDFLARE_R2_ACCOUNT_ID ?? '').length > 0 &&
  (process.env.NEXT_PUBLIC_CLOUDFLARE_R2_DEV_SUBDOMAIN ?? '').length > 0;
export const HAS_CLOUDFLARE_R2_STORAGE =
  HAS_CLOUDFLARE_R2_STORAGE_CLIENT &&
  (process.env.CLOUDFLARE_R2_ACCESS_KEY ?? '').length > 0 &&
  (process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? '').length > 0;

// STORAGE: AWS S3
// Includes separate check for client-side usage, i.e., url construction
export const HAS_AWS_S3_STORAGE_CLIENT =
  (process.env.NEXT_PUBLIC_AWS_S3_BUCKET ?? '').length > 0 &&
  (process.env.NEXT_PUBLIC_AWS_S3_REGION ?? '').length > 0;
export const HAS_AWS_S3_STORAGE =
  HAS_AWS_S3_STORAGE_CLIENT &&
  (process.env.AWS_S3_ACCESS_KEY ?? '').length > 0 &&
  (process.env.AWS_S3_SECRET_ACCESS_KEY ?? '').length > 0;

// Storage preference relies on client-only keys
// so that it's available in the browser when uploading
export const STORAGE_PREFERENCE: StorageType =
  (process.env.NEXT_PUBLIC_STORAGE_PREFERENCE as StorageType | undefined) || (
    HAS_CLOUDFLARE_R2_STORAGE_CLIENT
      ? 'cloudflare-r2'
      : HAS_AWS_S3_STORAGE_CLIENT
        ? 'aws-s3'
        : 'vercel-blob'
  );

// SETTINGS

export const PRO_MODE_ENABLED = process.env.NEXT_PUBLIC_PRO_MODE === '1';
export const GEO_PRIVACY_ENABLED = process.env.NEXT_PUBLIC_GEO_PRIVACY === '1';
export const PRIORITY_ORDER_ENABLED =
  process.env.NEXT_PUBLIC_IGNORE_PRIORITY_ORDER !== '1';
export const PUBLIC_API_ENABLED = process.env.NEXT_PUBLIC_PUBLIC_API === '1';
export const SHOW_REPO_LINK = process.env.NEXT_PUBLIC_HIDE_REPO_LINK !== '1';
export const SHOW_FILM_SIMULATIONS =
  process.env.NEXT_PUBLIC_HIDE_FILM_SIMULATIONS !== '1';
export const GRID_ASPECT_RATIO = process.env.NEXT_PUBLIC_GRID_ASPECT_RATIO
  ? parseFloat(process.env.NEXT_PUBLIC_GRID_ASPECT_RATIO)
  : 1;
export const OG_TEXT_BOTTOM_ALIGNMENT =
  (process.env.NEXT_PUBLIC_OG_TEXT_ALIGNMENT ?? '').toUpperCase() === 'BOTTOM';

export const HIGH_DENSITY_GRID = GRID_ASPECT_RATIO <= 1;

export const CONFIG_CHECKLIST_STATUS = {
  hasPostgres: (process.env.POSTGRES_HOST ?? '').length > 0,
  hasVercelBlobStorage: HAS_VERCEL_BLOB_STORAGE,
  hasCloudflareR2Storage: HAS_CLOUDFLARE_R2_STORAGE,
  hasAwsS3Storage: HAS_AWS_S3_STORAGE,
  hasStorage:
    HAS_VERCEL_BLOB_STORAGE ||
    HAS_CLOUDFLARE_R2_STORAGE ||
    HAS_AWS_S3_STORAGE,
  storagePreference: STORAGE_PREFERENCE,
  hasAuth: (process.env.AUTH_SECRET ?? '').length > 0,
  hasAdminUser: (
    (process.env.ADMIN_EMAIL ?? '').length > 0 &&
    (process.env.ADMIN_PASSWORD ?? '').length > 0
  ),
  hasTitle: (process.env.NEXT_PUBLIC_SITE_TITLE ?? '').length > 0,
  hasDomain: (process.env.NEXT_PUBLIC_SITE_DOMAIN ?? '').length > 0,
  showRepoLink: SHOW_REPO_LINK,
  showFilmSimulations: SHOW_FILM_SIMULATIONS,
  isProModeEnabled: PRO_MODE_ENABLED,
  isGeoPrivacyEnabled: GEO_PRIVACY_ENABLED,
  isPriorityOrderEnabled: PRIORITY_ORDER_ENABLED,
  isPublicApiEnabled: PUBLIC_API_ENABLED,
  isOgTextBottomAligned: OG_TEXT_BOTTOM_ALIGNMENT,
  gridAspectRatio: GRID_ASPECT_RATIO,
};

export type ConfigChecklistStatus = typeof CONFIG_CHECKLIST_STATUS;

export const IS_SITE_READY =
  CONFIG_CHECKLIST_STATUS.hasPostgres &&
  CONFIG_CHECKLIST_STATUS.hasStorage &&
  CONFIG_CHECKLIST_STATUS.hasAuth &&
  CONFIG_CHECKLIST_STATUS.hasAdminUser;
