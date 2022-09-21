import { todosService } from "../services/TodosService.js";
import BaseController from "../utils/BaseController.js";

export class TodosController extends BaseController {
  constructor () {
    super('api/:user/todos')
    this.router
      .get('', this.getTodosByUser)
      .post('', this.createTodo)
      .delete('/:id', this.removeTodo)
  }
  async removeTodo(req, res, next) {
    try {
      await todosService.removeTodo(req.params.id, req.params.user)
      return res.send('Deleted Todo!')
    } catch (error) {
      next(error)
    }
  }
  async createTodo(req, res, next) {
    try {
      req.body.user = req.params.user
      const todo = await todosService.createTodo(req.body)
      return res.send(todo)
    } catch (error) {
      next(error)
    }
  }
  async getTodosByUser(req, res, next) {
    try {
      const todos = await todosService.getTodosByUser(req.params.user)
      return res.send(todos)
    } catch (error) {
      next(error)
    }
  }


}