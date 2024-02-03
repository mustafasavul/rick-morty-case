import React, { useEffect, useRef, useState } from 'react';
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
  const [isImageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setImageVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isFocused]);

  const handleClick = (e) => {
    if (e.target.type !== 'checkbox') {
      if (isSelected) {
        onRemoveCharacter(dropdownItem.id);
      } else {
        onSelectCharacter(dropdownItem);
      }
    }
  };

  return (
    <div
      ref={itemRef}
      tabIndex={0}
      className={`${s.dropdownItems} ${isSelected ? s.selected : ''} ${
        isFocused ? s.focused : ''
      }`}
      onClick={handleClick}
      role="button"
      aria-pressed={isSelected}
    >
      <div className={s.dropdownItemsInner}>
        <input
          type="checkbox"
          className={s.selectCheckbox}
          checked={isSelected}
          onChange={() => {}}
          onClick={(e) => e.stopPropagation()}
        />

        {isImageVisible && (
          <img
            src={dropdownItem.image}
            alt={dropdownItem.name}
            className={s.dropdownItemsImage}
          />
        )}

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
