import React, { useState } from 'react';
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
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
      <div>
        <div className={s.selectedItemsCount}>
          Selected Characters: <mark>{selectedCharacters.length}</mark>
        </div>
        <div className={s.selectedItems}>
          {selectedCharacters
              .slice(0, isExpanded ? selectedCharacters.length : 5)
              .map((character) => (
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
          {selectedCharacters.length > 5 && (
              <button onClick={toggleExpand} className={s.toggleExpandBtn}>
                {isExpanded ? 'View Less' : 'View More'}
              </button>
          )}
        </div>
      </div>
  );
};

export default SelectedItems;
