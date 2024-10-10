import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function CreateProduct() {
  const [name, setName] = useState({ en: '', fa: '' });
  const [description, setDescription] = useState({ en: '', fa: '' });
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/auth/login');
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price: parseFloat(price), images }),
    });
    if (res.ok) {
      router.push('/admin/products');
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    setImages((prevImages) => [...prevImages, ...data.urls]);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Create Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name (English)</label>
          <input
            type="text"
            value={name.en}
            onChange={(e) => setName({ ...name, en: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Name (Persian)</label>
          <input
            type="text"
            value={name.fa}
            onChange={(e) => setName({ ...name, fa: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description (English)</label>
          <textarea
            value={description.en}
            onChange={(e) => setDescription({ ...description, en: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description (Persian)</label>
          <textarea
            value={description.fa}
            onChange={(e) => setDescription({ ...description, fa: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Images</label>
          <input type="file" multiple onChange={handleImageUpload} />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Product
        </button>
      </form>
    </div>
  );
}