import { Pipe, PipeTransform } from '@angular/core';
import { Character, IFilterPayload } from '../../models/character.model';

@Pipe({
  name: 'charactersFilter'
})
export class CharactersFilterPipe implements PipeTransform {

  transform(value: Character[], ...args: IFilterPayload[]): Character[] {   
    const filtered =  filterCharacters(value as Character[], args[0] as IFilterPayload);
    return filtered;
  }
}

/**
 * Filters a list of characters based on the filter payload
 * @param characters Array of Character objects to filter
 * @param filterPayload Object containing filter criteria
 * @returns Filtered array of Character objects
 */
export function filterCharacters(characters: Character[], filterPayload: IFilterPayload): Character[] {
  // Return all characters if filter payload is empty or all values are empty
  if (!filterPayload || Object.values(filterPayload).every(val => val === null || val === '')) {
    return characters;
  }

  return characters.filter(character => {
    // Check each filter property that exists in the payload
    // Only apply filters for properties that are not null or empty string

    // Name filter (case-insensitive partial match)
    if (filterPayload.name && filterPayload.name.trim() !== '') {
      if (!character.name.toLowerCase().includes(filterPayload.name.toLowerCase())) {
        return false;
      }
    }

    // Status filter (exact match)
    if (filterPayload.status && filterPayload.status !== '') {
      if (character.status.toLowerCase() !== filterPayload.status.toLowerCase()) {
        return false;
      }
    }

    // Species filter (exact match)
    if (filterPayload.species && filterPayload.species !== '') {
      if (character.species !== filterPayload.species) {
        return false;
      }
    }

    // Gender filter (exact match)
    if (filterPayload.gender && filterPayload.gender !== '') {
      if (character.gender !== filterPayload.gender) {
        return false;
      }
    }

    // Type filter (exact match)
    if (filterPayload.type && filterPayload.type !== '') {
      if (character.type !== filterPayload.type) {
        return false;
      }
    }
    // Character passed all applied filters
    return true;
  });
}
