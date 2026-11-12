import CareerExplorer from '../components/CareerExplorer';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../utils/usePageTitle';

export default function Careers() {
  usePageTitle('Find your cybersecurity career direction');
  const { user } = useAuth();
  return <CareerExplorer signedIn={Boolean(user)} />;
}
