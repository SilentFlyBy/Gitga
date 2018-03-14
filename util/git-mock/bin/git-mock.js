#!/usr/bin/env node

const gitMock = require('../git-mock')

gitMock(process.argv.slice(2))