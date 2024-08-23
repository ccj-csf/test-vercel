'use client';
import { getMineDataAction } from '@/actions';
import { CurrencyDisplay } from '@/biz-components';
import { Button, Popup, Segment } from '@/components';
import { useCoinStore, useUserInfoStore } from '@/store';
import { ICardItem, IMineDataType } from '@/types';
import { startVibrate } from '@/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CardItem from './components/CardItem';
import ProfitDisplay from './components/ProfitDisplay';

interface IProps {
  data: ICardItem[];
}

const Container: React.FC<IProps> = ({ data }) => {
  const { triggerNotification } = useCoinStore();
  const { coinBalance, updateProfitPerHour, profitPerHour } = useUserInfoStore();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState<ICardItem | null>(null);

  const [activeSegment, setActiveSegment] = useState<IMineDataType>('Instruments');

  // 使用通用的状态管理器来管理 items 数据
  const [items, setItems] = useState<ICardItem[]>(data);

  // 更新 items 列表
  const updateItems = async (type: IMineDataType) => {
    const res = await getMineDataAction(type);
    setItems(res.data?.items!);
  };

  useEffect(() => {
    // 当 activeSegment 改变时更新 items 数据
    updateItems(activeSegment);
  }, [activeSegment]);

  const openModal = (card: ICardItem) => {
    setShowModal(true);
    setSelectedCard(card);
  };

  const handleUpgrade = async () => {
    startVibrate();
    if (!selectedCard) return;

    setLoading(true);

    try {
      // 模拟异步请求
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 假设请求成功后返回的更新数据，实际开发中根据API返回的数据进行更新
      const updatedCard = {
        ...selectedCard,
        level: selectedCard.level + 1,
        profitPerHour: selectedCard.nextLevelProfitPerHour ?? selectedCard.profitPerHour,
        nextLevelProfitPerHour: selectedCard.nextLevelProfitPerHour ?? 0,
      };

      // 更新 items 列表
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === updatedCard.id ? updatedCard : item)),
      );

      // 使用 store 中的 updateProfitPerHour 方法来更新全局数据
      updateProfitPerHour(
        updatedCard.nextLevelProfitPerHour! - selectedCard.profitPerHour,
        updatedCard.upgradeCost,
      );

      setShowModal(false); // 请求成功后关闭弹窗
      triggerNotification(true);
    } catch (error) {
      console.error('Upgrade failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center pb-5 text-black">
      <ProfitDisplay profitPerHour={profitPerHour} currency={coinBalance} />
      <section className="!w-full px-4">
        <Segment
          sticky={true}
          stickyTop={0}
          segments={[
            { id: 'Instruments', title: 'Instruments', content: renderItems(items) },
            { id: 'Styles', title: 'Styles', content: renderItems(items) },
          ]}
          activeSegment={activeSegment}
          onChange={(activeSegment: any) => {
            startVibrate();
            setActiveSegment(activeSegment);
          }}
        />
      </section>
      <section>
        <Popup visible={showModal} showCloseButton={true} onClose={() => setShowModal(false)}>
          <div className="flex flex-col items-center justify-between px-2">
            <Image
              src={selectedCard?.icon!}
              alt="icon"
              width={80}
              height={80}
              className="mt-4 rounded-4 bg-gray-300 object-cover"
            />
            <h3 className="my-4 text-21">{selectedCard?.name}</h3>
            <p className="break-words text-center text-15 text-gray-600">
              {selectedCard?.description}
            </p>
            <section className="mt-8 flex flex-col items-center justify-center">
              <h4 className="text-15">Profit per hour</h4>
              <CurrencyDisplay
                currency={selectedCard?.nextLevelProfitPerHour!}
                imageSize={20}
                fontSize={20}
                spacingClass="space-x-1"
                prefix="+"
              />
            </section>
            <section className="mb-[45px] mt-8">
              <CurrencyDisplay currency={selectedCard?.upgradeCost!} imageSize={28} fontSize={28} />
            </section>
            <Button block onClick={handleUpgrade} variant="black" loading={loading}>
              Go ahead
            </Button>
          </div>
        </Popup>
      </section>
    </div>
  );

  function renderItems(items: ICardItem[]) {
    return (
      <div className="grid grid-cols-2 gap-[10px] text-black">
        {items?.map((item) => (
          <div className="col-span-1" key={item.id} onClick={() => openModal(item)}>
            <CardItem
              cardData={item}
              userCurrency={coinBalance}
              onUpgrade={() => openModal(item)}
            />
          </div>
        ))}
      </div>
    );
  }
};

export default Container;
