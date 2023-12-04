/// <reference path="../../pb_data/types.d.ts" />

const adjectives = ['chiflado', 'zopenco', 'botarate', 'parlante', 'silecioso', 'caotico', 'solitario', 'ruidoso', 'colorido'];
const nouns = ['bosque', 'lago', 'lobo', 'oso', 'piso', 'cielo', 'caos', 'zapato', 'camino'];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateUsername() {
    const adjective = adjectives[getRandomInt(adjectives.length)];
    const noun = nouns[getRandomInt(nouns.length)];
    const number = getRandomInt(100);

    return `${noun}${adjective}${number}`;
}

module.exports = { adjectives, nouns, getRandomInt, generateUsername };