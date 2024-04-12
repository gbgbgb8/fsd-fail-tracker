function generatePost() {
    const version = document.getElementById('version').value;
    const type = document.getElementById('type').value;
    const location = document.getElementById('location').value;
    const mapLink = document.getElementById('mapLink').value;
    const details = document.getElementById('details').value;
    const attempts = document.getElementById('attempts').value;
    const fails = document.getElementById('fails').value;
    const successes = document.getElementById('successes').value;
    const timestamp = new Date().getTime();
    const referenceID = `FSD${timestamp}`;

    const post = `🚘 Tesla FSD Feedback 🚘\nVersion: ${version}\nType: ${type}\nLocation: ${location} ${mapLink}\nDetails: ${details}\nAttempts: ${attempts} | Fails: ${fails} | Successes: ${successes}\nReferenceID: ${referenceID}\n#TrainFSD #FSD${type}`;

    document.getElementById('output').value = post;
}

function copyToClipboard() {
    const outputText = document.getElementById('output');
    outputText.select();
    document.execCommand('copy');
}

document.getElementById('fsdForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generatePost();
});
