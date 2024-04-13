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
    const type = document.querySelector('input[name="type"]:checked').value;
    const location = document.getElementById('location').value;
    const mapLink = document.getElementById('mapLink').value;
    const details = document.getElementById('details').value;
    const attempts = document.getElementById('attempts').value;
    const fails = document.getElementById('fails').value;
    const successes = document.getElementById('successes').value;
    const weatherNotification = document.getElementById('weatherNotification').checked;
    const referenceID = document.getElementById('referenceID').value;
    const twitterHandle = document.getElementById('twitterHandle').value.trim();
    const twitterSearchURL = twitterHandle ? `https://twitter.com/search?q=from%3A${encodeURIComponent(twitterHandle)}%20%23TrainFSD` : '';

    let post = `🚘 Tesla FSD Feedback 🚘\nVersion: ${version}\nType: ${type}\nLocation: ${location} ${mapLink}\nDetails: ${details}\nAttempts: ${attempts} | Fails: ${fails} | Successes: ${successes}\nReferenceID: ${referenceID}\n#TrainFSD #FSD${type}`;

    if (weatherNotification) {
        post += `\n⚠︎ FSD Weather Notification on Screen: Yes`;
    }

    if (twitterSearchURL) {
        post += `\nSee more posts from this user: ${twitterSearchURL}`;
    }

    document.getElementById('output').value = post;
}

function copyToClipboard() {
    const outputText = document.getElementById('output');
    outputText.select();
    document.execCommand('copy');
}

function postToX() {
    const postText = document.getElementById('output').value; // Retrieve the generated post text from the textarea
    // Encode the post text to ensure it is URL-safe, which means converting special characters into a format that can be transmitted over the internet
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postText)}`;
    // Open the Twitter intent URL in a new browser tab, allowing the user to edit further or directly post it on Twitter
    window.open(xUrl, '_blank');
}

function copyTSVToClipboard() {
    const version = document.getElementById('version').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const location = document.getElementById('location').value;
    const mapLink = document.getElementById('mapLink').value;
    const details = document.getElementById('details').value.replace(/"/g, '\"'); // Escape double quotes
    const attempts = document.getElementById('attempts').value;
    const fails = document.getElementById('fails').value;
    const successes = document.getElementById('successes').value;
    const weatherNotification = document.getElementById('weatherNotification').checked ? "Yes" : "No";
    const referenceID = document.getElementById('referenceID').value;
    const twitterHandle = document.getElementById('twitterHandle').value;

    const tsvData = `Version\tType\tLocation\tMap Link\tDetails\tAttempts\tFails\tSuccesses\tWeather Notification\tReferenceID\tTwitter Handle\n` +
                    `${version}\t${type}\t${location}\t${mapLink}\t${details}\t${attempts}\t${fails}\t${successes}\t${weatherNotification}\t${referenceID}\t${twitterHandle}`;

    navigator.clipboard.writeText(tsvData).then(function() {
        console.log('TSV data copied to clipboard successfully!');
    }, function(err) {
        console.error('Could not copy TSV data to clipboard: ', err);
    });
}

function downloadCSV() {
    const version = document.getElementById('version').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const location = document.getElementById('location').value;
    const mapLink = document.getElementById('mapLink').value;
    const details = document.getElementById('details').value.replace(/"/g, '""'); // Properly escape quotes
    const attempts = document.getElementById('attempts').value;
    const fails = document.getElementById('fails').value;
    const successes = document.getElementById('successes').value;
    const weatherNotification = document.getElementById('weatherNotification').checked ? "Yes" : "No";
    const referenceID = document.getElementById('referenceID').value;
    const twitterHandle = document.getElementById('twitterHandle').value;

    const csvData = `"Version","Type","Location","Map Link","Details","Attempts","Fails","Successes","Weather Notification","ReferenceID","Twitter Handle"\n` +
                    `"${version}","${type}","${location}","${mapLink}","${details}","${attempts}","${fails}","${successes}","${weatherNotification}","${referenceID}","${twitterHandle}"`;

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.setAttribute("download", "fsd_feedback.csv");
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

document.getElementById('fsdForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generatePost();
});
