async function loadClientData() {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) return alert("No client ID provided.");

  try {
    const res = await fetch("/data/clients.json");
    const data = await res.json();
    const client = data[id];
    if (!client) return alert("Client not found.");

    document.body.innerHTML = document.body.innerHTML
      .replace(/Client Name/g, client.clientName)
      .replace("[Client Email]", client.email)
      .replace("[Project Title]", client.projectTitle)
      .replace("[Type]", client.type)
      .replace("[Google Drive Link]", "View Footage")
      .replace(/href=\"#\"/, `href=\"${client.footage}\"`)
      .replace("[Cinematic / Fast-cut / Aesthetic]", client.style)
      .replace("[X]", client.videoCount)
      .replace("[Date]", client.deliveryDate)
      .replace("₹[Amount]", "₹" + client.amount)
      .replace("Due Date:</span> [Date]", `Due Date:</span> ${client.dueDate}`)
      .replace("yourdomain.com/client/[client-id]", client.clientLink);
  } catch (err) {
    console.error(err);
    alert("Failed to load client data.");
  }
}

loadClientData();
