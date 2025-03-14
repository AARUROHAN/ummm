document.addEventListener("DOMContentLoaded", function () {
    const memoryMusic = document.getElementById('memoryMusic');
    const letterMusic = document.getElementById('letterMusic');
    const playMusicBtn = document.getElementById("playMusicBtn");

    let isMusicPlaying = false;

    playMusicBtn.addEventListener("click", function () {
        if (!isMusicPlaying) {
            memoryMusic.play().then(() => {
                console.log("Music started!");
                isMusicPlaying = true;
                playMusicBtn.style.display = "none"; // Hide button after playing
            }).catch(error => {
                console.log("Error playing music: ", error);
                alert("Please click again or check if the file exists.");
            });
        }
    });

    function fadeInAudio(audioElement) {
        let volume = 0;
        audioElement.volume = 0;
        audioElement.play();
        let interval = setInterval(() => {
            if (volume < 1) {
                volume += 0.05;
                audioElement.volume = volume;
            } else {
                clearInterval(interval);
            }
        }, 200);
    }

    window.showSection = function (sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
        });

        document.getElementById(sectionId).style.display = 'block';

        if (sectionId === 'memories') {
            letterMusic.pause();
            letterMusic.currentTime = 0;
            fadeInAudio(memoryMusic);
        } else {
            memoryMusic.pause();
            memoryMusic.currentTime = 0;
            fadeInAudio(letterMusic);
        }
    }
});
