// // let mediaRecorder;
// // let recordedChunks = [];
// // let recordButton;
// // let audioContainer;

// // // Check browser compatibility
// // if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
// //   console.error('getUserMedia is not supported in this browser');
// // } else {
// //   recordButton = document.getElementById('recordButton');
// //   audioContainer = document.getElementById('audioContainer');

// //   recordButton.addEventListener('mousedown', startRecording);
// //   recordButton.addEventListener('mouseup', stopRecording);
// //   recordButton.addEventListener('mouseleave', stopRecording);
// // }

// // function startRecording() {
// //   navigator.mediaDevices.getUserMedia({ audio: true })
// //     .then(stream => {
// //       mediaRecorder = new MediaRecorder(stream);
// //       mediaRecorder.addEventListener('dataavailable', event => {
// //         recordedChunks.push(event.data);
// //       });
// //       mediaRecorder.start();
// //       recordButton.classList.add('recording');
// //     })
// //     .catch(error => {
// //       console.error('Error accessing microphone:', error);
// //     });
// // }

// // function stopRecording() {
// //   if (mediaRecorder && mediaRecorder.state !== 'inactive') {
// //     mediaRecorder.stop();
// //     recordButton.classList.remove('recording');

// //     mediaRecorder.addEventListener('stop', () => {
// //       const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
// //       const audioUrl = URL.createObjectURL(audioBlob);
// //       const audioElement = document.createElement('audio');
// //       audioElement.controls = true;
// //       audioElement.src = audioUrl;
// //       audioContainer.appendChild(audioElement);

// //       recordedChunks = [];
// //     });
// //   }
// // }


let mediaRecorder;
let recordedChunks = [];
let recordButton;
let audioContainer;

// Check browser compatibility
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  console.error('getUserMedia is not supported in this browser');
} else {
  recordButton = document.getElementById('recordButton');
  audioContainer = document.getElementById('audioContainer');

  recordButton.addEventListener('mousedown', startRecording);
  recordButton.addEventListener('mouseup', stopRecording);
  recordButton.addEventListener('mouseleave', stopRecording);
}

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.addEventListener('dataavailable', event => {
        recordedChunks.push(event.data);
      });
      mediaRecorder.start();
      recordButton.classList.add('recording');
    })
    .catch(error => {
      console.error('Error accessing microphone:', error);
    });
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    recordButton.classList.remove('recording');

    mediaRecorder.addEventListener('stop', () => {
      const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = document.createElement('audio');
      audioElement.controls = true;
      audioElement.src = audioUrl;
      audioContainer.appendChild(audioElement);

      recordedChunks = [];
    });
  }
}
