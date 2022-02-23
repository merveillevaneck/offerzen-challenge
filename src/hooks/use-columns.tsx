import React, { useMemo } from 'react'

type Render = (rowData: any) => React.ReactNode

/**
 * A hook that composes a parent specific column definition using render calbacks.
 * @param showArchived a boolean determining if the archived cell should be rendered.
 * @param renderCandidate a render callback for rendering candidate cells
 * @param renderComms  a render callback for rendering comms cells
 * @param renderSalary a render callback for rendering salary cells
 * @param renderArchived a render callback for rendering archived cells
 */
export const useColumns = (
    showArchived: boolean, 
    renderCandidate: Render, 
    renderComms: Render, 
    renderSalary: Render,
    renderArchived: Render
    ) => {
  return useMemo(() => {
    const cols = [
      {
        field: 'image',
        title: 'Candidate',
        render: renderCandidate,
      },
      {
        field: 'role',
        title: 'Role',
      },
      {
        field: 'last_comms',
        title: 'Last communication',
        render: renderComms,
        flex: '100px'
      },
      {
        field: 'salary',
        title: 'Salary',
        render: renderSalary
      },
      {
        field: 'sent_by',
        title: 'Sent by',
      },
    ]

    if (showArchived) cols.push({
      title: '',
      field: 'arhived',
      render: renderArchived
    })

    return cols
  }, [
      showArchived,
      renderCandidate,
      renderComms,
      renderSalary,
      renderArchived
    ])
}