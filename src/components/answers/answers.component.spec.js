import { AnswersComponent } from "./answers.component";
import { screen, waitFor } from "@testing-library/dom";
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event'

const getBodyMain = () => {
  const main = document.createElement('main');
  document.body.appendChild(main);

  return main;
};

describe('Testing Answer component', () => {
  let answers;
  let correctAnswer;

  beforeAll(() => {
    answers = ['Madrid', 'Pekin', 'Bilbao', 'Kiev'];
    correctAnswer = 'Madrid';
    const main = getBodyMain();
    new AnswersComponent(main, answers, correctAnswer);
  });

  test('should match snapshot', () => {
    expect(document.body).toMatchSnapshot();
  });

  test('should pass a11y validation', async () => {
    expect(await axe(document.body)).toHaveNoViolations();
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

    beforeAll(async () => {
      answer = screen.getByText('Bilbao');
      userEvent.click(answer);
    });

    test('should validate', () => {
      waitFor(() => expect(answer).toHaveClass('incorrect'));
    });

    test('should disable all buttons', () => {
      screen.getAllByRole('button').forEach((button) => {
        waitFor(() => expect(button).toBeDisabled());
      });
    });

    test('should show the correct answer', async () => {
      const correctButton = screen.getByText(correctAnswer)
      waitFor(() => expect(correctButton).toHaveClass('correct'));
    });
  });

  describe('after click on a correct answer', () => {
    let answer;

    beforeAll(() => {
      answer = screen.getByText(correctAnswer);
      userEvent.click(answer);
    });

    test('should validate', async () => {
      waitFor(() => expect(answer).toHaveClass('correct'));
    });
  });
});