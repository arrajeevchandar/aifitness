import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useRouter } from "next/navigation";
export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (!res?.error) {
      alert('Login successful!');
      router.push("/");
    } else {
      alert('Login failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader className="text-center text-2xl font-bold">Login</CardHeader>
        <CardContent>
          <Button
            onClick={() => signIn('google', { callbackUrl: "/" })}
            className="w-full bg-red-500 text-white mb-4"
          >
            Sign in with Google
          </Button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
