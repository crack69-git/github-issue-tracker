function loadOpenIssues() {
    manageSpinner(true);
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const openIssues = data.data.filter(issue => issue.status === 'open');
            displayIssues(openIssues);
        });
}