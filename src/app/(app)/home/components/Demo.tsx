'use client';
import {
  Avatar,
  Button,
  CapsuleTabs,
  Empty,
  Modal,
  Popup,
  Segment,
  SegmentItem,
  TabItem,
} from '@/components';
import { useLoading } from '@/hooks';
import { Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Demo = () => {
  const nav = useRouter();
  const { showLoading, hiddenLoading } = useLoading();
  const gotoUserLevel = () => {
    nav.push('/user-level');
  };
  const [visible, setVisible] = useState(false);
  const [popVisible, setPopVisible] = useState(false);
  // 段落数据
  const segmentsData: SegmentItem[] = [
    { id: '1', title: 'Home', content: <div>Welcome to Home</div> },
    { id: '2', title: 'Profile', content: <div>Profile Info</div> },
    { id: '3', title: 'Settings', content: <div>Configure your settings here</div> },
  ];

  // 活动标签的状态
  const [activeSegment, setActiveSegment] = useState('1');
  const [defaultActiveKey, setDefaultActiveKey] = useState('tab1');
  // activeKey
  const [activeKey, setActiveKey] = useState('tab1');
  // 处理标签变更
  const handleSegmentChange = (segmentId: string) => {
    setActiveSegment(segmentId);
  };
  return (
    <div className="space-y-4">
      <section>
        <CapsuleTabs
          defaultActiveKey={defaultActiveKey}
          activeKey={activeKey}
          tabClassName="rounded-16"
          onTabChange={(id) => setActiveKey(id)}
        >
          <TabItem id="tab1" title="fruits">
            Content of Tab 1
          </TabItem>
          <TabItem id="tab2" title="vegetables">
            Content of Tab 2
          </TabItem>
          <TabItem id="tab3" title="Cappuccino">
            Content of Tab 3
          </TabItem>
          <TabItem id="tab4" title="Americano">
            Content of Tab 4
          </TabItem>
          <TabItem id="tab5" title="Flat White">
            Content of Tab 3
          </TabItem>
          <TabItem id="tab6" title="Caramel Macchiato">
            Content of Tab 3
          </TabItem>
          <TabItem id="tab7" title="Cafe Mocha">
            Content of Tab 3
          </TabItem>
        </CapsuleTabs>
      </section>
      <section className="space-y-4">
        <Button block onClick={gotoUserLevel}>
          button11
        </Button>
        <Button
          block
          onClick={() => {
            showLoading();
            setTimeout(() => {
              hiddenLoading();
            }, 2000);
          }}
          variant="gray"
        >
          showLoading
        </Button>
        <Button block onClick={() => setPopVisible(true)} variant="black">
          Pop
        </Button>
        <Button block onClick={() => setVisible(true)} height={28} width={56}>
          <Play size={16} fill="#000" />
        </Button>
      </section>

      <section>
        <Avatar width={80} height={80} />
      </section>
      <section>
        <Modal visible={visible} showCloseButton={true} onClose={() => setVisible(false)}>
          <div>456</div>
          <Button block onClick={() => setVisible(false)} variant="black">
            button3
          </Button>
        </Modal>
      </section>
      <section>
        <Popup visible={popVisible} showCloseButton={true} onClose={() => setPopVisible(false)}>
          <div>456</div>
          <Button block onClick={() => setPopVisible(false)} variant="black">
            button3
          </Button>
        </Popup>
      </section>
      <section>
        <Segment
          segments={segmentsData}
          activeSegment={activeSegment}
          onChange={handleSegmentChange}
        />
      </section>
      <section>
        <Empty description="暂无数据" />
      </section>
    </div>
  );
};

export default Demo;
