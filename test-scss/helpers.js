/* eslint-env node */

'use strict'

const process = require('node:process')
const BE_VERBOSE = process.argv.includes('-v')

const colors = { // could use https://github.com/chalk/chalk
  Reset: '\u001B[0m',
  Red: '\u001B[31m',
  Green: '\u001B[32m',
  Yellow: '\u001B[33m',
  Blue: '\u001B[34m',
  Magenta: '\u001B[35m',
  Cyan: '\u001B[36m'
}

const ErrorAssertion = function (module, test, assertionDetails) {
  this.module = module
  this.test = test
  this.assertionDetails = assertionDetails
}

const print = (msg, indent = 0, color = null, force = false) => {
  const indentSpaces = ' '.repeat(indent)
  msg = indentSpaces + msg.replaceAll('\n', '\n' + indentSpaces)

  if (!BE_VERBOSE && !force) {
    return
  }

  if (color) {
    // eslint-disable-next-line no-console
    console.log(`${color}%s${colors.Reset}`, msg)
    return
  }

  // eslint-disable-next-line no-console
  console.log(msg)
}

const printModule = (title, force = false) =>
  print('* ' + title, 4, colors.Blue, force) // print module title (describe)
const printTest = (title, force = false) =>
  print('- ' + title, 6, colors.Cyan, force)// print test title (it)
const printTestDetails = (title, force = false) =>
  print('- ' + title, 8, null, force)// print test title (it)

module.exports = {
  colors,
  ErrorAssertion,
  print,
  printModule,
  printTest,
  printTestDetails
}