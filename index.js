const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

octokit.repos
    .getContents({
        owner: "tedneward",
        repo: "ArchKatas",
        path: ""
    })
    .then( (response) => {
        let jsons = response.data.filter( 
            (item) => (item.type === 'file') && 
            (item.name.endsWith('.json')));

        // Pick one at random
        let choice = getRandomInt(jsons.length);
        console.log("Your Kata is #" + choice + " at " + jsons[choice].url);

        octokit.repos.getContents({
            owner: "tedneward",
            repo: "ArchKatas",
            path: jsons[choice].path,
            mediaType: {
                format: "raw",
            },
        })
        .then((response) => {
            const kataJSON = JSON.parse(response.data) 
            console.log(kataJSON.title);
            console.log('\t' + kataJSON.description.join('\n\t'));
        })
    })
    .catch ( (error) => {
        console.log(error);
    });
