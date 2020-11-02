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

  describe('after click on a incorrect answer', () => {
    let answer;

    beforeAll(() => {
      answer = screen.getByText('Bilbao');
      userEvent.click(answer);
    });

    test('should validate', () => {
      expect(answer).toHaveClass('incorrect');
    });

    test('should disable all buttons', () => {
      screen.getAllByRole('button').forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    test('should show the correct answer', () => {
      const correctButton = screen.getByText(correctAnswer)
      expect(correctButton).toHaveClass('correct');
    })
  });

  describe('after click on a correct answer', () => {
    let answer;

    beforeAll(() => {
      answer = screen.getByText(correctAnswer);
      userEvent.click(answer);
    });

    test('should validate', () => {
      expect(answer).toHaveClass('correct');
    });
  });
});