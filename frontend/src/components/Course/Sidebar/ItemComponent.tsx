import React from 'react';
import { Item } from '@/components/Course/types';
import SideBarIcon from '@/icons/sideBarIcon';

interface ItemComponentProps {
  item: Item;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}

const ItemComponent: React.FC<ItemComponentProps> = ({ item, isSelected, onSelect, onRemove }) => (
  <div className="flex items-center">
    <p
      className={`my-2 ml-8 cursor-pointer ${isSelected ? 'font-semibold text-gray-800' : 'text-gray-500'} `}
      onClick={onSelect}
    >
      <SideBarIcon type={item.type} />
      {item.title}
    </p>
    <button className="ml-auto text-red-600" onClick={(e) => { e.stopPropagation(); onRemove(); }}>
        Remove
      </button>
  </div>
);

export default ItemComponent;
