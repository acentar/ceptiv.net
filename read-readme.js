const fs = require('fs');
const path = require('path');

function readReadme() {
  try {
    const readmePath = path.join(__dirname, 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');

    console.log('=== README.md Content ===\n');
    console.log(readmeContent);
    console.log('\n=== End of README.md ===');

    return readmeContent;
  } catch (error) {
    console.error('Error reading README.md:', error.message);
    return null;
  }
}

// Export the function for use in other scripts
module.exports = { readReadme };

// If this script is run directly, execute the function
if (require.main === module) {
  readReadme();
}