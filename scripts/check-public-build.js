const { readdirSync } = require('fs')
const { sep } = require('path')

// Reject private metadata and local credential files anywhere in the Pages output.
const privateName = /^(?:\.git(?:-credentials)?|\.env(?:\..*)?|\.dev\.vars(?:\..*)?|\.aws|\.ssh|\.npmrc|\.pypirc|credentials\.json|service-account-key\.json)$/i
const privateEntry = readdirSync('dist', { recursive: true })
  .find(entry => entry.split(sep).some(name => privateName.test(name)))

if (privateEntry) {
  throw new Error('Private file or directory in dist: ' + privateEntry + '. Remove it from the public build.')
}
