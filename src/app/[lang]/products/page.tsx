import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function Products({ params: { lang } }: { params: { lang: string } }) {
  const { t } = useTranslation('common');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    gsap.from('.product-item', {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
    });
  }, [products]);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">{t('products')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product._id} className="product-item bg-white rounded-lg shadow-md overflow-hidden">
            {product.images && product.images.length > 0 && (
              <Image
                src={product.images[0]}
                alt={product.name[lang]}
                width={300}
                height={200}
                objectFit="cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name[lang]}</h2>
              <p className="text-gray-600 mb-4">{product.description[lang]}</p>
              <p className="text-lg font-bold">{product.price} {t('currency')}</p>
              <Link href={`/${lang}/products/${product._id}`}>
                <a className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  {t('view_details')}
                </a>
              </Link>
            </div>
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