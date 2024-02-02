import React, {useEffect, useState} from 'react';
import s from './index.module.css';
import DropdownItem from '../DropdownItem';
import {Character, SelectedCharacter} from '../interface';

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
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        setFocusedIndex(prevIndex => {
          const maxIndex = menuItems.length - 1;
          const nextIndex = event.key === 'ArrowDown'
              ? (prevIndex === null ? 0 : (prevIndex + 1) % menuItems.length)
              : (prevIndex === null ? maxIndex : (prevIndex - 1 + menuItems.length) % menuItems.length);
          return nextIndex;
        });
      } else if (event.key === 'Enter' && focusedIndex !== null) {
        const selectedItem = menuItems[focusedIndex];
        const isSelected = selectedMenuItems.some(item => item.id === selectedItem.id);
        isSelected ? onRemoveCharacter(selectedItem.id) : onSelectCharacter(selectedItem);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, menuItems, onSelectCharacter, onRemoveCharacter, selectedMenuItems]);


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
