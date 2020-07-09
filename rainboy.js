/*
rainboy.js adds functionality to the bird, the song, and the background
for about section
*/

"use strict";

(function() {

  window.addEventListener("load", init);

  /** Function that initializes lax animation package */
  window.onload = function() {
    lax.setup() // init
  
    const updateLax = () => {
      lax.update(window.scrollY)
      window.requestAnimationFrame(updateLax)
    }
  
    window.requestAnimationFrame(updateLax)
  }

  /** Initialization function */
  function init() {
    let bird = id("bird");
    let navButtons = qsa("#navigation a");
    let birdSong = id("holes");
    bird.addEventListener("click", function() {
      toggleSong(birdSong);
    });
    for(let i = 0; i < navButtons.length; i++) {
      navButtons[i].addEventListener("click", function() {
        birdSong.classList.add("paused");
        birdSong.pause();
      });
    }
    randomBird();
    window.addEventListener("scroll", startChangeBackground);
    let bois = qsa(".boi");
    for (let i = 0; i < bois.length; i++) {
      bois[i].addEventListener("click", displayPokemon);
    }
    let pokeCards = qsa(".poke");
    for (let i = 0; i < pokeCards.length; i++) {
      pokeCards[i].addEventListener("click", function() {
        this.classList.add("hidden");
      })
    }
    let streamingLogos = qsa("#streaming-logos div");
    for (let i = 0; i < streamingLogos.length; i++) {
      streamingLogos[i].addEventListener("click", function() {
        let yourService = this.id + "-embedded";
        hideStreaming();
        pauseAllAudio();
        id(yourService).classList.remove("hidden");
      });
    }
    id("facebook").addEventListener("click", function() {
      window.open("https://www.facebook.com/rainboyband", "_blank");
    });
    id("instagram").addEventListener("click", function() {
      window.open("https://www.instagram.com/rainboyband/?hl=en", "_blank");
    });
  }

  /** ************** Home Page **************** */
  function randomBird() {
    let birdQuotes = [
      "i'm desperate tweet", "i <3 worms lmao", "i need this tweet",
      "just bird things :P tweet", "lmao tweet tweet"]
    let r = Math.floor(Math.random() * 5);
    id("randTweet").textContent = birdQuotes[r];
  }

  function toggleSong(song) {
      if (song.classList.contains("paused")) {
        song.classList.remove("paused");
        song.play();
      } else {
        song.classList.add("paused");
        song.pause();
      }
    }

  /** ***************** About *********************/
  function startChangeBackground() {
    let abt = id("about");
    let abtPix = document.documentElement.scrollTop - abt.offsetTop;
    if (abtPix > 20 && abtPix < 600) {
      turnLight()
      return true;
    } else {
      turnDark();
      return false;
    }
  }
  
  function turnLight() {
    let abt = id("about");
    let abtText = qs("#about p");
    abt.classList.remove("dark");
    abt.classList.add("light");
    abtText.classList.remove("dark-text");
    abtText.classList.add("light-text");
  }

  function turnDark() {
    let abt = id("about");
    let abtText = qs("#about p");
    abt.classList.remove("light");
    abt.classList.add("dark");
    abtText.classList.remove("light-text");
    abtText.classList.add("dark-text");
  }

  function displayPokemon() {
    let pokeName = this.id + "-poke";
    id(pokeName).classList.remove('hidden');
  }

  /** **************** Music ***************************/
  function hideStreaming() {
    let streamingServices = qsa("#streaming-display div");
    for (let i = 0; i < streamingServices.length; i++) {
      streamingServices[i].classList.add("hidden");
    }
  }

  function pauseAllAudio() {
    id("holes").pause();
    id("holes").classList.add("paused");
  }

  /** **************** Helper functions ****************/
  function id(name) {
    return document.getElementById(name);
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

  function qsa(selector) {
    return document.querySelectorAll(selector);
  }
})();