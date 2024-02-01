import React, { useEffect, useState } from 'react';
import s from './index.module.css';
import DropdownItem from '../DropdownItem';
import { Character, SelectedCharacter } from '../interface';

interface DropdownMenuProps {
  menuItems: Character[];
  selectedMenuItems: SelectedCharacter[];
  onSelectCharacter: (character: Character) => void;
  onRemoveCharacter: (id: number) => void;
  highlightQuery: (name: string) => string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  menuItems,
  selectedMenuItems,
  onSelectCharacter,
  onRemoveCharacter,
  highlightQuery,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex((prevIndex) =>
            prevIndex === null ? 0 : (prevIndex + 1) % menuItems.length
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((prevIndex) =>
            prevIndex === null
              ? menuItems.length - 1
              : (prevIndex - 1 + menuItems.length) % menuItems.length
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (focusedIndex !== null) {
            onSelectCharacter(menuItems[focusedIndex]);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, menuItems, onSelectCharacter]);

  return (
    <div className={s.dropdown} tabIndex={-1}>
      {menuItems.map((el, index) => {
        return (
          <DropdownItem
            key={el.id}
            dropdownItem={el}
            isSelected={selectedMenuItems.some(
              (selected) => selected.id === el.id
            )}
            isFocused={index === focusedIndex}
            onSelectCharacter={onSelectCharacter}
            onRemoveCharacter={onRemoveCharacter}
            highlightQuery={highlightQuery}
          />
        );
      })}
    </div>
  );
};

export default DropdownMenu;
