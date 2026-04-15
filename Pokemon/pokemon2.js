#!/usr/bin/env node

const axios = require("axios");
const inquirer = require("inquirer");

async function getPokemon(name) {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = res.data;

  const moves = data.moves.sort(() => 0.5 - Math.random()).slice(0, 5);

  const moveList = [];

  for (let m of moves) {
    const moveData = (await axios.get(m.move.url)).data;

    moveList.push({
      name: m.move.name,
      power: moveData.power || 50,
      accuracy: moveData.accuracy || 100,
      pp: moveData.pp || 10,
    });
  }

  return {
    name,
    hp: 300,
    moves: moveList,
  };
}

async function chooseMove(pokemon) {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: `${pokemon.name} - Choose your move:`,
      choices: pokemon.moves.map((m, i) => ({
        name: `${m.name} (Power=${m.power}, Acc=${m.accuracy}, PP=${m.pp})`,
        value: i,
      })),
    },
  ]);

  return pokemon.moves[choice];
}

function botMove(pokemon) {
  return pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)];
}

function applyMove(attacker, defender, move, enemyMove) {
  if (move.pp <= 0) {
    console.log(`${attacker.name} has no PP left!`);
    return;
  }

  if (move.pp < enemyMove.pp) {
    console.log(`${attacker.name}'s move failed (lower PP)!`);
    return;
  }

  const hit = Math.random() * 100 <= move.accuracy;

  if (!hit) {
    console.log(`${attacker.name}'s attack missed!`);
    move.pp--;
    return;
  }

  const damage = move.power;
  defender.hp -= damage;
  move.pp--;

  console.log(`${attacker.name} used ${move.name} → ${damage} damage!`);
}

async function battle() {
  const { playerName } = await inquirer.prompt([
    {
      type: "input",
      name: "playerName",
      message: "Choose your Pokemon:",
    },
  ]);

  const player = await getPokemon(playerName.toLowerCase());
  const bot = await getPokemon("charizard");

  console.log(`\nBattle: ${player.name} vs ${bot.name}`);

  while (player.hp > 0 && bot.hp > 0) {
    const playerMove = await chooseMove(player);
    const enemyMove = botMove(bot);

    console.log(`\nBot chose ${enemyMove.name}`);

    applyMove(player, bot, playerMove, enemyMove);
    applyMove(bot, player, enemyMove, playerMove);

    console.log(`\nHP → ${player.name}: ${player.hp} | ${bot.name}: ${bot.hp}`);
  }

  if (player.hp <= 0) {
    console.log("You lost!");
  } else {
    console.log("You won!");
  }
}

battle();