// const socket = io();
//         const currentUser = "<%= currentUser._id %>";
//         const receiverId = "<%= receiver ? receiver._id : '' %>";

//         function sendMessage() {
//             const message = document.getElementById("message").value;
//             if (message.trim() === "") return;

//             fetch(`/chat/${receiverId}`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ message })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.success) {
//                     const chatBox = document.getElementById("chatBox");
//                     chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
//                     document.getElementById("message").value = "";
//                 }
//             });
//         }