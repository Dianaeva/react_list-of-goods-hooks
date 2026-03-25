import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  byAlphabet = 'alphabet',
  byLength = 'length',
}

enum FilterType {
  reverse = 'reverse',
}

export const App: React.FC = () => {
  const [filterBy, setFilterBy] = useState<FilterType[]>([]);
  const [sortBy, setSortBy] = useState<SortType | ''>('');

  const preparedGoods = [...goodsFromServer];

  if (sortBy === SortType.byAlphabet) {
    preparedGoods.sort((a, b) => {
      return a.localeCompare(b);
    });
  }

  if (sortBy === SortType.byLength) {
    preparedGoods.sort((a, b) => {
      return a.length - b.length;
    });
  }

  if (filterBy.includes(FilterType.reverse)) {
    preparedGoods.reverse();
  }

  function setFilter(filter: FilterType) {
    setFilterBy(prevFilters => {
      if (filterBy.includes(filter)) {
        return prevFilters.filter(i => i !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortType.byAlphabet,
          })}
          onClick={() => setSortBy(SortType.byAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortType.byLength,
          })}
          onClick={() => setSortBy(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !filterBy.includes(FilterType.reverse),
          })}
          onClick={() => setFilter(FilterType.reverse)}
        >
          Reverse
        </button>

        {(filterBy.length !== 0 || sortBy !== '') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setFilterBy([]);
              setSortBy('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
