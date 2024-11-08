// app/utils/withAuth.tsx
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';

type WithAuthProps = {
  [key: string]: unknown; // Define os props como um objeto de propriedades desconhecidas
};

const withAuth = <P extends WithAuthProps>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      } else {
        try {
          jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || 'secret');
        } catch {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          localStorage.removeItem('token');
          router.push('/login');
        }
      }
    }, [router]);

    return <WrappedComponent {...(props as P)} />;
  };

  // Definir um display name para facilitar o debugging
  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
