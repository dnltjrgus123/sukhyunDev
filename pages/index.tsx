import React, { useEffect, useState } from "react";

interface Item {
  _id: string;
  title: string;
  price: number;
  sellerId: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [sellerId, setSellerId] = useState("");

  // GET 요청으로 아이템 불러오기
  const fetchItems = async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // POST 요청으로 아이템 추가
  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !sellerId || !price) return;

    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, sellerId }),
    });

    const data = await res.json();
    console.log(data);

    setTitle("");
    setPrice(0);
    setSellerId("");

    fetchItems(); // 추가 후 목록 갱신
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8">🚀 Game Marketplace</h1>

      {/* 아이템 추가 폼 */}
      <form onSubmit={addItem} className="mb-8 w-full max-w-md flex flex-col gap-2">
        <input
          type="text"
          placeholder="Item Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded border"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="p-2 rounded border"
        />
        <input
          type="text"
          placeholder="Seller ID"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
          className="p-2 rounded border"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Add Item
        </button>
      </form>

      {/* 아이템 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg p-5 hover:scale-105 transform transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700 mb-1">Price: ${item.price}</p>
            <p className="text-gray-500 text-sm">Seller: {item.sellerId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
