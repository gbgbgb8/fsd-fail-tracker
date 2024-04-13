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
    
    // Construct the Twitter search URL only if a handle is provided
    const twitterSearchURL = twitterHandle ? `https://twitter.com/search?q=from%3A${encodeURIComponent(twitterHandle)}%20%23TrainFSD` : '';

    let post = `🚘 Tesla FSD Feedback 🚘\nVersion: ${version}\nType: ${type}\nLocation: ${location} ${mapLink}\nDetails: ${details}\nAttempts: ${attempts} | Fails: ${fails} | Successes: ${successes}\nReferenceID: ${referenceID}\n#TrainFSD #FSD${type}`;

    if (weatherNotification) {
        post += `\n⚠︎ FSD Weather Notification on Screen: Yes`;
    }

    post += `\nLog FSD Feedback: ${feedbackURL}`;

    // Add the Twitter search URL to the post if it exists
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

function copyTSVToClipboard() {
    const version = document.getElementById('version').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const location = document.getElementById('location').value;
    const mapLink = document.getElementById('mapLink').value;
    const details = document.getElementById('details').value.replace(/"/g, '\"');  // Although not typically necessary in TSV, it's good practice
    const attempts = document.getElementById('attempts').value;
    const fails = document.getElementById('fails').value;
    const successes = document.getElementById('successes').value;
    const weatherNotification = document.getElementById('weatherNotification').checked ? "Yes" : "No";
    const referenceID = document.getElementById('referenceID').value;
    const twitterHandle = document.getElementById('twitterHandle').value; // Added twitter handle

    // Include the Twitter handle in the TSV output
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
    const details = document.getElementById('details').value.replace(/"/g, '""');  // Properly escape quotes
    const attempts = document.getElementById('attempts').value;
    const fails = document.getElementById('fails').value;
    const successes = document.getElementById('successes').value;
    const weatherNotification = document.getElementById('weatherNotification').checked ? "Yes" : "No";
    const referenceID = document.getElementById('referenceID').value;
    const twitterHandle = document.getElementById('twitterHandle').value; // Added twitter handle

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


function postToX() {
    const postText = document.getElementById('output').value;
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postText)}`;
    window.open(xUrl, '_blank');
}

document.getElementById('fsdForm').addEventListener('submit', function(event) {
    event.preventDefault();
    generatePost();
});
