const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('loder').classList.remove('hidden');
        document.getElementById('card-container').classList.add('hidden');
    }
    else {
        document.getElementById('loder').classList.add('hidden');
        document.getElementById('card-container').classList.remove('hidden');
    }
}




function setActiveButton(activeId) {
    ['btn-all', 'btn-open', 'btn-closed'].forEach(id => {
        const btn = document.getElementById(id);
        if (id === activeId) {
            btn.classList.remove('btn-outline');
            btn.classList.add('btn-primary');
        } else {
            btn.classList.add('btn-outline');
            btn.classList.remove('btn-primary');
        }
    });
}

function loadHomepage() {
    manageSpinner(true);
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayIssues(data.data));
}
function displayIssues(issues) {
    const issuesContainer = document.getElementById("issue-container");
    issuesContainer.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="flex justify-between">
            <div class="flex items-center gap-4">
                <div class="rounded-full p-2 bg-[#ECE4FF]">
                    <img src="assets/Aperture.png" alt="Aperture Logo" />
                </div>
                <div>
                    <h4 class="font-semibold text-xl">${issues.length} Issues</h4>
                    <p class="text-[#64748B]">Track and manage your project issues</p>
                </div>
            </div>
            <div class="flex flex-row items-center gap-4">
                <div>
                    <p><i class="text-green-500 mr-2 fa-solid fa-circle"></i>Open</p>
                </div>
                <div>
                    <p><i class="text-purple-500 mr-2 fa-solid fa-circle"></i>Closed</p>
                </div>
            </div>
        </div>
    `;
    issuesContainer.appendChild(div);

    const cardsContainer = document.getElementById("card-container");
    cardsContainer.innerHTML = "";
    issues.forEach((issue) => {
        const div = document.createElement("div");
        // Fix dynamic badge class assignment
        // Use issue.priority from API, fallback if missing
        let priority = issue.priority ? issue.priority.trim() : '';
        let priorityClass = priority === 'high' ? 'badge-secondary' : priority === 'medium' ? 'badge-warning' : 'badge-ghost';
        let borderClass = issue.status === 'open' ? 'border-green-500' : 'border-purple-500';
        div.innerHTML = `
        
            <div onclick="modalView('${issue.id}')" class="card bg-base-100 shadow-lg border-t-6 ${borderClass} border-primary w-full h-full cursor-pointer">
                <div class="card-body">
                    <div class="flex gap-3 justify-between">
                        <img src="assets/Open-Status.png" alt="Open Status" class="w-6 h-6">
                        <div class="badge badge-soft font-medium ${priorityClass}">${issue.priority}</div>
                    </div>
                    <p class="text-sm font-bold">${issue.title}</p>
                    <p class="line-clamp-2 text-xs text-[#64748B]">${issue.description}</p>
                    <div class="flex flex-wrap gap-2">
                        ${issue.labels.map(label => `
                            <div class="badge badge-soft ${label === 'bug' ? 'badge-error' : label === 'help wanted' ? 'badge-warning' : label === 'enhancement' ? ' badge-success' : 'badge-ghost'}">${label}</div>

                            `
        ).join('')}     
                         </div>
                    <div class="divider"></div>
                    <p class="text-[#64748B]">${issue.author}</p>
                        <p class="text-[#64748B]">${new Date(issue.createdAt).toISOString().split('T')[0]}</p>
                </div>
            </div>
        `;
        cardsContainer.appendChild(div);
    });
    manageSpinner(false);
}
loadHomepage();