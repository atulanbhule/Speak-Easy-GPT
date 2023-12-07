// javascript.js

async function postData(url = "", data = {}) {
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  
  const populateUsingGpt = async (input) => {
    try {
      const data = await postData("/api", { input: input });
      document.querySelector(".chats").innerHTML += `<div>Question: ${input}</div>
        <div>Answer: ${data.message}</div><hr>`;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
// ...

let recognition;

document.addEventListener("DOMContentLoaded", () => {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.interimResults = true;

  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    if (e.results[0].isFinal) {
      // Only handle the final result, not interim results
      if (transcript.trim() !== "") {
        populateUsingGpt(transcript);
      }
    }
  });

  const startButton = document.getElementById("start");

  startButton.addEventListener("click", () => {
    recognition.start();
    recognition.addEventListener("end", () => {
      recognition.stop();
    });
  });
});

  