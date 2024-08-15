'use client';
import { withNativeProps } from '@/utils';
import { Popup as AntdPopup, PopupProps as AntdPopupProps } from 'antd-mobile';
import Image from 'next/image';
import { FC, memo } from 'react';

export interface PopupProps extends AntdPopupProps {
  onClose?: () => void;
}
const Popup: FC<PopupProps> = memo((props) => {
  const { onClose, bodyClassName, children, showCloseButton, ...other } = props;

  return withNativeProps(
    props,
    <AntdPopup
      bodyClassName={`min-h-[100px] rounded-tl-16 rounded-tr-16 pt-3 px-5 pb-8 ${bodyClassName}`}
      onMaskClick={onClose}
      onClose={onClose}
      destroyOnClose
      position="bottom"
      {...other}
      showCloseButton={false}
    >
      {showCloseButton && (
        <Image
          src="/icons/close.svg"
          alt="close"
          width={32}
          height={32}
          onClick={onClose}
          className="absolute right-[14px] top-[10px] cursor-pointer"
        />
      )}
      <div className="mt-6">{children}</div>
    </AntdPopup>,
  );
});
Popup.displayName = 'Popup';
export { Popup };
