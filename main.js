;(() => {
  const actions = {
    birdFlies(key) {
      const bird = document.querySelector('[data-index="2"] .bird')
      key
        ? (bird.style.transform = `translateX(${window.innerWidth}px)`)
        : (bird.style.transform = `translateX(-100%)`)
    },
    birdFlies2(key) {
      const bird = document.querySelector('[data-index="5"] .bird')
      key
        ? (bird.style.transform = `translate(${window.innerWidth}px, ${
            -window.innerHeight * 0.7
          }px)`)
        : (bird.style.transform = `translateX(-100%)`)
    },
  }

  const stepElems = document.querySelectorAll(".step")
  const graphicElems = document.querySelectorAll(".graphic-item")
  let currentItem = graphicElems[0] // 활성화된 visible 클래스가 붙은 graphic-item
  let ioIndex

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1
  })

  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i])

    stepElems[i].dataset.index = i
    graphicElems[i].dataset.index = i
  }

  function activate(action) {
    console.log("🚀 ~ file: main.js ~ line 27 ~ action", action)
    currentItem.classList.add("visible")
    if (action) {
      actions[action](true)
    }
  }
  function inactivate(action) {
    currentItem.classList.remove("visible")
    if (action) {
      actions[action](false)
    }
  }

  window.addEventListener("scroll", () => {
    let step, boundingRect

    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i]
      if (!step) continue

      boundingRect = step.getBoundingClientRect()

      // window의 innerHeight 값의 10%, 80%
      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inactivate(currentItem.dataset.action)
        currentItem = graphicElems[step.dataset.index]
        activate(currentItem.dataset.action)
      }
    }
  })

  window.addEventListener("load", () => {
    setTimeout(() => scrollTo(0, 0), 100)
  })
  activate()
})()
