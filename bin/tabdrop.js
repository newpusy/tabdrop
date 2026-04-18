#!/usr/bin/env node

const { program } = require('commander');
const { exportSession } = require('../src/export');
const { importSession } = require('../src/import');
const pkg = require('../package.json');

program
  .name('tabdrop')
  .description('Export and restore browser tab sessions as markdown or JSON')
  .version(pkg.version);

program
  .command('export <file>')
  .description('Export a tab session to a file (md or json)')
  .option('-f, --format <format>', 'output format: md or json', 'md')
  .action((file, options) => {
    exportSession(file, options.format);
  });

program
  .command('import <file>')
  .description('Import a tab session from a file')
  .action((file) => {
    importSession(file);
  });

program.parse(process.argv);
