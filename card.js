class Card {
  constructor(text) {
    this.element = document.createElement("div")
    this.element.classList.add("card")
    this.element.innerHTML = text

    const container = document.querySelector(".container")
    container.appendChild(this.element)

    const { width, height } = this.element.getBoundingClientRect()
    this.width = width
    this.height = height

    const left = Math.random() * window.innerWidth
    const top = Math.random() * (window.innerHeight / 6) + height
    this.body = Bodies.rectangle(left, top, width, height, { restitution: 0.8 })
  }
  render() {
    const { x, y } = this.body.position

    this.element.style.top = `${y - this.height / 2}px`
    this.element.style.left = `${x - this.width / 2}px`
    this.element.style.transform = `rotate(${this.body.angle}rad)`
  }
}

const { Engine, Mouse, Bodies, Composite, Events, MouseConstraint } = Matter

const engine = Engine.create()
const update = (engine) => Engine.update(engine)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const textList = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "Ruby",
  "Swift",
  "Kotlin",
  "PHP",
  "C#",
  "Rust",
  "Go",
  "TypeScript",
  "Scala",
  "Perl",
  "HTML5 / CSS3",
  "SQL",
  "Shell",
  "Objective-C",
  "Lua",
  "Assembly",
  "Git-Github",
  "MySQL",
  "Django",
  "React",
  "Node",
  "Vue",
]

const allCards = textList.map((txt) => new Card(txt))

const ceiling = Bodies.rectangle(sizes.width / 2, -400, sizes.width, 800, {
  isStatic: true,
})

const ground = Bodies.rectangle(sizes.width / 2, sizes.height + 400, sizes.width, 800, {
  isStatic: true,
  collisionFilter: { category: 0x0001, mask: 0x0001 },
  restitution: 2,
})

const wallLeft = Bodies.rectangle(-400, sizes.height / 2, 800, sizes.height, {
  isStatic: true,
})

const wallRight = Bodies.rectangle(sizes.width + 400, sizes.height / 2, 800, sizes.height, {
  isStatic: true,
})

const mouse = Mouse.create(this.container)

const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: { visible: true },
  },
})

Composite.add(engine.world, [ceiling, wallLeft, wallRight, ground, ...allCards.map((each) => each.body)])

Composite.add(engine.world, mouseConstraint)

const limitMaxSpeed = () => {
  let maxSpeed = 70

  allCards.forEach(({ body }) => {
    body.velocity.x = Math.min(Math.max(body.velocity.x, -maxSpeed), maxSpeed)
    body.velocity.y = Math.min(Math.max(body.velocity.y, -maxSpeed), maxSpeed)
  })
}

Events.on(engine, "beforeUpdate", limitMaxSpeed)

const run = () => {
  allCards.forEach((card) => card.render())
  update(engine)
  requestAnimationFrame(run)
}

run()
