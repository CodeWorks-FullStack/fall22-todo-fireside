import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TodosService {
  async removeTodo(id, name) {
    const todo = await dbContext.Todos.findById(id)
    if (!todo) {
      throw new BadRequest('Bad ID')
    }
    if (todo.user.toString() !== name) {
      throw new Forbidden('No way ' + name)
    }
    await todo.delete()
  }
  async createTodo(body) {
    const todo = await dbContext.Todos.create(body)
    return todo
  }
  async getTodosByUser(name) {
    const todos = await dbContext.Todos.find({ user: name })
    return todos
  }


}

export const todosService = new TodosService()