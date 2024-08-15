import React from 'react';

interface LvLabelProps {
  level: number;
}

const LvLabel: React.FC<LvLabelProps> = ({ level }) => {
  return (
    <div
      className="bg-gray-200  text-12"
      style={{
        padding: '4px 12px 4px 24px',
        borderTopRightRadius: '8px',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 30% 100%, 15% 60%)',
        borderBottomLeftRadius: '40px',
      }}
    >
      Lv {level}
    </div>
  );
};

export default LvLabel;
