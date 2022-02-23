import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'
import { get } from 'lodash'
import { RowData } from '../types'

interface Column {
    title: string,
    field: string,
    render?: (rowData: any) => React.ReactNode | null,
    flex?: number | string,
    style?: (rowData: any) => React.CSSProperties
}

interface TableProps {
    columns: Column[],
    className?: string,
    style?: React.CSSProperties,
    data: RowData[],
    rowStyle?: (rowData: RowData) => React.CSSProperties
}

const TableBase = styled.div`
    width: 100%;
    border: 1px solid white;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
`

const Cell = styled.div<{$bold?: boolean, flex?: number | string}>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    padding: 5px;
    padding-left: 12px;
    ${ p => p.$bold && css`font-weight: bold;` }
    ${ p => p.flex && css`flex: ${p.flex};` }
`

const Row = styled.div<{$dark?: boolean, $header?: boolean}>`
    display: flex;
    justify-content: flex-start;
    background: ${ p => p.$dark ? '#F9FAFB' : 'white' };
    ${ p => p.$dark && css`background: #F9FAFB;` }
    align-items: stretch;
    height: ${ p => p.$header ? 40 : 50 }px;
    border-bottom: 1px solid #EEF3F6;
    color: '#7C7C80';
`

const Empty = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`

/**
 * Table is a reusable component that renders a table with the same style and functionality
 * as given by the designs. The table will only render the data given to it by the its parent.
 * It will also display a content placeholder whenever no data is present. Table is not responsive.
 * @param columns The column definitions of the table. Defining title and flex.
 * @param data The data matching the column definitions. Based on the given shape
 * of data that can be provided to this type of table.
 * @param rowStyle Individual style overrides to target specific rows. This is a callback that receives
 * the rowData of each row and returns a suitable CSS style object. Provded by the parent of Table.
 */

export const Table: React.FC<TableProps> = ({
    columns,
    data,
    rowStyle,
    style,
    className,
    ...props
}) => {

    const isEmpty = useMemo(() => data.length === 0, [data])

    if (isEmpty) return (
        <TableBase style={style} className={`table-container ${className}`}>
            <Row $dark={true} $header={true}>
                {
                    columns.map((col: Column) => <Cell flex={col.flex} $bold={true}>{col.title}</Cell>)
                }
            </Row>
            <Empty>
                No data to display
            </Empty>
        </TableBase>
    )

    return (
        <TableBase style={style} className={`table-container ${className}`}>
            <Row $dark={true} $header={true}>
                {
                    columns.map((col: Column) => <Cell flex={col.flex} $bold={true}>{col.title}</Cell>)
                }
            </Row>
            {
                data.map((datum: any) => (
                    <Row style={rowStyle ? rowStyle(datum) : undefined}>
                        {
                            columns.map((col: Column) => {
                                const value = get(datum, col.field, null)
                                const render = col.render ? col.render(datum) : null

                                const style = col.style ? col.style(datum) : undefined

                                if (render) return <Cell style={style} flex={col.flex}>{render}</Cell>
                                return <Cell style={style} flex={col.flex}>
                                    {value}
                                </Cell>
                            })
                        }
                    </Row>
                ))
            }
        </TableBase>
    )
}
