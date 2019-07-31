import React from 'react';
import ReactDOM from 'react-dom';

import { render, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

// import App from './App';
import Square from './Square';
import Board from './Board';
import AboutUs from './AboutUs';
import Scoreboard from './Scoreboard';

afterEach(cleanup);

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

it('renders a square', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Square />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the game board', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Board squares={[null,null,null,null,null,null,null,null,null]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the reset button', () => {
  const { getByText } = render(<Board squares={["X","X","X","X","X","X","X","X","X"]} />);
  expect( getByText('Reset') ).toBeVisible();
});

it('shows X winner correctly', () => {
  const { getByText } = render(<Board squares={["X","X","X","X","X","X","X","X","X"]} />);
  expect( getByText('Winner: X') ).toBeVisible();
});

it('shows that a draw has occured', () => {
  const { getByText } = render(<Board squares={["O","O","X","X","X","O","O","X","O",]} />);
  expect( getByText('Its a draw!') ).toBeVisible();
});
it('checks if about us text apears', () => {
  const { getByText } = render(<AboutUs />);
  expect( getByText('About Us') ).toBeVisible();
});
it('Checks that reset button will reset player scores after max score', () => {
  const {getByText} = render(<Scoreboard/>);
  expect( getByText('5/4') ).not.toBeVisible();

});
