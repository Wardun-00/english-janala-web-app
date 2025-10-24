

const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";

    fetch(url) //promise of response
    .then(response => response.json()) // promise of json data
    .then(json => displayLesson(json.data))
};


const loadLevelWord = (id) => {
 const url =`https://openapi.programming-hero.com/api/level/${id}`;
 fetch(url)
 .then(res => res.json())
 .then(data => displayLevelWord(data.data))
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
            <button class="btn bg-[#1A91FF10] hover:bg-[#0b61b180]">
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

}



const displayLesson = (lessons) => {
//    1. get the container and empty container

    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = ""; //empty
//    2. get into every lesson (loop)

    for(let lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-soft btn-primary">
        <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}
        </button>
        `;

        levelContainer.append(btnDiv);
    }

    
};

loadLessons();