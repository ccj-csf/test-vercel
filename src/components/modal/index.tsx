'use client';
import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd-mobile';
import { CircleX } from 'lucide-react';
import { FC, ReactElement, ReactNode, memo } from 'react';

export interface ModalProps extends AntdModalProps {
  children?: ReactNode | ReactElement;
  contentClass?: string;
}
const Modal: FC<ModalProps> = memo((props) => {
  const { onClose, children, showCloseButton, contentClass } = props;
  return (
    <AntdModal
      bodyStyle={{ backgroundColor: '#fff' }}
      className="!bg-white"
      style={{
        ['--max-width' as string]: '100vw',
      }}
      content={
        <div className={`w-[280px] pt-4 text-center ${contentClass}`}>
          {children}
          {showCloseButton && (
            <CircleX
              onClick={onClose}
              className="absolute right-[14px] top-[10px] cursor-pointer text-28 text-white"
            />
          )}
        </div>
      }
      onClose={onClose}
      destroyOnClose
      closeOnMaskClick
      {...props}
      showCloseButton={false}
    />
  );
});
Modal.displayName = 'Modal';
export { Modal };
