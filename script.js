function toggleMoreInfo() {
    var info = document.getElementById("moreInfo");
    if (info.style.display === "none") {
        info.style.display = "block";
    } else {
        info.style.display = "none";
    }
}

function generatePost() {
    const version = document.getElementById('version').value;
    const type = document.getElementById('type').value;
    const location = document.getElementById('location').value;
    const mapLink = document.getElementById('mapLink').value;
    const details = document.getElementById('details').value;
    const attempts = document.getElementById('attempts').value;
    const fails = document.getElementById('fails').value;
    const successes = document.getElementById('successes').value;
    const weatherNotification = document.getElementById('weatherNotification').checked;
    const timestamp = new Date().getTime();
    const referenceID = `FSD${timestamp}`;
    const feedbackURL = 'https://fsd-fail-tracker.vercel.app';

    let post = `🚘 Tesla FSD Feedback 🚘\nVersion: ${version}\nType: ${type}\nLocation: ${location} ${mapLink}\nDetails: ${details}\nAttempts: ${attempts} | Fails: ${fails} | Successes: ${successes}\nReferenceID: ${referenceID}\n#TrainFSD #FSD${type}`;
    
    if (weatherNotification) {
        post += `\n⚠︎ FSD Weather Notification on Screen: Yes`;
    }

    post += `\nLog FSD Feedback: ${feedbackURL}`;

    document.getElementById('output').value = post;
}


function copyToClipboard() {
    const outputText = document.getElementById('output');
    outputText.select();
    document.execCommand('copy');
}

function postToX() {
    const postText = document.getElementById('output').value;
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postText)}`;
    window.open(xUrl, '_blank');
}

document.getElementById('fsdForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generatePost();
});
