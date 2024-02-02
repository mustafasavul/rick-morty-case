import React, { useEffect, useRef } from 'react';
import s from './index.module.css';
import { Character } from '../interface';

interface DropdownItemProps {
  dropdownItem: Character;
  isSelected: boolean;
  isFocused: boolean;
  onSelectCharacter: (character: Character) => void;
  onRemoveCharacter: (id: number) => void;
  highlightQuery: (name: string) => string;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  dropdownItem,
  isSelected,
  isFocused,
  onSelectCharacter,
  onRemoveCharacter,
  highlightQuery,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isFocused]);

  return (
    <div
      ref={itemRef}
      tabIndex={0}
      className={`${s.dropdownItems} ${isSelected ? s.selected : ''}`}
      onClick={() => onSelectCharacter(dropdownItem)}
    >
      <div className={s.dropdownItemsInner}>
        <input
          type="checkbox"
          className={s.selectCheckbox}
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            if (isSelected) {
              onRemoveCharacter(dropdownItem.id);
            } else {
              onSelectCharacter(dropdownItem);
            }
          }}
          onClick={(e) => e.stopPropagation()}
        />

        <img
          src={dropdownItem.image}
          alt={dropdownItem.name}
          className={s.dropdownItemsImage}
        />

        <div className={s.dropdownItemInfoWrapper}>
          <p
            dangerouslySetInnerHTML={{
              __html: highlightQuery(dropdownItem.name),
            }}
            className={s.dropdownItemsName}
          />
          <p className={s.dropdownItemsInfo}>
            Episodes: {dropdownItem.episode.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DropdownItem;
