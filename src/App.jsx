import { useState } from 'react';

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

const SORT_ALPHA = 'abc';
const SORT_LENGTH = 'length';
const SORT_REVERSE = false;

function sortFunction(goods, sortType, isReverse) {
  const visibleGoods = [...goods];

  if (sortType) {
    if (isReverse) {
      visibleGoods.sort((good1, good2) => {
        switch (sortType) {
          case SORT_ALPHA:
            return good2.localeCompare(good1);
          case SORT_LENGTH:
            return good2.length - good1.length;
          default:
            return 0;
        }
      });
    } else {
      visibleGoods.sort((good1, good2) => {
        switch (sortType) {
          case SORT_ALPHA:
            return good1.localeCompare(good2);
          case SORT_LENGTH:
            return good1.length - good2.length;
          default:
            return 0;
        }
      });
    }
  }

  return visibleGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = sortFunction(goodsFromServer, sortField, reverseField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={() => {
            setSortField(SORT_ALPHA);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => {
            setSortField(SORT_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={() => {
            setReverseField(!SORT_REVERSE);
          }}
        >
          Reverse
        </button>

        {sortField !== '' && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
