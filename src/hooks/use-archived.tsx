import { useState, useMemo, useCallback } from 'react'
import { RowData } from '../types'

export const useArchived = (initialData: RowData[]) => {
    const [data, setData] = useState<RowData[]>(initialData)

    const handleArchived = useCallback((id: string) => () => {
        const found = data.find((row: RowData) => row.image === id)
        if (!found) return
        setData(
            (data: RowData[]) => data.map(
                (datum: RowData) => datum.image === id ? { ...found, archived: !found.archived } : datum
            )
        )
    }, [data, setData])

    return useMemo(() => [
        data,
        handleArchived
    ] as const, [
        data,
        handleArchived
    ])
}