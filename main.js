let loading = true;
let loadingWrapper = document.querySelector("#loadingWrapper");
let usersWrapper = document.querySelector("#usersWrapper");
let input = document.querySelector("input")
let button = document.querySelector("button")


function loadingCheck() {
  if (loading) {
    loadingWrapper.className = "flex items-center h-screen justify-center";
  } else {
    loadingWrapper.className = "hidden";
  }
}

loadingCheck()

async function requestUsersData() {
  try {
    let request = await fetch('https://dummyjson.com/users')
    let response = await request.json()
    console.log(response)

    button.addEventListener('click', () => {
      let filteredData = response.users.filter(item => item.id === +input.value)
      usersWrapper.innerHTML = ''
      console.log(filteredData)
      filteredData.map(item => {
        let card = document.createElement('div')
        card.className = 'flex items-center justify-between text-xs'
        card.innerHTML = `
          <div class="text-xl">${item.id}</div>

          <div>
            <img
              src="${item.image}"
              class="size-20 rounded-full border border-primary"
              alt=""
            />
          </div>

          <div class="flex flex-col text-left">
            <p class="text-xl">${item.firstName} ${item.lastName}</p>
            <p class="text-xs">${item.company.department}</p>
          </div>

          <div class="flex flex-col text-left">
            <p class="text-xl">${item.age}</p>
            <p class="text-xs">${item.gender}</p>
          </div>

          <div class="flex flex-col text-left">
            <p>${item.university}</p>
          </div>

          <div>
            <p>${item.address.address}</p>
            <p>${item.address.city}</p>
          </div>
        `

        usersWrapper.appendChild(card)
      })
    })

    response.users.map(item => {
        let card = document.createElement('div')
        card.className = 'flex items-center justify-between text-xs'
        card.innerHTML = `
          <div class="text-xl">${item.id}</div>

          <div class="flex-1 ml-10">
            <img
              src="${item.image}"
              class="size-20 rounded-full border border-primary"
              alt=""
            />
          </div>

          <div class="flex flex-col text-left flex-1">
            <p class="text-xl">${item.firstName} ${item.lastName}</p>
            <p class="text-xs">${item.company.department}</p>
          </div>

          <div class="flex flex-col text-left flex-1">
            <p class="text-xl">${item.age}</p>
            <p class="text-xs">${item.gender}</p>
          </div>

          <div class="flex flex-col text-left flex-1">
            <p>${item.university}</p>
          </div>

          <div class="flex-1">
            <p>${item.address.address}</p>
            <p>${item.address.city}</p>
          </div>
        `

        usersWrapper.appendChild(card)
      })


  } catch (e) {
    console.error(e)
  } finally {
    loading = false
    loadingCheck()
  }
}

requestUsersData()