import { DotLoading } from 'antd-mobile';

const InfiniteScrollContent: React.FC<{ hasMore?: boolean }> = ({
  hasMore,
}: {
  hasMore?: boolean;
}) => {
  return (
    <>
      {hasMore ? (
        <div className="text-chx-gray text-14">
          <DotLoading color="currentColor" />
        </div>
      ) : (
        <span className="text-chx-gray flex justify-center"> - It is all, nothing more -</span>
      )}
    </>
  );
};
export default InfiniteScrollContent;
