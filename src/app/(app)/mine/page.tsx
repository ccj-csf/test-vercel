import { getMineDataAction } from '@/actions';
import Container from './Container';

export default async function Page() {
  try {
    const res = await getMineDataAction('Instruments');
    console.log('🚀 ~ Page ~ res:', res);
    if (!res || !res.data || !res.data.items) {
      throw new Error('Invalid response data');
    }

    return (
      <div className="min-h-screen w-full bg-gray-100">
        <Container data={res.data.items}></Container>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
        <p>Failed to load data. Please try again later.</p>
      </div>
    );
  }
}
