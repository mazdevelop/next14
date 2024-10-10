import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AboutUs({ params: { lang } }: { params: { lang: string } }) {
  const { t } = useTranslation('common');
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div ref={contentRef}>
      <h1 className="text-4xl font-bold mb-8">{t('about_us')}</h1>
      <div className="prose max-w-none">
        <p>{t('about_us_content')}</p>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { lang: 'en' } }, { params: { lang: 'fa' } }],
    fallback: false,
  };
}