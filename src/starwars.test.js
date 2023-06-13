import { render, screen, act } from '@testing-library/react';
import ApiStarWars from './starwars';
import React from 'react';

const mockData = {
    results: [
      { name: 'X-Wing', model: 'T-65 X-wing', films: ['The Empire Strikes Back'],crew:"6" },
      { name: 'Y-Wing', model: 'BTL Y-wing', films: ['Revenge of the Sith', 'Return of the Jedi'],crew:"67,000" },
    ],
  };
// const mockSetState =  jest.fn(()=>{return mockData});
// const [data, setState] = React.useState([]);
// setState = mockSetState;


test('should render the component correctly', () => {
  const { getByText } = render(<ApiStarWars />);
  expect(getByText('Star Wars')).toBeInTheDocument();
});


test('should render the correct number of films', () => {
 

  const setSateMock = jest.fn(()=>mockData);
  const useStateMock = (initialState)=>[initialState,setSateMock];
  jest.spyOn(React,'useState').mockImplementation(useStateMock);

  act(() => {
    const mockFetch = jest.fn(() => Promise.resolve({ json: () => mockData }));
    global.fetch = mockFetch;
    const { getByText } = render(<ApiStarWars />);
    expect(getByText('Number of Films: 1')).toBeInTheDocument();
  });
  // assert on the output
  
 
 
});

test('should fetch the data correctly', () => {
 

  const setSateMock = jest.fn(()=>mockData);
  const useStateMock = (initialState)=>[initialState,setSateMock];
  jest.spyOn(React,'useState').mockImplementation(useStateMock);

  act(() => {
    const mockFetch = jest.fn(() => Promise.resolve({ json: () => mockData }));
    global.fetch = mockFetch;
    const mockSetState = jest.fn();
    const { getByText } = render(<ApiStarWars />);
    expect(mockFetch).toHaveBeenCalled();
    expect(getByText('X-Wing')).toBeInTheDocument();
  });

 
});