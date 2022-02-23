import { useState, useMemo, useCallback } from 'react';
import { RowData } from "../types";

/**
 * A reusable hook that implements a basic filter function. This can be easily
 * adapted to provide more complex filtering functionality. The hook returns the
 * minimum required assets that the parent component should implement. i.e. query string
 * for state of the input, onChange to handle input change, and rows that are passed to the
 * table or other UI component using this state hook.
 * @param data The row data to be passed to a Table or UI component.
 * @returns A destructurable array consisting of the filtered array of row,
 * the onChange handler, as well as the current value of the query string.
 */
export const useSearch = (data: RowData[]) => {
  const [query, setQuery] = useState<string>('');

  const rows = useMemo(() => {
    if (!query) return data;
    return data.filter((row: RowData) => {
      return JSON.stringify(row).includes(query);
    });
  }, [query, data]);

  const onChange = useCallback((value: string) => {
    setQuery(value);
  }, [setQuery]);

  return useMemo(() => [
    rows, { query, onChange }
  ] as const, [
    rows, query, onChange
  ]);
}