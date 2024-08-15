import { getEarnDataAction } from '@/actions';
import Container from './Container';

export default async function Page() {
  const res = await getEarnDataAction();

  return (
    <div className="w-full bg-gray-100 px-4">
      <Container data={res?.data!}></Container>
    </div>
  );
}
