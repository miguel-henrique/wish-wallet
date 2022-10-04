import React from 'react';
import { render, screen,fireEvent,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {MemoryRouter,BrowserRouter as Router} from 'react-router-dom'
import Edit from './Edit'

test('render input with the value of the token you want to edit and the Delete Button', async() => {
    const tokens=[{id:'1',name:'KLV',balance:'10,250.50'},{id:'2',name:'DVK',balance:'50,250.71'},
    {id:'3',name:'KFI',balance:'10'}]
    localStorage.setItem('tokens', JSON.stringify(tokens));
    render(<MemoryRouter initialEntries={['/edit/1']}> <Edit /> </MemoryRouter>)
    await waitFor(() =>{expect(screen.getByPlaceholderText('Token...')).toHaveValue('KLV');})
    await waitFor(() =>{expect( screen.getByPlaceholderText('Balance...')).toHaveValue('10,250.50')})
    await expect(screen.getAllByRole('button')[1]).toHaveTextContent('Delete');
});

test('When you submit the token, if the token info is valid, then update the tokens and show the array', async() => {
    const tokens=[{id:'1',name:'KLV',balance:'10,250.50'},{id:'2',name:'DVK',balance:'50,250.71'},
    {id:'3',name:'KFI',balance:'10'}]
    const desiredTokens={id:'1',name:'ZXY',balance:'110,25.20'}
    localStorage.setItem('tokens', JSON.stringify(tokens));
    const {getAllByRole,getByLabelText } = render(
        <MemoryRouter initialEntries={['/edit/1']}> <Edit /> </MemoryRouter>)
    await waitFor(() =>{expect(screen.getByPlaceholderText('Token...')).toHaveValue('KLV');})
    await waitFor(() =>{expect( screen.getByPlaceholderText('Balance...')).toHaveValue('10,250.50')})
    const tokenFiled= await waitFor(() =>{return ( screen.getByPlaceholderText('Token...'))})
   const balanceFiled= await waitFor(() =>{return ( screen.getByPlaceholderText('Balance...'))})
    fireEvent.change(tokenFiled,{target:{value:'ZXY'}})
    fireEvent.change( balanceFiled,{target:{value:'110,25.20'}})
      fireEvent.submit(getAllByRole('button')[2]);
      await waitFor(() =>{expect( screen.getByTestId('test')).toHaveTextContent(JSON.stringify(desiredTokens))})

    });

test('When you click the delete button, show allert and yes and no button', async() => {
        const tokens=[{id:'1',name:'KLV',balance:'10,250.50'},{id:'2',name:'DVK',balance:'50,250.71'},
        {id:'3',name:'KFI',balance:'10'}]
        localStorage.setItem('tokens', JSON.stringify(tokens));
        render(<MemoryRouter initialEntries={['/edit/1']}> <Edit /> </MemoryRouter>)
        await waitFor(() =>{expect(screen.getByPlaceholderText('Token...')).toHaveValue('KLV');})
        await waitFor(() =>{expect( screen.getByPlaceholderText('Balance...')).toHaveValue('10,250.50')})
        fireEvent.click(screen.getAllByRole('button')[1])
          await waitFor(() =>{expect(screen.getByText('Are you sure that you want to Delete this token?')).toBeInTheDocument()})
          await waitFor(() =>{expect(screen.getAllByRole('button')[3]).toHaveTextContent('Yes')})
          await waitFor(() =>{expect(screen.getAllByRole('button')[4]).toHaveTextContent('No')})
        });

test('When you click on the yes button,delete the token form local storage and return the new tokens array', async() => {
            const tokens=[{id:'1',name:'KLV',balance:'10,250.50'},{id:'2',name:'DVK',balance:'50,250.71'},
            {id:'3',name:'KFI',balance:'10'}]
            const desiredTokens=[{id:'2',name:'DVK',balance:'50,250.71'},
            {id:'3',name:'KFI',balance:'10'}]
            localStorage.setItem('tokens', JSON.stringify(tokens));
            render(<MemoryRouter initialEntries={['/edit/1']}> <Edit /> </MemoryRouter>)
            await waitFor(() =>{expect(screen.getByPlaceholderText('Token...')).toHaveValue('KLV');})
            await waitFor(() =>{expect( screen.getByPlaceholderText('Balance...')).toHaveValue('10,250.50')})
            fireEvent.click(screen.getAllByRole('button')[1])
              await waitFor(() =>{expect(screen.getByText('Are you sure that you want to Delete this token?')).toBeInTheDocument()})
              await waitFor(() =>{expect(screen.getAllByRole('button')[3]).toHaveTextContent('Yes')})
              await waitFor(() =>{expect(screen.getAllByRole('button')[4]).toHaveTextContent('No')})
              fireEvent.click(screen.getAllByRole('button')[3])
              await waitFor(() =>{expect( screen.getByTestId('test')).toHaveTextContent(JSON.stringify(desiredTokens))})
            });

test('When you click on the no button, close the alert', async() => {
            const tokens=[{id:'1',name:'KLV',balance:'10,250.50'},{id:'2',name:'DVK',balance:'50,250.71'},
            {id:'3',name:'KFI',balance:'10'}]
            localStorage.setItem('tokens', JSON.stringify(tokens));
            render(<MemoryRouter initialEntries={['/edit/1']}> <Edit /> </MemoryRouter>)
            await waitFor(() =>{expect(screen.getByPlaceholderText('Token...')).toHaveValue('KLV');})
            await waitFor(() =>{expect( screen.getByPlaceholderText('Balance...')).toHaveValue('10,250.50')})
            fireEvent.click(screen.getAllByRole('button')[1])
              await waitFor(() =>{expect(screen.getByText('Are you sure that you want to Delete this token?')).toBeInTheDocument()})
              await waitFor(() =>{expect(screen.getAllByRole('button')[3]).toHaveTextContent('Yes')})
              await waitFor(() =>{expect(screen.getAllByRole('button')[4]).toHaveTextContent('No')})
              fireEvent.click(screen.getAllByRole('button')[4])
              await waitFor(() =>{expect(screen.queryByText('Are you sure that you want to Delete this token?')).toBeNull()})
});
    