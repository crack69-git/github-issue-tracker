const modalView = async (id) => {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const issue = data.data;
    displayModal(issue);
}

displayModal = (issue) => {
    const modalContent = document.getElementById('modal-content');
    let priority = issue.priority ? issue.priority.trim() : '';
    let priorityClass = priority === 'high' ? 'badge-secondary text-white' : priority === 'medium' ? 'badge-warning text-white' : 'badge-ghost';
    let borderClass = issue.status === 'open' ? 'border-green-500' : 'border-purple-500';
    let statusColor = issue.status === 'open' ? 'badge-success text-white' : 'bg-purple-500 text-white';

    modalContent.innerHTML = `
        <div class="rounded-t pt-4">
            <div class="flex justify-between items-start mb-3">
                <h3 class="text-lg font-bold">${issue.title}</h3>
                
            </div>
            <div class="flex items-center gap-3 mb-4">
                <div class="badge ${statusColor}">${issue.status}</div>
                <i class="fa-solid fa-circle text-[5px]"></i>
                <p>Opened by ${issue.author}</p >
                <i class="fa-solid fa-circle text-[5px]"></i>
                <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div >
            <p class="mb-3">${issue.description}</p>
            <div class="card bg-base-100 w-full shadow-sm">
                <div class="card-body grid grid-cols-2">
                    <div>
                        <p>Assignee: </p>
                        <p class="font-semibold">Fahim Ahmed</p>
                    </div>
                    <div>
                        <p>Priority: </p>
                        <div class="badge ${priorityClass} ">${priority}</div>
                    </div>
                </div>
            </div>
        `;

    document.getElementById('my_modal_1').showModal();
}
