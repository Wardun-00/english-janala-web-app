
const createElements =(arr) =>{
  const htmlElement = arr.map((el) => `<span class="btn">${el} </span>`)
  return htmlElement.join("");
};


const manageSpinner = (status) => {
  if(status == true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
}


const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";

    fetch(url) //promise of response
    .then(response => response.json()) // promise of json data
    .then(json => displayLesson(json.data))
};

const removeActive = () =>{
  const lessonButtons = document.querySelectorAll(".active");
  lessonButtons.forEach(btn=> btn.classList.remove("active"));
}


const loadLevelWord = (id) => {
  manageSpinner(true)
 const url =`https://openapi.programming-hero.com/api/level/${id}`;
 fetch(url)
 .then(res => res.json())
 .then(data => {
  removeActive() //remove all active class
  const clickBtn = document.getElementById(`lesson-btn-${id}`)
  clickBtn.classList.add("active") //add active class
  displayLevelWord(data.data)
 })
}


const loadWordDetail =async(id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data)
}

const displayWordDetails = (word) =>{
  console.log(word)
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML =`
             <div>
              <h2 class="text-2xl font-bold">
                ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})
              </h2>
            </div>
            <div>
              <h2 class="font-bold">Meaning</h2>
              <p>${word.meaning}</p>
            </div>
            <div>
              <h2 class="font-bold">Example</h2>
              <p>${word.sentence}</p>
            </div>
            <div>
              <h2 class="font-bold">Synonym</h2>
             
              <div>${createElements(word.synonyms)}</div>
            </div>
  `;
  document.getElementById("word-modal").showModal();
}

const displayLevelWord = (words) => {
    // first a html a giye container ta nite hobe

    const wordContainer = document.getElementById("word-container");
    // er por container ta empty kore nite hobe
    wordContainer.innerHTML ="";
    
    if(words.length == 0){
        wordContainer.innerHTML =`
        <div class="col-span-full py-5 space-y-5">
          <img class="mx-auto" src="./assets/alert-error.png" alt="alert-error">
          <p class="text-center text-gray-500">
           এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h2 class="font-bold text-2xl md:text-5xl text-center">
            নেক্সট Lesson এ যান
          </h2>
        </div>
        `;
        manageSpinner(false)
        return;
    }

    // er por loop kore nite hobe arry take normal text a paowar jnno

    words.forEach(word =>{
        const card = document.createElement("div")
        card.innerHTML=`
       <div
          class="bg-white rounded-xl py-10 px-5 text-center shadow-sm space-y-4"
        >
          <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="font-semibold">Meaning/Pronunciation</p>
          <div class="font-bangla text-2xl font-medium">${word.meaning? word.meaning : "অর্থ পাওয়া যায়নি।"} / ${word.pronunciation? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}</div>
          <div class="flex justify-between">
            <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#0b61b180]">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#0b61b180]">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
        `;

        wordContainer.append(card)
    });

    manageSpinner(false)
}



const displayLesson = (lessons) => {
//    1. get the container and empty container

    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = ""; //empty
//    2. get into every lesson (loop)

    for(let lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-soft btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}
        </button>
        `;

        levelContainer.append(btnDiv);
    }

    
};

loadLessons();