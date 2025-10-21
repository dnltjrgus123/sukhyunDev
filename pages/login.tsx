import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setErrorMsg("");
      router.push("/"); // 로그인 성공 시 메인
    } else {
      setErrorMsg(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">로그인</h1>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <input type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} required className="border p-3 rounded"/>
        <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} required className="border p-3 rounded"/>
        <button type="submit" className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600">로그인</button>
      </form>
    </div>
  );
}
