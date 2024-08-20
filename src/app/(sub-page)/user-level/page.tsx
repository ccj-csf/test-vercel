import { BackButton } from '@/biz-components';
import Container from './Container';
export default async function Page() {
  // const res = await getReferralListAction();

  return (
    <div className="min-h-screen w-full bg-[#07070b]">
      <BackButton />
      <Container></Container>
    </div>
  );
}
