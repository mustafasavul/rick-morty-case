import React from 'react';
import s from './index.module.css';
import { SelectedCharacter } from '../interface';

interface SelectedItemsProps {
  selectedCharacters: SelectedCharacter[];
  onRemoveCharacter: (id: number) => void;
}

const SelectedItems: React.FC<SelectedItemsProps> = ({
  selectedCharacters,
  onRemoveCharacter,
}) => {
  return (
    <div className={s.selectedItems}>
      {selectedCharacters.map((character) => (
        <span key={character.id} className={s.selectedItem}>
          {character.name}
          <button
            className={s.removeItem}
            onClick={() => onRemoveCharacter(character.id)}
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
};

export default SelectedItems;
