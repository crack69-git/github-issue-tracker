function searchIssues() {
    const inputValue = document.getElementById('search').value.trim();
    if (!inputValue) {
        loadHomepage();
        return;
    }
    manageSpinner(true);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayIssues(data.data));
}
