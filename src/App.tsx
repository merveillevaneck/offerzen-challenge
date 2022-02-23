import { useCallback, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components'
import { SearchOutlined } from '@material-ui/icons'
import moment from 'moment'
import initialData from './data.json'
import { Theme } from './theme'
import { ReactComponent as Logo } from './assets/Logo.svg'
import { Input, Checkbox, Table } from './components'
import { useColumns, useSearch } from './hooks'
import { RowData } from './types';
import { useArchived } from './hooks/use-archived';

const Header = styled.div`
  height: ${ p => p.theme.headerHeight }px;
  background: ${ p => p.theme.main };
  padding-left: ${ p => p.theme.pagePadding }px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
`

const AppContainer = styled.div`
  width: calc(100% - ${ p => p.theme.pagePadding }px);
  height: 100%;
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px ${ p => p.theme.pagePadding }px;
  padding-bottom: 0;
  background: ${ p => p.theme.background };
  width: calc(100% - ${ p => p.theme.pagePadding }px);
  min-height: calc(100vh - ${ p => p.theme.headerHeight }px - 20px);

  font-size: 12px;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

export const FirstCell = styled.div`

  display: flex;
  justify-content: start;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    margin-right: 12px;
  }
  span {
    margin: 0;
    padding: 0;
  }
`

export const LastComms = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  div.oval {
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
    div {
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background: #34B96F;
    }
    margin-right: 10px;
  }

  span {
    height: inherit;
    margin-right: 10px;
  }

  span.label {
    font-size: 10px;
    opacity: 0.6;
  }

`

const SearchContainer = styled.div`
  background: white;
  width: calc(100% - ${ p => p.theme.pagePadding }px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  padding-left: ${ p => p.theme.pagePadding }px;
  padding-right: 0;
`

const CountOuter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
  span {
    padding: 2px;
    color: #7C7C80;
    font-size: 12px;
  }
`

const Search = styled(Input)`
  height: 40px;
  width: 210px;
  input {
    font-size: 15px;
    border: none;
    color: #A6ACAF;
  }
  input:focus-visible {
    outline: none;
  }
  input::placeholder {
    color: #A6ACAF;
  }
  svg {
    color: #DAE0E4;
  }
  padding: 5px 14px;
  border: 1px solid #E4EBEF;
  border-radius: 4px;
`

const Archived = styled(Checkbox)`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  input {
    margin: 0;
    margin-left: 10px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;

    border: 1px solid #5EA5EE;
    border-radius: 2px;
  }
  & > input:checked {
    background: #E4F0FC;
    color: #5EA5EE;
  }
`

const ArchiveButton = styled.span`
  font-size: 12px;
  color: #5EA5EE;
  cursor: pointer;
  width: 80%;
  text-align: right;
  font-weight: normal;
`


function App() {

  const [checked, handleOnCheckChange] = useState<boolean>(false);

  const [data, handleArchived] = useArchived(initialData);

  const [rows, { query, onChange }] = useSearch(data);

  /**
   * Render Candidate cell. Ideally should be a compound component and part of Table.
   */
  const renderCandidate = useCallback((rowData: RowData) => (
    <FirstCell>
      <img  width={30} height={30} src={rowData.image} alt='candidate' />
      <span>{rowData.candidate}</span>
    </FirstCell>
  ), [])
  
  /**
   * Render LastComms cell. Ideally should be a compound component and part of Table.
   */
  const renderLastComms = useCallback((rowData: RowData) => (
    <LastComms>
      <div className='oval'>
        <div hidden={!rowData.last_comms.unread} />
      </div>
      <span>{rowData.last_comms.description}</span>
      <span className='label'>
        {moment(rowData.last_comms.date_time).calendar()}
      </span>
    </LastComms>
  ), [])

  /**
   * Render Salary cell. Ideally should be a compound component and part of Table.
   */
  const renderSalary = useCallback((rowData: RowData) => (
    <span>R{rowData.salary}</span>
  ), [])


  /**
   * Render Salary cell. Ideally should be a compound component and part of Table.
   */
  const renderArchived = useCallback((rowData: RowData) => (
    <ArchiveButton onClick={handleArchived(rowData.image)}>
      { rowData.archived ? 'Unarchive' : 'Archive' }
    </ArchiveButton>
  ), [handleArchived])

  /**
   * Fetch specific columns definiton object based on archived value.
   */
  const columns = useColumns(
    checked,
    renderCandidate,
    renderLastComms,
    renderSalary,
    renderArchived
  )

  return (
    <ThemeProvider theme={Theme}>
      <AppContainer>
        <Header>
          <Logo width={118} height={24} />
        </Header>
        <SearchContainer>
          <Search 
            value={query}
            onChange={onChange}
            label='Search'
            adornment={<SearchOutlined  />}
          />
          <Archived
            checked={checked} 
            onChange={handleOnCheckChange}
            label='Show archived'
          />
        </SearchContainer>
        <Page>
          <CountOuter>
            <span>{data.length} interview requests</span>
          </CountOuter>
            <Table
              columns={columns}
              data={rows}
              rowStyle={(rowData: RowData) => ({ 
                background: rowData.archived ? '#F9FAFB' : undefined,
                fontWeight: rowData.last_comms.unread ? 600 : undefined
              })}
            />
        </Page>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
