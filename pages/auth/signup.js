import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link for navigation

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Signup successful! Please login.");
      router.push("/auth/login");
    } else {
      alert("Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader className="text-center text-2xl font-bold">Sign Up</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
            <Input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          
          

          <br />
          <Button onClick={() => signIn("google")} className="w-full bg-red-500 text-white mb-4">
            Sign up with Google
          </Button>
          <div className="text-center mt-4">Already a user? 
            <Link href="/auth/login" className="text-blue-600 hover:underline">
               Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
