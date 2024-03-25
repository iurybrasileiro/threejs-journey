import Experience from '../index'

import Environment from './environment'
import Floor from './floor'
import Fox from './fox'

class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.resources.on('ready', () => {
      // Setup
      this.floor = new Floor()
      this.fox = new Fox()
      this.environment = new Environment()
    })
  }

  update() {
    if (this.fox) {
      this.fox.update()
    }
  }
}

export default World
