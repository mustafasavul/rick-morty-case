import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import { useCharacterSearch } from 'src/hooks/useCharacterSearch';
import { useCharacterSelection } from 'src/hooks/useCharacterSelection';
import SelectedItems from './SelectedItems';
import Loader from '../Loader';
import s from './index.module.css';

export const MultiSelectAutocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { characters, isLoading } = useCharacterSearch(inputValue);
  const { selectedCharacters, handleSelectCharacter, handleRemoveCharacter } =
    useCharacterSelection();

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' && !isDropdownOpen) {
      e.preventDefault();
      setIsDropdownOpen(true);
    }

    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  const highlightQuery = (name: string) => {
    if (!inputValue) return name;
    const regex = new RegExp(`(${inputValue})`, 'gi');
    return name.replace(regex, '<mark>$1</mark>');
  };

  return (
    <div className={s.multiSelectContainer}>
      {selectedCharacters.length > 0 && (
        <SelectedItems
          selectedCharacters={selectedCharacters}
          onRemoveCharacter={handleRemoveCharacter}
        />
      )}

      <input
        className={s.input}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsDropdownOpen(true)}
        onKeyDown={handleInputKeyDown}
        type="text"
        placeholder="Search for a character"
      />

      {isLoading ? (
        <div className={s.multiSelectContainerLoader}>
          <Loader />
        </div>
      ) : (
        isDropdownOpen && (
          <DropdownMenu
            menuItems={characters}
            selectedMenuItems={selectedCharacters}
            onSelectCharacter={handleSelectCharacter}
            onRemoveCharacter={handleRemoveCharacter}
            highlightQuery={highlightQuery}
          />
        )
      )}
    </div>
  );
};

export default MultiSelectAutocomplete;
