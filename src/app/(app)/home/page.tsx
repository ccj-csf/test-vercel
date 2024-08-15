import Container from './Container';
import './index.css';
export default async function Page() {
  // const res = await getUserBoostAction();

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Container></Container>
    </div>
  );
}
