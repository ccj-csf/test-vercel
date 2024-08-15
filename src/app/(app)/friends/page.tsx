import { getFriendsDataAction } from '@/actions/friends';
import Container from './Container';

export default async function Page() {
  const res = await getFriendsDataAction();

  return (
    <div className="min-h-screen w-full bg-gray-100 px-4">
      <Container data={res?.data!}></Container>
    </div>
  );
}
