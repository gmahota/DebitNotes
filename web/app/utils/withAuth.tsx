// app/utils/withAuth.tsx
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      } else {
        try {
          jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || 'secret');
        } catch (err) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
