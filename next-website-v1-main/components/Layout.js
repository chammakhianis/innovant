import Footer from './Footer';
import Navbar from './Navbar';
import { useRouter } from 'next/router';

export default function Layout({ children }) {

  /* const router = useRouter();
  useEffect(() => {
    // redirect to login if user is not authenticated
    if (!user) router.push('/signin');
  }, [user]); */

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
