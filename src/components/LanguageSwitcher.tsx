import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export function LanguageSwitcher() {
  const router = useRouter();
  const { t } = useTranslation('common');

  const changeLanguage = (lang: string) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <div className="fixed top-4 right-4">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded ${
          router.locale === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('fa')}
        className={`px-2 py-1 rounded ml-2 ${
          router.locale === 'fa' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        FA
      </button>
    </div>
  );
}