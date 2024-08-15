import { getMineDataAction } from '@/actions';
import Container from './Container';
export default async function Page() {
  const res = await getMineDataAction('Instruments');
  // console.log('🚀 ~ Page ~ res:', res);

  return (
    <div className=" min-h-screen w-full bg-gray-100">
      <Container data={res?.data?.items!}></Container>
    </div>
  );
}
