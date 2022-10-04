import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Home from './Home'
import { MemoryRouter } from 'react-router';


test('renders the main heading, the search input', () => {
   const { getByText,getByRole } =  render(<MemoryRouter><Home/></MemoryRouter>);
     expect(getByText("Wish Wallet")).toBeTruthy();
    });
    
test('render the list from the tokens array on the local storage', async() => {
    const tokens=[{id:'1',name:'KLV',balance:'10,250.50'},{id:'2',name:'DVK',balance:'50,250.71'},
    {id:'3',name:'KFI',balance:'10'}]
    localStorage.setItem('tokens', JSON.stringify(tokens));

  render( <MemoryRouter><Home/></MemoryRouter>);
  const tokenItems =  await screen.findAllByRole('heading');
   expect(tokenItems.filter(token=>token.id==='1')[0]).toHaveTextContent('KLV');
   expect(tokenItems.filter(token=>token.id==='2')[0]).toHaveTextContent('DVK');
   expect(tokenItems.filter(token=>token.id==='3')[0]).toHaveTextContent('KFI');
});



