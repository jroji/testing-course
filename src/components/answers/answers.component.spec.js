import { AnswersComponent } from "./answers.component";
import { screen } from "@testing-library/dom";
import userEvent from '@testing-library/user-event'

describe('Testing Answer component', () => {
  let answers;
  let correctAnswer;

  beforeAll(() => {
    answers = ['Madrid', 'Pekin', 'Bilbao', 'Kiev'];
    correctAnswer = 'Madrid';

    new AnswersComponent(document.body, answers, correctAnswer);
  });

  test('should render a button for each answer', () => {
		// Seleccionamos los elementos del body que tengan el rol "button"
    const buttons = screen.getAllByRole('button');
		// Comprobamos que son visibles y que contienen el texto que corresponde
    buttons.forEach((button, i) => {
      expect(button).toBeVisible();
      expect(button).toHaveTextContent(answers[i])
    });
  });

  test('should validate the answer on button click', () => {
    // Seleccionamos el botón por texto, como haría el usuario
    const answer = screen.getByText('Bilbao');
    // Lanzamos click
    userEvent.click(answer);
		// custom properties ♥️
    expect(answer).toHaveStyle({ background: "var(--color-error)" });
  });
});