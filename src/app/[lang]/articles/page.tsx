import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function Articles({ params: { lang } }: { params: { lang: string } }) {
  const { t } = useTranslation('common');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    gsap.from('.article-item', {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
    });
  }, [articles]);

  const fetchArticles = async () => {
    const res = await fetch('/api/articles');
    const data = await res.json();
    setArticles(data);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">{t('articles')}</h1>
      <div className="space-y-8">
        {articles.map((article) => (
          <div key={article._id} className="article-item bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-2">{article.title[lang]}</h2>
            <p className="text-gray-600 mb-4">{article.content[lang].substring(0, 200)}...</p>
            <Link href={`/${lang}/articles/${article._id}`}>
              <a className="text-blue-500 hover:underline">{t('read_more')}</a>
            </Link>
          </div>
        ))}
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