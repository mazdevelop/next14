import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/auth/login');
    } else if (status === 'authenticated') {
      fetchProducts();
    }
  }, [status, router]);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <Link href="/admin/products/create">
        <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create New Product</a>
      </Link>
      <ul className="mt-4">
        {products.map((product) => (
          <li key={product._id} className="mb-2">
            <Link href={`/admin/products/edit/${product._id}`}>
              <a className="text-blue-500 hover:underline">{product.name.en}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}