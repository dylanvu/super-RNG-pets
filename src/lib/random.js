import { Random } from 'random-js';

const random = new Random();

export const GeneratePseudoRandom = (min, max) => {
    // max and min are included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const GenerateRandom = (min, max) => {
    // Min and max included
    return random.integer(min, max)
}