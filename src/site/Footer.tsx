'use client';

import { clsx } from 'clsx/lite';
import SiteGrid from '../components/SiteGrid';
import ThemeSwitcher from '@/site/ThemeSwitcher';
import Link from 'next/link';
import {
  SITE_COPYRIGHT,
  SITE_HOMEPAGE_URL,
  SHOW_REPO_LINK,
} from '@/site/config';
import RepoLink from '../components/RepoLink';
import { usePathname } from 'next/navigation';
import { PATH_ADMIN_PHOTOS, isPathAdmin, isPathSignIn } from './paths';
import SubmitButtonWithStatus from '@/components/SubmitButtonWithStatus';
import { signOutAndRedirectAction } from '@/auth/actions';
import Spinner from '@/components/Spinner';
import AnimateItems from '@/components/AnimateItems';
import { useAppState } from '@/state/AppState';

export default function Footer() {
  const pathname = usePathname();

  const { userEmail, setUserEmail } = useAppState();

  const showFooter = !isPathSignIn(pathname);

  const shouldAnimate = !isPathAdmin(pathname);

  return (
    <SiteGrid
      contentMain={
        <AnimateItems
          animateOnFirstLoadOnly
          type={!shouldAnimate ? 'none' : 'bottom'}
          distanceOffset={10}
          items={showFooter
            ? [<div
              key="footer"
              className={clsx(
                'flex items-center gap-1',
                'text-dim min-h-10',
              )}>
              <div className="flex gap-x-3 xs:gap-x-4 grow flex-wrap">
                {isPathAdmin(pathname)
                  ? <>
                    {userEmail === undefined &&
                      <Spinner size={14} className="translate-y-[2px]" />}
                    {userEmail && <>
                      <div className={clsx(
                        'truncate max-w-full',
                      )}>
                        {userEmail}
                      </div>
                      <form action={() => signOutAndRedirectAction()
                        .then(() => setUserEmail?.(undefined))}>
                        <SubmitButtonWithStatus styleAs="link">
                          Sign out
                        </SubmitButtonWithStatus>
                      </form>
                    </>}
                  </>
                  : <>
                    {SITE_COPYRIGHT && <>
                      &copy; {SITE_HOMEPAGE_URL ?
                        <Link href={SITE_HOMEPAGE_URL} target='_blank'>
                          {SITE_COPYRIGHT}
                        </Link>
                        : <>{SITE_COPYRIGHT}</>}
                    </>}
                    {SHOW_REPO_LINK &&
                      <RepoLink />}
                    <Link href={PATH_ADMIN_PHOTOS}>
                      Admin
                    </Link>
                  </>}
              </div>
              <div className="flex items-center h-10">
                <ThemeSwitcher />
              </div>
            </div>]
            : []}
        />}
    />
  );
}
