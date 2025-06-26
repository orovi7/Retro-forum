
/**
 * API
LatestPosts: - https://openapi.programming-hero.com/api/retro-forum/latest-posts

AllPosts: - https://openapi.programming-hero.com/api/retro-forum/posts

PostSearchByQuery
PostByQuery: - https://openapi.programming-hero.com/api/retro-forum/posts?category=categoryName

Example
PostByQuery: - https://openapi.programming-hero.com/api/retro-forum/posts?category=coding
 */

console.log('yea retro forum js has been connected');

const fetchRetroForum = async (catagory = 'music') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${catagory}`);
    const data = await res.json();
    console.log(data);
    const newData = data.posts;
    // console.log(newData);
    allTypeOfSector(newData);
   
}


const handleReadMark =  async (id) => {
    // console.log('clicked');
    const markReadContainer = document.getElementById('mark-read');

    

    const getText = markReadContainer.innerText;
    const intText = parseInt(getText);
    markReadContainer.innerText = intText + 1;
    
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/post/${id}`);
    const data = await res.json();
    console.log(data);
    const getTitleContainer = document.getElementById('view-count-section');
    const createADivContainer = document.createElement('div');
    createADivContainer.classList = `flex rounded-xl gap-4 justify-between px-5 bg-white py-3 items-center`;
    createADivContainer.innerHTML = `
      <div><p class="text-[#12132D]">${data.title}</p></div>
    <div><span class="flex gap-2"><img src="/Retro-forum/images/eye.png" alt=""> <p>${data.view_count}</p></span></div>
    `
   getTitleContainer.appendChild(createADivContainer);
    
}
// handleReadMark();

const allTypeOfSector = (forum) => {
    const getContainerOfSec = document.getElementById('discuss-section');
    getContainerOfSec.textContent = '';

    forum.forEach(info => {
        // console.log(info);

        const firstDiv = document.createElement('div');
        firstDiv.classList = `bg-[#12132D0D] flex gap-5 mb-5 p-10 rounded-2xl`;
        firstDiv.innerHTML = `
        
        <div><img src="${info.image}" class = "w-20 rounded-xl" alt=""></div>
         <!-- text part here -->
         <div class="space-y-3">
          <span class="flex gap-6 text-sm"><p>#${info.category}</p> <p>Author:${info.author.name}</p></span>
          <h5 class="text-lg font-semibold">${info.title}</h5>
          <p class="text-base text-[#12132D99]">${info.description}</p>
             <hr class="border-dashed">
            <div class="flex justify-between">
               <span class="flex gap-5">
                <span class="flex gap-3 "><img src="/Retro-forum/images/comment.png" alt=""> <p>${info.comment_count}</p></span>
                <span class="flex gap-3 "><img src="/Retro-forum/images/eye.png" alt=""> <p>${info.view_count}</p></span>
                <span class="flex gap-3 "><img src="/Retro-forum/images/time.png" alt=""> <p>${info.posted_time} min</p></span>
               </span>
             <span onclick = "handleReadMark(${info.id})"><img src="/Retro-forum/images/mail.png" alt=""></span>
            </div>
         </div>
        `
        getContainerOfSec.appendChild(firstDiv);
    })
    loadingSpinner(false);
}

const searchhandler = () => {
    const getSearchField = document.getElementById('search-field');
    const getSearchValue = getSearchField.value;
    loadingSpinner(true);
    fetchRetroForum(getSearchValue);
    

    // console.log(getSearchValue);
}

const loadingSpinner = (isLoading)  => {
    const getLoadingSpinner = document.getElementById('loading-container');
   if(isLoading){
    getLoadingSpinner.classList.remove('hidden');
   }
   else{
    getLoadingSpinner.classList.add('hidden');
   }
}

// latest post here
const latestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    console.log(data);
    latestPostContainer(data);
}

const latestPostContainer = (posts) => {
   const getLatestPostContainer = document.getElementById('latest-container');
   posts.forEach(post => {
    console.log(post)
    const createNewDiv = document.createElement('div');
    createNewDiv.classList = `card bg-base-100 w-96 shadow-sm`;
    createNewDiv.innerHTML = `
     <figure class="px-10 pt-10">
    <img
      src="${post.cover_image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body ">
    <span class="flex items-center gap-3"><span><img src="/Retro-forum/images/date.png" alt=""></span>
     <span><p class="text-[#12132D99]">${post.author?.posted_date || 'no publish date'}</p></span></span>
     <h6 class="text-lg font-bold">${post.title}</h6>
    <p class="text-[#12132D99] text-base">${post.description} </p>
    <div class="card-actions items-center">
      <div><img class = "w-16 rounded-4xl" src="${post.profile_image}" alt=""></div>
      <div><p class="text-base font-semibold">${post.author.name}</p>
      <p class="text-[#12132D99] text-sm">${post.author?.designation || 'unknown'}</p></div>
    </div>
  </div>
    `
    getLatestPostContainer.appendChild(createNewDiv);
   })
   
}

latestPost();

fetchRetroForum();