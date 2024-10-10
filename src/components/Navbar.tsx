import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export function Navbar({ lang }: { lang: string }) {
  const { t } = useTranslation('common');

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={`/${lang}`} className="text-2xl font-bold">
          {t('site_name')}
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href={`/${lang}`}>{t('home')}</Link>
          </li>
          <li>
            <Link href={`/${lang}/products`}>{t('products')}</Link>
          </li>
          <li>
            <Link href={`/${lang}/articles`}>{t('articles')}</Link>
          </li>
          <li>
            <Link href={`/${lang}/about-us`}>{t('about_us')}</Link>
          </li>
          <li>
            <Link href={`/${lang}/contact-us`}>{t('contact_us')}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}