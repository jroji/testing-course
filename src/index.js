import { CountriesService } from "./components/countries/countries.service";
import { Quiz } from "./components/quiz/quiz.component";

const init = (element) => {
  localStorage.setItem('score', 0);
  const countryService = new CountriesService();
  new Quiz(element, countryService);
}

init(document.querySelector('.answers'));