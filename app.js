function App() {
  return "< \
    sdlfkjlkj ";
}

const receiveBall = document.querySelector(".receiveBall");
const startbutton = document.querySelector(".startbutton");

function fadeButtonOut(){
    let duration = 500;
    let animation = startbutton.animate(
        [ {opacity: 0} ],
        {duration: duration, fill:'forwards'}
    )
    // animation.commitStyles();
}

function fadeButtonIn(){
    let duration = 500;
    let animation = startbutton.animate(
        [ {opacity: 1} ],
        {duration: duration, fill:'forwards'}
    )
    // animation.commitStyles();
}
function changeBallColor(color){
    let duration = 500;
    let animation = receiveBall.animate(
        [ {backgroundColor: color} ],
        {duration: duration, fill:'forwards'}
    )
    // animation.commitStyles();
}

function pulseAnimation(
  duration,
  scaleMiddle,
  scaleEnd,
  timingFunction = "ease-in-out"
) {
  return [
    [
      //   {
      //     transform: `scale(${1})`,
      //     // offset: 0.5,
      //   },
      {
        transform: `scale(${scaleMiddle})`,
        offset: 0.5,
      },
      {
        transform: `scale(${scaleEnd})`,
      },
    ],
    {
      duration,
      iterations: 1,
      easing: timingFunction,
      //  fillMode: "forwards",
    },
  ];
}

let timeout = idleAnimation(1);
function idleAnimation(end) {
  const duration = 3000;
  const animation = pulseAnimation(duration, 2.0,end);
    fadeButtonIn();
  receiveBall.animate(...animation);
  return setInterval(() => {
    receiveBall.animate(...animation);
  }, duration);
}

let transmiting = false;
startbutton.addEventListener("click", () => {
    fadeButtonOut();
    changeBallColor("rgb(213, 176, 56)");
    if (!transmiting) {
      transmiting = true;
      clearInterval(timeout);
      setTimeout(() => {
        receiveBall.classList.add("diminish");
        setTimeout(() => {
          let duration = 500;
          // receiveBall.classList.remove("diminish");
          // 0.7 is the scale after the "diminish" animation
          let animation = pulseAnimation(duration, 1.3, 0.7, "ease-out");
          console.log(animation);
          //   pulse();
          // receiveBall.animate(...animation);
          let currentbit = 0;
          let morsePulseTimeout = setInterval(() => {
            console.log(morseCode[currentbit]);
            if (morseCode[currentbit] === 1) receiveBall.animate(...animation);
            else if (currentbit >= morseCode.length) {
              changeBallColor("#fff")
              clearInterval(morsePulseTimeout);
              timeout = idleAnimation(0.7);
              transmiting = false;
              clearInterval(morsePulseTimeout);

            }
            currentbit += 1;
          }, duration);
        }, 3000);
      }, 2500);
    }
});

const morseAlphabet = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
};

function strToMorse(morseStr) {
  return morseStr
    .split(" ")
    .map((w) => {
      let wordmorse = w.split("").map((c) => morseAlphabet[c]);
      return wordmorse
        .map((c) => {
          let dotsdashes = c.split("");
          let charresult = "";
          dotsdashes.forEach((d) => {
            charresult += "0";
            charresult += d === "." ? "1" : "11";
          });
          return charresult.substring(1);
        })
        .join("000");
    })
    .join("0000000");
}

let message = "amote";
const morseCode = strToMorse(message)
  .split("")
  .map((c) => parseInt(c));
