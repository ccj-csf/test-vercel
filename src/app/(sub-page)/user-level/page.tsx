import { BackButton } from '@/biz-components';
import Container from './Container';
export default async function Page() {
  // const res = await getReferralListAction();

  return (
    <div className="w-full px-4">
      <BackButton />
      <Container userLevel={1}></Container>
    </div>
  );
}
