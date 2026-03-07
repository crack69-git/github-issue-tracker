function loadClosedIssues() {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const closedIssues = data.data.filter(issue => issue.status === 'closed');
            displayIssues(closedIssues);
        });
}