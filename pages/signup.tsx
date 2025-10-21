import { useState } from "react";
import { useRouter } from "next/router";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ user_no: "", register_no: "", name: "", email: "", password: "", phone: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setErrorMsg("");
      router.push("/login");
    } else {
      setErrorMsg(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSignup} className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">회원가입</h1>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <input type="text" name="user_no" placeholder="User No" value={form.user_no} onChange={handleChange} required className="border p-3 rounded"/>
        <input type="text" name="register_no" placeholder="Register No" value={form.register_no} onChange={handleChange} required className="border p-3 rounded"/>
        <input type="text" name="name" placeholder="이름" value={form.name} onChange={handleChange} required className="border p-3 rounded"/>
        <input type="email" name="email" placeholder="이메일" value={form.email} onChange={handleChange} required className="border p-3 rounded"/>
        <input type="password" name="password" placeholder="비밀번호" value={form.password} onChange={handleChange} required className="border p-3 rounded"/>
        <input type="text" name="phone" placeholder="전화번호" value={form.phone} onChange={handleChange} required className="border p-3 rounded"/>
        <button type="submit" className="bg-green-500 text-white py-3 rounded hover:bg-green-600">회원가입</button>
      </form>
    </div>
  );
}
