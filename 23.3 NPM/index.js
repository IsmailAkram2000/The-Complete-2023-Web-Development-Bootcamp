import generateName from 'sillyname'
import {randomSuperhero} from 'superheroes';

var sillyname = generateName()
console.log(sillyname);

var superhero = randomSuperhero();
console.log(`I'm ${superhero}`);