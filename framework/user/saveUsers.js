const fs = require('fs');
const filePath = 'data/users.json'
module.exports = (users) => {
    const data = JSON.stringify(users, null, 2);

    fs.writeFile(filePath, data, (err) => {
        if (err) throw err;
        console.log(`Users has been saved to ${filePath}`);
    });
}
